import argparse
import json
import os
from datetime import datetime

SUMMARIES = {
    "2603.25746v1": {
        "expert": {
            "zh": "ShotStream 将多镜头视频生成重构为基于历史上下文的因果式 next-shot 生成问题，并通过分布匹配蒸馏把双向教师模型蒸馏为可流式推理的学生模型。它引入全局与局部双缓存机制，再配合 RoPE 间断指示器，在自回归生成时同时维持镜头间和镜头内的一致性。论文还用两阶段蒸馏缓解误差累积，使系统在单卡上达到 16 FPS，真正把交互式叙事视频生成推到了可实时使用的区间。",
            "en": "ShotStream reformulates multi-shot video generation as a causal next-shot prediction problem and distills a bidirectional teacher into a streaming-friendly student with distribution-matching distillation. It combines global and local context caches with a RoPE discontinuity indicator to preserve both inter-shot coherence and intra-shot consistency during autoregressive generation. A two-stage distillation scheme further reduces error accumulation, allowing the system to reach 16 FPS on a single GPU and making real-time interactive storytelling technically plausible.",
        },
        "general": {
            "zh": "这篇论文解决的是“长故事视频很难一边生成一边改”的问题。ShotStream 让用户可以在叙事进行中不断追加指令，同时系统仍能快速生成风格连贯的多镜头视频。",
            "en": "This paper tackles one of the hardest problems in video generation: keeping long narratives editable while generation is still running. ShotStream lets users keep steering the story as it unfolds, while the model continues producing coherent multi-shot video at low latency.",
        },
        "lazy": {
            "zh": "ShotStream 像一个会边听导演喊话边即时出片的 AI 分镜师。",
            "en": "ShotStream is basically an AI storyboard artist that keeps shooting while the director is still giving notes.",
        },
    },
    "2603.25744v1": {
        "expert": {
            "zh": "MuRF 是一个训练零开销的多分辨率推理增强方法，它在冻结的视觉基础模型上同时处理多种输入尺度，并将不同尺度的特征融合成统一表示。核心直觉是低分辨率更擅长全局语义，高分辨率更擅长细节精修，而传统单尺度推理浪费了这种互补性。论文证明它不仅适用于 DINOv2，也能迁移到 SigLIP2 等不同家族的视觉模型，说明这更像是一种通用推理范式而不是模型特调技巧。",
            "en": "MuRF is a training-free multi-resolution inference method that runs a frozen vision foundation model on multiple input scales and fuses the resulting features into a unified representation. The key intuition is that low-resolution inputs capture global semantics while high-resolution inputs preserve fine-grained detail, and single-scale inference throws away that complementarity. The paper shows that the idea transfers across different VFM families, including DINOv2 and SigLIP2, which makes MuRF feel more like a general inference principle than a model-specific hack.",
        },
        "general": {
            "zh": "MuRF 的价值在于它不用重新训练模型，就能让现有视觉大模型“多看几个尺度”后变得更准。对于已经部署好的视觉系统来说，这是一种成本很低但收益很高的升级方式。",
            "en": "MuRF matters because it improves vision foundation models at inference time without retraining them. For teams already deploying large vision models, that makes it a rare upgrade path that is both simple and potentially high impact.",
        },
        "lazy": {
            "zh": "MuRF 的思路很朴素：让视觉模型别只眯着一只眼看图。",
            "en": "MuRF wins by teaching vision models to stop looking at the world through just one zoom level.",
        },
    },
    "2603.25730v1": {
        "expert": {
            "zh": "PackForcing 针对自回归视频扩散模型在长视频生成中的 KV-cache 线性膨胀问题，提出了 Sink、Mid、Recent 三分区历史管理策略。它对中段历史做大幅时空压缩，并结合动态 top-k 上下文选择和连续 Temporal RoPE 调整，在严格限制显存的同时维持长时一致性。最终系统只用 5 秒短视频监督就能外推出 2 分钟、16 FPS 的长视频生成，说明长上下文视频生成不一定要依赖同等长度的训练样本。",
            "en": "PackForcing addresses the linear KV-cache growth that makes autoregressive video diffusion impractical for long sequences by partitioning history into Sink, Mid, and Recent token groups. It heavily compresses the middle context, then uses dynamic top-k selection and continuous Temporal RoPE adjustment to keep memory bounded while preserving long-range temporal consistency. The result is a system that can extrapolate from 5-second training clips to 2-minute generation at 16 FPS, which is a strong argument that long-context video generation does not require equally long supervision.",
        },
        "general": {
            "zh": "这项工作把“长视频生成太吃显存”这个核心瓶颈拆开解决了。它让模型只保留最关键的历史信息，因此可以用更小的内存生成更长、更稳定的视频。",
            "en": "This work directly attacks the memory bottleneck that makes long-video generation so expensive. By keeping only the most useful historical context, it lets the model generate much longer and more stable videos without blowing up compute costs.",
        },
        "lazy": {
            "zh": "PackForcing 的厉害之处在于，它让 AI 学会了怎么“记重点”，所以能把短片练成大片。",
            "en": "PackForcing teaches video models to remember the important parts, which is how short training turns into long movies.",
        },
    },
    "2603.25741v1": {
        "expert": {
            "zh": "Vega 提出统一的 Vision-Language-World-Action 框架，用自回归机制处理视觉与语言输入，再用扩散机制生成未来世界状态和驾驶轨迹。它还配套构建了包含约 10 万个场景的 InstructScene 数据集，把自然语言驾驶指令和对应轨迹明确对齐。相比把语言只当作场景描述的旧方案，Vega 更像是在把自动驾驶规划真正变成可指令化、可个性化的多模态决策问题。",
            "en": "Vega proposes a unified Vision-Language-World-Action framework that uses autoregressive modeling for visual and language inputs and diffusion modeling for future world prediction and trajectory generation. It is trained with InstructScene, a roughly 100K-scene dataset that explicitly aligns diverse natural-language driving instructions with trajectories. Compared with prior pipelines that use language mostly for description or reasoning, Vega moves autonomous driving much closer to true instruction-conditioned planning.",
        },
        "general": {
            "zh": "Vega 想解决的是自动驾驶系统“不太会听话”的问题。它不仅看路，还能理解像“开稳一点”或“准备靠右并入”这类自然语言指令，并把这些偏好反映到驾驶决策里。",
            "en": "Vega is about making self-driving systems more steerable by people. Instead of just understanding the road scene, it also tries to follow natural-language instructions such as drive more cautiously or merge in a certain way.",
        },
        "lazy": {
            "zh": "Vega 让自动驾驶从“自己开”进化到“听得懂你怎么想开”。",
            "en": "Vega pushes autonomous driving from just driving itself to actually understanding how you want it to drive.",
        },
    },
    "2603.25719v1": {
        "expert": {
            "zh": "这篇论文把通用代码智能体用于高层次综合优化，提出了一个两阶段 agent factory：先对子内核做分解优化与 ILP 组合，再让多个专家代理在全局候选上继续做跨函数优化。关键点不只是单个代理能优化硬件，而是代理规模化后能系统性地挖出 pragma 重组、循环融合和存储重构等复杂设计空间。实验里平均 8.27 倍加速、困难案例超过 20 倍，说明“代理并行工厂”已经是硬件优化里值得认真对待的工程范式。",
            "en": "This paper applies general-purpose coding agents to high-level synthesis and organizes them into a two-stage agent factory: sub-kernel decomposition plus ILP-based assembly first, followed by multi-agent global optimization over promising candidates. The important point is not merely that one agent can optimize hardware code, but that scaling coordinated agents can systematically discover pragma recombination, loop fusion, and memory restructuring patterns across a much larger design space. With an average 8.27x speedup and more than 20x on harder kernels, the work makes a serious case for agent parallelism as an engineering paradigm in hardware optimization.",
        },
        "general": {
            "zh": "这项研究说明，通用 AI 编码代理已经不只是在改应用代码，它们开始能在芯片和硬件设计这种更专业的场景里拿到实打实的性能收益。最有意思的是，系统靠的是多代理协作，而不是某个单一“天才代理”。",
            "en": "This study shows that general AI coding agents are starting to produce meaningful gains in specialized hardware-design tasks, not just ordinary software engineering. The most interesting part is that the gains come from coordinated agent teams rather than from a single magical model.",
        },
        "lazy": {
            "zh": "一群通用代码代理联手调硬件，结果把速度硬生生卷上去了。",
            "en": "A team of general coding agents went after hardware optimization and basically brute-forced their way into real speedups.",
        },
    },
    "2603.25738v1": {
        "expert": {
            "zh": "PSDesigner 不是把设计任务简化成一张图的生成，而是试图复现真实设计师的工具链式工作流，包括素材检索、设计文件编辑和操作步骤推断。为此作者构建了带操作轨迹标注的 CreativePSD 数据集，让模型学习如何像设计师一样操作 PSD 文件。这个方向的重要性在于它把“自动设计”从最终像素输出推进到了可编辑、可复用、可继续协作的设计资产层面。",
            "en": "PSDesigner does not reduce design automation to image generation; it tries to reproduce the actual tool-driven workflow of a human designer, including asset collection, design-file editing, and operation planning. To support that, the authors build CreativePSD, a dataset of PSD files annotated with operation traces so the model can learn procedural design behavior. The significance is that it moves automated design from static output pixels toward editable, reusable design artifacts that can remain inside a real production workflow.",
        },
        "general": {
            "zh": "PSDesigner 更像是一个会真正操作设计软件的设计助理，而不是只会吐图的生成模型。对于广告、电商图和营销物料这类场景，它的价值在于结果可以继续编辑，而不是只能截图保存。",
            "en": "PSDesigner behaves more like a design assistant that can actually operate professional design files than like a model that only spits out final images. That matters for ads, e-commerce, and creative production, where teams need editable deliverables instead of one-off renders.",
        },
        "lazy": {
            "zh": "它不是给你一张图就算完，而是想直接把可改的设计稿交到你手里。",
            "en": "Instead of just handing you a picture, PSDesigner wants to hand you the file the designer would still be editing.",
        },
    },
    "2603.25739v1": {
        "expert": {
            "zh": "MegaFlow 把大位移光流估计建模为基于预训练 Vision Transformer 特征的全局匹配问题，再辅以轻量级迭代细化提升亚像素精度。相比依赖局部搜索或特定数据域微调的旧方法，这种做法更好地释放了大模型视觉先验在零样本运动估计上的价值。论文同时在光流和长程点跟踪基准上取得强零样本性能，暗示光流和通用运动估计可能正在向统一范式收敛。",
            "en": "MegaFlow reframes large-displacement optical flow as a global matching problem built on top of pre-trained Vision Transformer features, then uses lightweight iterative refinement to recover sub-pixel accuracy. Unlike prior approaches that rely heavily on local search or domain-specific fine-tuning, it leans into foundation-model priors for zero-shot generalization. Strong results on both optical flow and long-range point tracking suggest that a more unified motion-estimation paradigm may be emerging.",
        },
        "general": {
            "zh": "这项工作的亮点是它在没有特定场景再训练的情况下，仍然能很好地追踪视频里跨度很大的运动。对于通用视频理解和机器人感知，这种零样本泛化很有价值。",
            "en": "The main appeal here is that MegaFlow handles large motion without needing to be retrained for every new domain. That kind of zero-shot robustness is useful anywhere motion estimation feeds into larger perception systems.",
        },
        "lazy": {
            "zh": "MegaFlow 让 AI 在陌生视频里也能盯住那些跑得飞快的东西。",
            "en": "MegaFlow helps AI keep track of things that move wildly fast, even in videos it has never seen before.",
        },
    },
    "2603.25737v1": {
        "expert": {
            "zh": "WriteBack-RAG 的核心观点是：RAG 的知识库不该是一份静态语料，而应该是可被训练和回写的系统组件。它利用标注样本识别有效检索路径，把分散证据蒸馏成更紧凑的知识单元，再把这些单元写回索引，从而在不改生成模型的情况下提升整个 RAG 流水线。跨方法、跨基准都能带来稳定收益，说明这个改进主要发生在语料组织层，而不是特定模型调参层。",
            "en": "The core argument of WriteBack-RAG is that the corpus in a RAG system should not be treated as static; it should be trainable and writable. The framework identifies successful retrieval evidence, distills it into compact knowledge units, and writes those units back into the index so downstream RAG pipelines improve without changing the generator. The fact that the gains transfer across methods and benchmarks suggests the improvement lives in corpus structure rather than in model-specific tuning.",
        },
        "general": {
            "zh": "很多 RAG 系统的问题不在模型本身，而在知识库太碎、太吵、太难检索。WriteBack-RAG 的做法就是先把有用证据提纯，再把整理后的知识写回去，让下一次检索从一开始就站在更好的地基上。",
            "en": "A lot of RAG failures come less from the model and more from a messy, fragmented knowledge base. WriteBack-RAG cleans and compresses the evidence, then writes it back so future retrieval starts from a better-organized corpus.",
        },
        "lazy": {
            "zh": "它相当于先把知识库整理一遍，再让 AI 去查资料，所以答题自然更稳。",
            "en": "It basically tidies up the knowledge base before the AI searches it, which is why the answers get better.",
        },
    },
    "2603.25720v1": {
        "expert": {
            "zh": "R-C2 把多模态推理里的视觉-文本不一致性直接变成强化学习信号，要求模型在不同模态之间来回做推理并重构答案，从而形成循环一致性约束。这个设计提供了高密度、无标签的奖励，避免只是靠投票或后处理去掩盖模态冲突。实验中最高提升 7.6 个百分点，说明结构一致性本身可以成为多模态模型学习更稳健内部表示的重要驱动。",
            "en": "R-C2 turns visual-text inconsistency inside multimodal models into a reinforcement-learning signal by forcing the model to reason back and forth across modalities and reconstruct the answer under a cycle-consistency constraint. That yields a dense, label-free reward instead of relying on voting or post hoc aggregation to paper over contradictions. The reported gains of up to 7.6 points suggest that structural consistency itself is a meaningful driver of stronger multimodal internal representations.",
        },
        "general": {
            "zh": "这篇论文的重点不是让模型多看点数据，而是让它在图像理解和文本理解之间保持逻辑闭环。这样一来，模型面对多模态问题时更不容易自相矛盾。",
            "en": "This paper is less about feeding the model more data and more about forcing its image-side and text-side reasoning to agree with each other. That makes multimodal answers less self-contradictory and more reliable.",
        },
        "lazy": {
            "zh": "R-C2 逼着 AI 把图像和文字两套脑回路对齐，不许各说各话。",
            "en": "R-C2 makes the image brain and text brain inside the model stop arguing with each other.",
        },
    },
    "2603.25723v1": {
        "expert": {
            "zh": "Natural-Language Agent Harnesses 试图把通常藏在运行时控制器代码里的 agent harness 抽出来，表达成可编辑、可迁移的自然语言工件。配套的 Intelligent Harness Runtime 则通过显式合同、持久化工件和轻量适配器去执行这些自然语言 harness。这个方向的意义在于，智能体控制逻辑终于可以被当作独立对象来比较、复用和研究，而不再被具体框架实现细节淹没。",
            "en": "Natural-Language Agent Harnesses tries to externalize agent harness logic that is usually buried in runtime-specific controller code and express it as editable, portable natural-language artifacts. The accompanying Intelligent Harness Runtime executes those harnesses through explicit contracts, durable artifacts, and lightweight adapters. The broader significance is that harness engineering becomes something that can be compared, reused, and studied as an object in its own right instead of being trapped inside implementation details.",
        },
        "general": {
            "zh": "很多智能体系统的关键控制逻辑现在都写得很散、很隐蔽、很难迁移。NLAH 的想法是把这些高层行为规则提出来，用更可读也更可共享的方式表达出来。",
            "en": "A lot of important agent behavior today lives in scattered controller code that is hard to port or inspect. NLAH argues that those high-level rules should be pulled out and expressed in a form humans can read, edit, and share more easily.",
        },
        "lazy": {
            "zh": "它想把“怎么管 agent”这件事，从一堆暗黑控制代码变成人人看得懂的说明书。",
            "en": "It wants to turn agent control from hidden controller spaghetti into something closer to an editable instruction manual.",
        },
    },
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

    paper_map = {paper["id"]: paper for paper in filtered_papers}

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
    for curated_paper in top_10:
        paper_id = curated_paper["id"]
        if paper_id not in paper_map:
            print(f"Warning: Paper {paper_id} not found in filtered data.")
            continue

        source_paper = paper_map[paper_id]

        try:
            published_at = source_paper.get("published") or source_paper.get("updated")
            year = str(datetime.strptime(published_at, "%Y-%m-%dT%H:%M:%SZ").year)
        except Exception:
            year = str(datetime.now().year)

        paper_summaries = summaries.get(
            paper_id,
            {
                "expert": {
                    "zh": source_paper.get("summary", "暂无专业版摘要。"),
                    "en": source_paper.get("summary", "No expert summary available."),
                },
                "general": {
                    "zh": "通用版摘要稍后补充。",
                    "en": "General summary coming soon.",
                },
                "lazy": {
                    "zh": "懒人版摘要稍后补充。",
                    "en": "Lazy summary coming soon.",
                },
            },
        )

        authors = source_paper.get("authors", "Unknown")
        if isinstance(authors, list):
            authors = ", ".join(authors)

        final_papers.append(
            {
                "id": paper_id,
                "title": source_paper["title"],
                "authors": authors,
                "year": year,
                "arxivUrl": source_paper.get("arxiv_url", f"https://arxiv.org/abs/{paper_id}"),
                "recommendationScore": curated_paper.get("score", 9.0),
                "summaries": paper_summaries,
            }
        )

    ts_content = """export type SummaryMode = 'expert' | 'general' | 'lazy'

// Support both legacy string format and new bilingual format
export type SummaryContent = string | {
    zh: string
    en: string
}

export type Paper = {
    id: string
    title: string
    authors: string
    year: string
    arxivUrl: string
    recommendationScore: number
    summaries: {
        expert: SummaryContent
        general: SummaryContent
        lazy: SummaryContent
    }
}

// Helper function to get summary text based on language
export function getSummaryText(summary: SummaryContent, language: 'zh' | 'en'): string {
    if (typeof summary === 'string') {
        return summary
    }
    return summary[language] || summary.zh || summary.en
}

"""
    ts_content += f"export const generatedYear = '{generated_at.year}';\n"
    ts_content += f"export const generatedDateLabel = {json.dumps(generated_date_label, ensure_ascii=False)};\n\n"
    ts_content += f"export const totalFilteredCount = {len(filtered_papers)};\n\n"
    ts_content += "export const papers: Paper[] = "
    ts_content += json.dumps(final_papers, indent=4, ensure_ascii=False)
    ts_content += ";\n"

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
