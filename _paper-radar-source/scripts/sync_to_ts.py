import json
import os
import argparse
from datetime import datetime

# You would paste the generated summaries here if running manually, 
# or the assistant will populate this dictionary.
SUMMARIES = {
    "2603.15557v1": {
        "expert": "本研究将视觉语言模型的幻觉重新定义为生成过程中的动态认知病理，而不是静态输出错误。作者利用感知熵、推理冲突和决策熵等信息论探针，将模型的推理轨迹映射到低维认知状态空间，并发现几何异常与高信息惊异度在本质上是等价的。该框架在弱监督条件下就能实现高效的幻觉检测，同时还能区分不同模型在感知、推理和决策阶段的失败模式。",
        "general": "这篇论文不是只检查 AI 最后答错了什么，而是拆开它“看图、思考、下结论”的全过程来定位幻觉来源。研究者发现，只要观察模型内部推理轨迹在某个数学空间里是否“走偏”，就能更早、更稳地发现它在一本正经地胡说。这个方法不依赖昂贵标注，对真实系统部署也更友好。",
        "lazy": "这套方法像给 AI 做体检，不是等它说错了再追责，而是提前发现它的思路已经跑偏了。它能帮我们更早识别视觉 AI 什么时候开始“编故事”。"
    },
    "2603.15569v1": {
        "expert": "Mamba-3 从状态空间模型视角出发，对线性序列建模做了三项关键升级：更具表达力的离散化递推、复数值状态更新，以及不增加解码延迟的 MIMO 设计。这些改动显著提升了模型的状态跟踪能力和长序列建模质量，同时保持了线性模型在推理阶段的高效率。实验表明，Mamba-3 在 1.5B 规模下已能明显优于前代 Mamba-2 和其他同类线性架构。",
        "general": "这项工作想解决一个老问题：Transformer 很强，但推理又慢又贵；线性模型很快，却常常不够聪明。Mamba-3 通过一套更好的状态更新机制，让模型既保留高速、低内存优势，又补上了状态跟踪和复杂推理方面的短板。对需要处理长文本和高吞吐推理的场景来说，这是一条很有吸引力的路线。",
        "lazy": "Mamba-3 可以理解成“更聪明的轻量版大模型引擎”。它既想跑得快，又不想像之前那样一到复杂任务就掉链子，这次看起来真的更接近两者兼得了。"
    },
    "2603.15594v1": {
        "expert": "OpenSeeker 提出了首个同时开源模型权重和完整训练数据的前沿级搜索智能体方案，目标是打破高性能搜索 Agent 被少数大厂垄断的局面。其核心在于两部分：基于真实网页图谱构造复杂多跳问答任务的可控合成方法，以及通过回溯式摘要对搜索轨迹进行去噪的训练数据生成流程。仅用 1.17 万条合成样本和一次简单 SFT，OpenSeeker 就在多个搜索基准上达到或逼近工业级水平。",
        "general": "很多强搜索 Agent 的关键能力并不只在模型本身，而在训练它们的数据。OpenSeeker 把这件事彻底开源了，不只放出模型，还公开了怎么合成高质量搜索任务和操作轨迹。结果说明，只要数据设计得足够好，即使不用复杂 RL 训练，也能做出很强的网页搜索与多步推理能力。",
        "lazy": "这篇论文把“训练 AI 搜索高手的秘籍”公开了。厉害的不只是模型，而是它把怎样教会 AI 搜索和查资料这套方法也一起开源了。"
    },
    "2603.15599v1": {
        "expert": "SmartSearch 质疑了对话记忆系统必须依赖 LLM 进行复杂结构化建模的主流路线，提出了一条几乎全确定性的检索流水线。它通过关键词与实体匹配完成高召回，再用 CrossEncoder 和 ColBERT 融合重排序解决真正的瓶颈：在有限 token 预算内保住最关键证据。实验结果显示，该方法在 CPU 上即可实现低延迟，并在多个长对话记忆基准上超越现有复杂方案。",
        "general": "这项工作最有意思的观点是：记忆系统的关键未必是把历史聊天整理得多漂亮，而是最后能不能排出最相关的内容。SmartSearch 直接对原始对话做检索，再用一个高质量排序阶段筛选重要片段，避免了重型结构化和大规模 GPU 推理。对于做长期记忆 Agent 的工程团队来说，这是一条成本更低、实现更稳的路线。",
        "lazy": "它证明了一件很实用的事：AI 不一定要先把聊天记录整理成复杂数据库，很多时候“搜得准、排得好”就够了。简单说，就是少折腾结构，多把精力花在最后那一轮排序上。"
    },
    "2603.15611v1": {
        "expert": "Code-A1 提出了一种代码模型与测试模型协同对抗演化的强化学习框架，通过将 Code LLM 和 Test LLM 物理分离并赋予相反目标，避免了单模型自博弈时常见的“自合谋”问题。测试模型可以白盒查看候选代码，从而生成更有针对性的对抗性测试用例；同时引入“错题本”机制进行经验回放，稳定训练过程。实验表明，该方法在不依赖人工测试标注的情况下，已能在代码生成和测试生成两端都取得很强表现。",
        "general": "这项工作把“写代码”和“找 Bug”拆成两个 AI，让它们在对抗中一起进化。一个模型负责写出能通过测试的代码，另一个模型专门学习如何设计更刁钻、更真实的测试来拆穿它。这样的训练方式比传统固定测试集更接近真实开发环境，也更可能逼出稳健代码。",
        "lazy": "这是让两个 AI 互相较劲：一个写代码，一个专门挑刺。越打越久，写代码的更严谨，找问题的也更毒，最后两边都变强了。"
    },
    "2603.15614v1": {
        "expert": "Tri-Prompting 试图统一视频生成中的三种关键控制维度：场景构图、主体一致性和运动控制。它通过双重条件运动模块，将背景的 3D 轨迹控制与前景主体的外观保持分开建模，并配合两阶段训练与 ControlNet 调度策略，兼顾了可控性与视觉质量。结果显示，该框架在多视角主体一致性、3D 一致性和运动准确度上都显著优于现有专用方法。",
        "general": "以前的视频扩散方法通常只能在“场景、角色、动作”三者里做好一两项，很难同时兼顾。Tri-Prompting 试图把这三件事统一起来，让用户既能指定场景，又能保持角色身份稳定，还能控制镜头和动作走向。对视频创作工具来说，这种组合能力很有吸引力，因为它更接近真实的导演式控制。",
        "lazy": "这项技术像是给视频生成 AI 装上了“导演面板”，你可以同时管背景、角色和动作。重点不是画面更炫，而是终于更听话了。"
    },
    "2603.15617v1": {
        "expert": "HorizonMath 构建了一个面向真实前沿数学研究的评测基准，收录了 101 个尚无已知标准解的应用与计算数学问题，并设计了可扩展的自动验证流程。它利用“发现难、验证相对容易”的问题结构，通过高精度数值比对和确定性约束检查来自动评分，因此天然具备抗数据污染能力。作者还报告 GPT 5.4 Pro 在其中两个问题上给出了可能优于现有文献结果的候选解，显示该基准具备真实科研意义。",
        "general": "这不是普通数学刷题集，而是专门用来测 AI 是否接近“做研究”的一套基准。问题本身来自还没有公认答案的真实数学前沿，但验证方式又被设计得足够程序化，因此可以自动判分。它的重要价值在于：终于有一套测试不再只是比谁更会背旧题，而是更接近衡量 AI 能否提出新发现。",
        "lazy": "这相当于给 AI 发了一套“人类都还没完全做出来”的数学卷子。最厉害的地方是，它还能自动判卷，所以特别适合看 AI 到底是在背答案，还是开始真的会思考。"
    },
    "2603.15618v1": {
        "expert": "这篇论文发现，现有视觉-语言-动作模型在动作生成的深层阶段会逐渐丢失对视觉输入的敏感度，导致机器人“越想越看不清”。为了解决这一问题，作者提出 DeepVision-VLA，通过视觉-语言混合 Transformer 将视觉专家模型的多级特征注入 VLA 主干深层，并结合动作引导视觉剪枝机制保留任务相关区域。该方法在模拟与真实场景中都带来了显著性能提升。",
        "general": "很多机器人模型的问题并不是看不见，而是在后续推理过程中把视觉细节慢慢丢掉了。DeepVision-VLA 的思路是给它持续补充高质量视觉线索，并自动过滤掉与当前动作无关的无效区域。这样模型在抓取、定位和执行复杂操作时会更稳，也更不容易被背景噪声带偏。",
        "lazy": "机器人 AI 有时不是手笨，而是想久了就“看走眼”了。这项工作给它加了一个更专注的视觉外挂，让它在干活时始终盯住重点。"
    },
    "2603.15619v1": {
        "expert": "Mixture-of-Depths Attention 通过让注意力头同时访问当前层序列 KV 和前序层深度 KV，缓解了深层 Transformer 中信息被残差更新不断稀释的问题。作者还专门设计了硬件高效的融合内核与布局策略，使该机制在 64K 长序列下依然能达到接近 FlashAttention-2 的运行效率。实验表明，MoDA 只带来很小的额外计算成本，却能稳定提升模型在下游任务上的表现。",
        "general": "模型越深，早期形成的重要特征越容易在一层层更新中被冲淡。MoDA 的思路是给每一层增加一个“跨层回看”的能力，让它在处理当前信息时也能直接借用之前层的重要结果。这样模型不仅保住了深度带来的表达能力，还减少了“变深反而变钝”的问题。",
        "lazy": "这项技术像是给深层模型装了一个“回看前面灵感”的功能。它让模型不会因为层数太多而忘掉早先的重要信息，所以越做越深也不容易变糊涂。"
    },
    "2603.15620v1": {
        "expert": "本文针对 VLA 模型在动态环境中时空推理不足的问题，提出了大规模动态操作数据集 DOMINO 和面向预测的统一操作架构 PUMA。DOMINO 覆盖 35 个分层复杂度任务和超过 11 万条专家轨迹，为动态操作提供了系统化训练与评测基础。PUMA 则通过整合历史光流与专门的世界查询来预测目标未来状态，从而显著提升机器人对移动物体的操作成功率。",
        "general": "很多机器人系统擅长抓静止物体，但一碰到会移动的目标就容易失手。这个工作一方面构建了更像真实世界的动态任务数据集，另一方面让模型学会根据过去的运动轨迹去预测下一步位置。结果是机器人不再只是“看到再反应”，而是开始具备一点提前预判的能力。",
        "lazy": "以前机器人更像是在抓摆好的道具，现在它开始学会应付会动的东西了。秘诀就是一边看历史轨迹，一边猜接下来会往哪儿跑。"
    },
    "2603.12038v1": {
        "expert": "针对长上下文自回归解码的高昂成本，提出 SFI 框架。该框架基于“句内注意力支持稳定性”的观察，即在语义连贯的短跨度内，主导注意力位置往往保持稳定。SFI 将生成过程解耦为频繁的“快步”（复用紧凑的稀疏存储）和偶尔的“慢步”（在语义边界刷新 Cache 并重新审视全局上下文）。实验表明，在几乎不损失质量的前提下，SFI 可将长文本生成的吞吐量提升 1.6x 至 14.4x。",
        "general": "一种无需重新训练的模型加速技术。它发现 AI 在写一句话的过程中，其“注意力”其实是很固定的，不需要每产生一个字都去翻阅整本“参考书”。通过大部分时间只读一小部分核心缓存（快步），仅在必要时查阅全文（慢步），显著提升了处理长文档和复杂推理的速度。",
        "lazy": "让 AI 写长文章变快的补丁。它模拟人类写作：写一句话时只盯着眼前的几个词，写完一段才回头看看全文，从而节省了大量计算资源，让 AI 反应更敏捷。"
    },
    "2603.12145v1": {
        "expert": "该研究探讨了自动生成高性能强化学习（RL）环境的方法。重点在于利用大语言模型辅助生成能够大规模并行运行的高速模拟器（如 Pokémon Showdown 的并行版），以解决传统 RL 环境开发周期长、运行效率低的问题。论文配套提供了基于 JAX 等框架的硬件加速实现方案。",
        "general": "这是一个针对 AI 训练环境的自动开发方案。通过自动化工具，开发者可以快速制造出支持成千上万个实例同时运行的游戏或模拟器环境。这大大缩短了训练“游戏高手”AI 所需的环境搭建时间。",
        "lazy": "自动为 AI 运动员制造“超高速练习场”的技术。不需要程序员费力编写每一个规则，就能自动搞出成千上万个能同时运行的训练场景，让 AI 像在时光屋里一样飞速进化。"
    },
    "2603.12201v1": {
        "expert": "针对稀疏注意力（如 DSA）中索引器（Indexer）计算复杂度仍为 O(L²) 的瓶颈，提出 IndexCache。研究发现不同层间的 Top-k 索引具有极高冗余，因此将层划分为计算索引的 Full 层和直接复用索引的 Shared 层。通过贪心搜索或多层蒸馏训练，该方法在 30B 模型上减少了 75% 的索引计算，实现 1.82x 的预填充加速和 1.48x 的解码加速。",
        "general": "优化 AI “专注力”计算的方案。它发现 AI 模型的每一层其实在“看”哪里这件事上都在“抄作业”。通过只让其中几层费力计算注意力位置，剩下的层直接复用，在保证模型“智商”不掉线的情况下，极大地提高了处理长信息的效率。",
        "lazy": "给 AI 的专注力计算减负。既然 AI 每一层想看的内容都差不多，那就只算一次，后面直接“复制粘贴”，让 AI 看文档、回消息的速度瞬间变快。"
    },
    "2603.12248v1": {
        "expert": "针对 Teacher Forcing 导致的训练与测试分布偏移（Distribution Shift）问题，提出 EBFT 微调框架。该方法将目标分布建模为基于能量的分布，利用特征匹配（Feature Matching）目标进行微调，有效避免了强化学习（RL）微调中的高方差 and 不稳定性。实验证明，EBFT 在代码生成和翻译任务中显著优于 SFT 和 RLVR，能更好地保持语言模型的原生能力。",
        "general": "一种新型的 AI 微调方法。传统的训练方式容易让 AI 在实际使用时因为前面的小错导致后面“满盘皆输”，EBFT 通过让 AI 练习“对齐特征”来解决这个问题。它比传统的强化学习训练更简单、更稳健，能显著提升写代码和翻译的准确性。",
        "lazy": "纠正 AI “自说自话”错误的特训法。让 AI 在练习时更贴近实战场景，写出的代码和翻译的文字更地道，不再轻易被自己前面的小错误带偏节奏。"
    },
    "2603.12250v1": {
        "expert": "针对长视频深度估计中时空一致性差的问题，提出 DVD 范式。该方法通过仿射对齐（Affine Alignment）技术，确保了在处理超长视频（如数万帧）时，深度的预测不仅在单帧内精确，而且在时间轴上保持数值平滑和几何稳定性。这为长视频的空间建模奠定了基础。",
        "general": "一种超长视频深度解析技术。它可以为视频中的每一帧画面精准计算物体的远近距离。最厉害的是，它能保证长视频里深度的数值不会忽大忽小，非常适合自动驾驶导航和电影级别的视频后期制作。",
        "lazy": "让 AI 看视频时精准分辨“远近”且不眼花。即便视频长达几小时，AI 也能一直稳定地知道每个物体在三维空间里的位置，画面切换时也不会出现距离感的混乱。"
    },
    "2603.12252v1": {
        "expert": "针对扩散模型（Diffusion）在逻辑推理（如走迷宫、数独）中推理深度不足的问题，提出 EndoCoT 框架。该方法通过“内生思维链”，在潜空间迭代精炼思维状态来激活 MLLM 编码器的推理潜力，并将其桥接至 DiT 的去噪过程。实验表明，其在空间逻辑基准上的精度比现有最强方案提升了 8.3%。",
        "general": "为画图模型植入“思考过程”。让 AI 在画图或解逻辑题前，先在“脑子”里进行多步内部推理，而不是直接给出答案。这种机制让 AI 能够解决走迷宫、解数独等高难度空间逻辑挑战。",
        "lazy": "让画画的 AI 学会“三思而后行”。模型在画迷宫或逻辑图时，会先在内部模拟思考路线，所以画出来的结果极其合理，逻辑满分。"
    },
    "2603.12255v1": {
        "expert": "提出 Spatial-TTT 用于处理流式视频的空间智能任务。核心是利用 Test-Time Training (TTT) 层的快速权重更新作为紧凑非线性存储，累积长视频流中的空间证据。通过 3D 时空卷积和密集场景描述监督，该模型在长视频召回和复杂空间问答（如 VSI-Bench）上达到了 SOTA。",
        "general": "一种具备“实时空间记忆”的模型。它能一边看视频一边更新自己的内部状态，记住走廊的布局、物体的相对方位。相比传统模型，它在处理几十分钟的长视频时内存占用极低，且不会忘记早前的细节。",
        "lazy": "给机器人装上“过目不忘”的空间大脑。机器人跟着视频走一遍，就能记住家里所有东西在哪，还能准确回答“沙发后面有什么”或者“红蜡烛在哪儿”等刁钻问题。"
    },
    "2603.12262v1": {
        "expert": "提出 VST 范式，旨在实现视频理解的“边看边想”。通过将 LLM 的推理延迟摊销到视频播放过程中，激活逻辑推理流，并利用实体关系接地的 CoT 增强多证据推理。VST-7B 在在线基准 StreamingBench 上表现强劲，响应速度比 Video-R1 快 15.7 倍。",
        "general": "实现视频理解“零等待”的推理方案。它让 AI 在视频播放的同时同步思考，而不是等视频看完再想半天。这种设计让 AI 在实时对话分析和超长视频监控中既聪明又反应迅速。",
        "lazy": "让 AI 像人一样看电视时同步“动脑筋”。不用等全剧终，AI 在看的时候就已经在心里分析剧情了，你中途问它问题它能秒回，而且分析得头头是道。"
    },
    "2603.12265v1": {
        "expert": "提出 OmniStream，一种针对视觉智能体的因果、结构化表示框架。它强调表示必须具备通用性（支持识别与交互）、因果性（仅依赖当前与过去）和结构性（捕获几何与运动）。实验证明其在动态机器人操作 and AR 导航中具有极高的稳定性。",
        "general": "为机器人和 AR 设备量身定制的“流式视觉大脑”。它能将杂乱的视频流实时转化为结构化的数据，帮助机器人在动态环境中认出物体、理解深度并做出准确的行动决策。",
        "lazy": "机器人的实时“翻译官”。它能把摄像头拍到的动荡画面变成机器人能听懂的“地图”和“操作指南”，让机器人不仅看得清，还懂得怎么避开障碍物拿东西。"
    },
    "2603.12267v1": {
        "expert": "提出 EVATok 框架，解决自回归视频生成中固定 Token 长度造成的效率低下。通过轻量级 Router 预测每段视频的最优 Token 分配：简单或重复片段使用少 Token，复杂片段使用多 Token 。在 UCF-101 上，EVATok 比固定长度基准节省了 24.4% 的计算开销，且画质更优。",
        "general": "视频生成的“自适应压缩”技术。它不再死板地给每一秒视频分配同样的存储空间，而是智能地让简单的风景画少占地，复杂的动作戏多占资源，从而在不牺牲画质的情况下，让 AI 生成视频更快、更省算力。",
        "lazy": "让 AI 生成视频更省资源的黑科技。它聪明地把“好钢用在刃上”，把更多注意力放在精彩的动作画面上，生成的视频不仅好看，还特别省存储 and 计算力。"
    }
}


