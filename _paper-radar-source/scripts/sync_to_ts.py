import json
import os
import argparse
from datetime import datetime

# You would paste the generated summaries here if running manually, 
# or the assistant will populate this dictionary.
SUMMARIES = {
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
