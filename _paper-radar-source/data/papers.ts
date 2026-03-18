export type SummaryMode = 'expert' | 'general' | 'lazy'

export type Paper = {
    id: string
    title: string
    authors: string
    year: string
    arxivUrl: string
    recommendationScore: number
    summaries: {
        expert: string
        general: string
        lazy: string
    }
}

export const generatedYear = '2026';
export const generatedDateLabel = "2026年3月19日星期四";

export const totalFilteredCount = 209;

export const papers: Paper[] = [
    {
        "id": "2603.15620v1",
        "title": "Towards Generalizable Robotic Manipulation in Dynamic Environments",
        "authors": "Heng Fang, Shangru Li, Shuhan Wang, Xuanyang Xi, Dingkang Liang, Xiang Bai",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2603.15620v1",
        "recommendationScore": 9.7,
        "summaries": {
            "expert": "本文针对 VLA 模型在动态环境中时空推理不足的问题，提出了大规模动态操作数据集 DOMINO 和面向预测的统一操作架构 PUMA。DOMINO 覆盖 35 个分层复杂度任务和超过 11 万条专家轨迹，为动态操作提供了系统化训练与评测基础。PUMA 则通过整合历史光流与专门的世界查询来预测目标未来状态，从而显著提升机器人对移动物体的操作成功率。",
            "general": "很多机器人系统擅长抓静止物体，但一碰到会移动的目标就容易失手。这个工作一方面构建了更像真实世界的动态任务数据集，另一方面让模型学会根据过去的运动轨迹去预测下一步位置。结果是机器人不再只是“看到再反应”，而是开始具备一点提前预判的能力。",
            "lazy": "以前机器人更像是在抓摆好的道具，现在它开始学会应付会动的东西了。秘诀就是一边看历史轨迹，一边猜接下来会往哪儿跑。"
        }
    },
    {
        "id": "2603.15619v1",
        "title": "Mixture-of-Depths Attention",
        "authors": "Lianghui Zhu, Yuxin Fang, Bencheng Liao, Shijie Wang, Tianheng Cheng, Zilong Huang, Chen Chen, Lai Wei, Yutao Zeng, Ya Wang, Yi Lin, Yu Li, Xinggang Wang",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2603.15619v1",
        "recommendationScore": 9.6,
        "summaries": {
            "expert": "Mixture-of-Depths Attention 通过让注意力头同时访问当前层序列 KV 和前序层深度 KV，缓解了深层 Transformer 中信息被残差更新不断稀释的问题。作者还专门设计了硬件高效的融合内核与布局策略，使该机制在 64K 长序列下依然能达到接近 FlashAttention-2 的运行效率。实验表明，MoDA 只带来很小的额外计算成本，却能稳定提升模型在下游任务上的表现。",
            "general": "模型越深，早期形成的重要特征越容易在一层层更新中被冲淡。MoDA 的思路是给每一层增加一个“跨层回看”的能力，让它在处理当前信息时也能直接借用之前层的重要结果。这样模型不仅保住了深度带来的表达能力，还减少了“变深反而变钝”的问题。",
            "lazy": "这项技术像是给深层模型装了一个“回看前面灵感”的功能。它让模型不会因为层数太多而忘掉早先的重要信息，所以越做越深也不容易变糊涂。"
        }
    },
    {
        "id": "2603.15618v1",
        "title": "Look Before Acting: Enhancing Vision Foundation Representations for Vision-Language-Action Models",
        "authors": "Yulin Luo, Hao Chen, Zhuangzhe Wu, Bowen Sui, Jiaming Liu, Chenyang Gu, Zhuoyang Liu, Qiuxuan Feng, Jiale Yu, Shuo Gu, Peng Jia, Pheng-Ann Heng, Shanghang Zhang",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2603.15618v1",
        "recommendationScore": 9.3,
        "summaries": {
            "expert": "这篇论文发现，现有视觉-语言-动作模型在动作生成的深层阶段会逐渐丢失对视觉输入的敏感度，导致机器人“越想越看不清”。为了解决这一问题，作者提出 DeepVision-VLA，通过视觉-语言混合 Transformer 将视觉专家模型的多级特征注入 VLA 主干深层，并结合动作引导视觉剪枝机制保留任务相关区域。该方法在模拟与真实场景中都带来了显著性能提升。",
            "general": "很多机器人模型的问题并不是看不见，而是在后续推理过程中把视觉细节慢慢丢掉了。DeepVision-VLA 的思路是给它持续补充高质量视觉线索，并自动过滤掉与当前动作无关的无效区域。这样模型在抓取、定位和执行复杂操作时会更稳，也更不容易被背景噪声带偏。",
            "lazy": "机器人 AI 有时不是手笨，而是想久了就“看走眼”了。这项工作给它加了一个更专注的视觉外挂，让它在干活时始终盯住重点。"
        }
    },
    {
        "id": "2603.15617v1",
        "title": "HorizonMath: Measuring AI Progress Toward Mathematical Discovery with Automatic Verification",
        "authors": "Erik Y. Wang, Sumeet Motwani, James V. Roggeveen, Eliot Hodges, Dulhan Jayalath, Charles London, Kalyan Ramakrishnan, Flaviu Cipcigan, Philip Torr, Alessandro Abate",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2603.15617v1",
        "recommendationScore": 9.8,
        "summaries": {
            "expert": "HorizonMath 构建了一个面向真实前沿数学研究的评测基准，收录了 101 个尚无已知标准解的应用与计算数学问题，并设计了可扩展的自动验证流程。它利用“发现难、验证相对容易”的问题结构，通过高精度数值比对和确定性约束检查来自动评分，因此天然具备抗数据污染能力。作者还报告 GPT 5.4 Pro 在其中两个问题上给出了可能优于现有文献结果的候选解，显示该基准具备真实科研意义。",
            "general": "这不是普通数学刷题集，而是专门用来测 AI 是否接近“做研究”的一套基准。问题本身来自还没有公认答案的真实数学前沿，但验证方式又被设计得足够程序化，因此可以自动判分。它的重要价值在于：终于有一套测试不再只是比谁更会背旧题，而是更接近衡量 AI 能否提出新发现。",
            "lazy": "这相当于给 AI 发了一套“人类都还没完全做出来”的数学卷子。最厉害的地方是，它还能自动判卷，所以特别适合看 AI 到底是在背答案，还是开始真的会思考。"
        }
    },
    {
        "id": "2603.15614v1",
        "title": "Tri-Prompting: Video Diffusion with Unified Control over Scene, Subject, and Motion",
        "authors": "Zhenghong Zhou, Xiaohang Zhan, Zhiqin Chen, Soo Ye Kim, Nanxuan Zhao, Haitian Zheng, Qing Liu, He Zhang, Zhe Lin, Yuqian Zhou, Jiebo Luo",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2603.15614v1",
        "recommendationScore": 9.2,
        "summaries": {
            "expert": "Tri-Prompting 试图统一视频生成中的三种关键控制维度：场景构图、主体一致性和运动控制。它通过双重条件运动模块，将背景的 3D 轨迹控制与前景主体的外观保持分开建模，并配合两阶段训练与 ControlNet 调度策略，兼顾了可控性与视觉质量。结果显示，该框架在多视角主体一致性、3D 一致性和运动准确度上都显著优于现有专用方法。",
            "general": "以前的视频扩散方法通常只能在“场景、角色、动作”三者里做好一两项，很难同时兼顾。Tri-Prompting 试图把这三件事统一起来，让用户既能指定场景，又能保持角色身份稳定，还能控制镜头和动作走向。对视频创作工具来说，这种组合能力很有吸引力，因为它更接近真实的导演式控制。",
            "lazy": "这项技术像是给视频生成 AI 装上了“导演面板”，你可以同时管背景、角色和动作。重点不是画面更炫，而是终于更听话了。"
        }
    },
    {
        "id": "2603.15611v1",
        "title": "Code-A1: Adversarial Evolving of Code LLM and Test LLM via Reinforcement Learning",
        "authors": "Aozhe Wang, Yuchen Yan, Nan Zhou, Zhengxi Lu, Weiming Lu, Jun Xiao, Yueting Zhuang, Yongliang Shen",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2603.15611v1",
        "recommendationScore": 9.5,
        "summaries": {
            "expert": "Code-A1 提出了一种代码模型与测试模型协同对抗演化的强化学习框架，通过将 Code LLM 和 Test LLM 物理分离并赋予相反目标，避免了单模型自博弈时常见的“自合谋”问题。测试模型可以白盒查看候选代码，从而生成更有针对性的对抗性测试用例；同时引入“错题本”机制进行经验回放，稳定训练过程。实验表明，该方法在不依赖人工测试标注的情况下，已能在代码生成和测试生成两端都取得很强表现。",
            "general": "这项工作把“写代码”和“找 Bug”拆成两个 AI，让它们在对抗中一起进化。一个模型负责写出能通过测试的代码，另一个模型专门学习如何设计更刁钻、更真实的测试来拆穿它。这样的训练方式比传统固定测试集更接近真实开发环境，也更可能逼出稳健代码。",
            "lazy": "这是让两个 AI 互相较劲：一个写代码，一个专门挑刺。越打越久，写代码的更严谨，找问题的也更毒，最后两边都变强了。"
        }
    },
    {
        "id": "2603.15599v1",
        "title": "SmartSearch: How Ranking Beats Structure for Conversational Memory Retrieval",
        "authors": "Jesper Derehag, Carlos Calva, Timmy Ghiurau",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2603.15599v1",
        "recommendationScore": 9.1,
        "summaries": {
            "expert": "SmartSearch 质疑了对话记忆系统必须依赖 LLM 进行复杂结构化建模的主流路线，提出了一条几乎全确定性的检索流水线。它通过关键词与实体匹配完成高召回，再用 CrossEncoder 和 ColBERT 融合重排序解决真正的瓶颈：在有限 token 预算内保住最关键证据。实验结果显示，该方法在 CPU 上即可实现低延迟，并在多个长对话记忆基准上超越现有复杂方案。",
            "general": "这项工作最有意思的观点是：记忆系统的关键未必是把历史聊天整理得多漂亮，而是最后能不能排出最相关的内容。SmartSearch 直接对原始对话做检索，再用一个高质量排序阶段筛选重要片段，避免了重型结构化和大规模 GPU 推理。对于做长期记忆 Agent 的工程团队来说，这是一条成本更低、实现更稳的路线。",
            "lazy": "它证明了一件很实用的事：AI 不一定要先把聊天记录整理成复杂数据库，很多时候“搜得准、排得好”就够了。简单说，就是少折腾结构，多把精力花在最后那一轮排序上。"
        }
    },
    {
        "id": "2603.15594v1",
        "title": "OpenSeeker: Democratizing Frontier Search Agents by Fully Open-Sourcing Training Data",
        "authors": "Yuwen Du, Rui Ye, Shuo Tang, Xinyu Zhu, Yijun Lu, Yuzhu Cai, Siheng Chen",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2603.15594v1",
        "recommendationScore": 9.4,
        "summaries": {
            "expert": "OpenSeeker 提出了首个同时开源模型权重和完整训练数据的前沿级搜索智能体方案，目标是打破高性能搜索 Agent 被少数大厂垄断的局面。其核心在于两部分：基于真实网页图谱构造复杂多跳问答任务的可控合成方法，以及通过回溯式摘要对搜索轨迹进行去噪的训练数据生成流程。仅用 1.17 万条合成样本和一次简单 SFT，OpenSeeker 就在多个搜索基准上达到或逼近工业级水平。",
            "general": "很多强搜索 Agent 的关键能力并不只在模型本身，而在训练它们的数据。OpenSeeker 把这件事彻底开源了，不只放出模型，还公开了怎么合成高质量搜索任务和操作轨迹。结果说明，只要数据设计得足够好，即使不用复杂 RL 训练，也能做出很强的网页搜索与多步推理能力。",
            "lazy": "这篇论文把“训练 AI 搜索高手的秘籍”公开了。厉害的不只是模型，而是它把怎样教会 AI 搜索和查资料这套方法也一起开源了。"
        }
    },
    {
        "id": "2603.15569v1",
        "title": "Mamba-3: Improved Sequence Modeling using State Space Principles",
        "authors": "Aakash Lahoti, Kevin Y. Li, Berlin Chen, Caitlin Wang, Aviv Bick, J. Zico Kolter, Tri Dao, Albert Gu",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2603.15569v1",
        "recommendationScore": 9.5,
        "summaries": {
            "expert": "Mamba-3 从状态空间模型视角出发，对线性序列建模做了三项关键升级：更具表达力的离散化递推、复数值状态更新，以及不增加解码延迟的 MIMO 设计。这些改动显著提升了模型的状态跟踪能力和长序列建模质量，同时保持了线性模型在推理阶段的高效率。实验表明，Mamba-3 在 1.5B 规模下已能明显优于前代 Mamba-2 和其他同类线性架构。",
            "general": "这项工作想解决一个老问题：Transformer 很强，但推理又慢又贵；线性模型很快，却常常不够聪明。Mamba-3 通过一套更好的状态更新机制，让模型既保留高速、低内存优势，又补上了状态跟踪和复杂推理方面的短板。对需要处理长文本和高吞吐推理的场景来说，这是一条很有吸引力的路线。",
            "lazy": "Mamba-3 可以理解成“更聪明的轻量版大模型引擎”。它既想跑得快，又不想像之前那样一到复杂任务就掉链子，这次看起来真的更接近两者兼得了。"
        }
    },
    {
        "id": "2603.15557v1",
        "title": "Anatomy of a Lie: A Multi-Stage Diagnostic Framework for Tracing Hallucinations in Vision-Language Models",
        "authors": "Lexiang Xiong, Qi Li, Jingwen Ye, Xinchao Wang",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2603.15557v1",
        "recommendationScore": 9.0,
        "summaries": {
            "expert": "本研究将视觉语言模型的幻觉重新定义为生成过程中的动态认知病理，而不是静态输出错误。作者利用感知熵、推理冲突和决策熵等信息论探针，将模型的推理轨迹映射到低维认知状态空间，并发现几何异常与高信息惊异度在本质上是等价的。该框架在弱监督条件下就能实现高效的幻觉检测，同时还能区分不同模型在感知、推理和决策阶段的失败模式。",
            "general": "这篇论文不是只检查 AI 最后答错了什么，而是拆开它“看图、思考、下结论”的全过程来定位幻觉来源。研究者发现，只要观察模型内部推理轨迹在某个数学空间里是否“走偏”，就能更早、更稳地发现它在一本正经地胡说。这个方法不依赖昂贵标注，对真实系统部署也更友好。",
            "lazy": "这套方法像给 AI 做体检，不是等它说错了再追责，而是提前发现它的思路已经跑偏了。它能帮我们更早识别视觉 AI 什么时候开始“编故事”。"
        }
    }
];