def sync_to_ts(top_10_file: str, filtered_file: str, output_ts: str, summaries: dict):
    if not os.path.exists(top_10_file):
        print(f"Error: {top_10_file} not found.")
        return
    if not os.path.exists(filtered_file):
        print(f"Error: {filtered_file} not found.")
        return

    with open(top_10_file, "r", encoding="utf-8") as f:
        top_10 = json.load(f)
    
    with open(filtered_file, "r", encoding="utf-8") as f:
        filtered_papers = json.load(f)
    
    paper_map = {p["id"]: p for p in filtered_papers}
    
    generated_at = datetime.now().astimezone()
    generated_date_label = generated_at.strftime("%Y年%-m月%-d日%A")
    weekday_map = {
        "Monday": "星期一",
        "Tuesday": "星期二",
        "Wednesday": "星期三",
        "Thursday": "星期四",
        "Friday": "星期五",
        "Saturday": "星期六",
        "Sunday": "星期日",
    }
    for english, chinese in weekday_map.items():
        generated_date_label = generated_date_label.replace(english, chinese)

    final_papers = []
    for p_scored in top_10:
        p_id = p_scored["id"]
        if p_id not in paper_map:
            print(f"Warning: Paper {p_id} not found in filtered data.")
            continue
            
        p_orig = paper_map[p_id]
        
        # Extract year safely
        try:
            pub_date = p_orig.get("published") or p_orig.get("updated")
            year = str(datetime.strptime(pub_date, "%Y-%m-%dT%H:%M:%SZ").year)
        except:
            year = str(datetime.now().year)
        
        # Use existing summaries if provided, else placeholders
        p_summaries = summaries.get(p_id, {
            "expert": p_orig.get("summary", "No expert summary available."),
            "general": "Summary coming soon.",
            "lazy": "Summary coming soon."
        })
        
        authors = p_orig.get("authors", "Unknown")
        if isinstance(authors, list):
            authors = ", ".join(authors)

        final_papers.append({
            "id": p_id,
            "title": p_orig["title"],
            "authors": authors,
            "year": year,
            "arxivUrl": p_orig.get("arxiv_url", f"https://arxiv.org/abs/{p_id}"), 
            "recommendationScore": p_scored.get("score", 9.0),
            "summaries": p_summaries
        })

    # Generate the .ts file
    ts_content = "export type SummaryMode = 'expert' | 'general' | 'lazy'\n\n"
    ts_content += "export type Paper = {\n    id: string\n    title: string\n    authors: string\n    year: string\n    arxivUrl: string\n    recommendationScore: number\n    summaries: {\n        expert: string\n        general: string\n        lazy: string\n    }\n}\n\n"
    ts_content += f"export const generatedYear = '{generated_at.year}';\n"
    ts_content += f"export const generatedDateLabel = {json.dumps(generated_date_label, ensure_ascii=False)};\n\n"
    ts_content += f"export const totalFilteredCount = {len(filtered_papers)};\n\n"
    ts_content += "export const papers: Paper[] = " + json.dumps(final_papers, indent=4, ensure_ascii=False) + ";\n"
    
    with open(output_ts, "w", encoding="utf-8") as f:
        f.write(ts_content)
    
    print(f"Successfully updated {output_ts}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync curated papers to TypeScript database")
    parser.add_argument("--top10", default="data/top_10.json", help="Input top 10 JSON")
    parser.add_argument("--filtered", default="data/papers_filtered.json", help="Input filtered JSON")
    parser.add_argument("--output", default="data/papers.ts", help="Output .ts file")
    
    args = parser.parse_args()
    sync_to_ts(args.top10, args.filtered, args.output, SUMMARIES)
