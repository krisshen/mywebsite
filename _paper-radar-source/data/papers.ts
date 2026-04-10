export type SummaryMode = 'expert' | 'general' | 'lazy'

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

export const generatedYear = '2026';
export const generatedDateLabel = "2026年4月10日星期五";

export const totalFilteredCount = 199;

export const papers: Paper[] = [
    {
        "id": "2604.07350v1",
        "title": "Fast Spatial Memory with Elastic Test-Time Training",
        "authors": "Ziqiao Ma, Xueyang Yu, Haoyu Zhen, Yuncong Yang, Joyce Chai, Chuang Gan",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07350v1",
        "recommendationScore": 9.8,
        "summaries": {
            "expert": {
                "zh": "该论文提出弹性测试时训练（Elastic Test-Time Training），通过 Fisher 加权的弹性先验来稳定快速权重更新。基于该机制的 Fast Spatial Memory 能从长观测序列中学习时空表示，并在新视角下进行时间组合渲染。",
                "en": "This paper introduces Elastic Test-Time Training, which stabilizes fast weight updates using a Fisher-weighted elastic prior centered on an evolving anchor state. The anchor state (an EMA of prior fast weights) enables robust multi-chunk adaptation for 4D reconstruction while reducing forgetting and activation-memory bottlenecks."
            },
            "general": {
                "zh": "该研究面向长序列 3D/4D 重建中的测试时训练不稳定问题，引入“锚点状态”来抑制遗忘和过拟合。结果是在长上下文上实现更快适应与更稳定的重建质量。",
                "en": "The work improves how models reconstruct 3D/4D environments from long sequences by making test-time training more stable. It helps the model adapt quickly without forgetting what it learned earlier."
            },
            "lazy": {
                "zh": "用更稳定的测试时训练，让模型在长视频里更会“记路”和重建世界。",
                "en": "A more stable test-time training method to help AI remember and reconstruct 3D/4D worlds from long videos."
            }
        }
    },
    {
        "id": "2604.07209v1",
        "title": "INSPATIO-WORLD: A Real-Time 4D World Simulator via Spatiotemporal Autoregressive Modeling",
        "authors": "InSpatio Team, Donghui Shen, Guofeng Zhang, Haomin Liu, Haoyu Ji, Hujun Bao, Hongjia Zhai, Jialin Liu, Jing Guo, Nan Wang, Siji Pan, Weihong Pan, Weijian Xie, Xianbin Liu, Xiaojun Xiang, Xiaoyu Zhang, Xinyu Chen, Yifu Wang, Yipeng Chen, Zhenzhou Fan, Zhewen Le, Zhichao Ye, Ziqiang Zhao",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07209v1",
        "recommendationScore": 9.6,
        "summaries": {
            "expert": {
                "zh": "INSPATIO-WORLD 采用时空自回归（STAR）架构：隐式时空缓存聚合观测为潜表示，并用显式空间约束模块强化几何结构。它还提出联合分布匹配蒸馏（JDMD），用真实数据分布正则化生成过程以缓解由合成数据导致的保真度下降。",
                "en": "INSPATIO-WORLD uses a Spatiotemporal Autoregressive (STAR) architecture with an Implicit Spatiotemporal Cache and an Explicit Spatial Constraint Module for geometric structure. It introduces Joint Distribution Matching Distillation (JDMD) to regularize training with real-world distributions and mitigate fidelity degradation from synthetic data reliance."
            },
            "general": {
                "zh": "这是一个可实时生成高保真、可交互动态场景的 4D 世界模拟器，并能从单段参考视频恢复场景。它显著提升空间一致性与交互精度，适合用于导航、规划与仿真。",
                "en": "This simulator can generate realistic, interactive 4D worlds from a single video clip in real time. It focuses on maintaining strong spatial consistency for smooth navigation and interaction."
            },
            "lazy": {
                "zh": "从一段视频生成可互动的 4D 世界，并且还能实时跑起来。",
                "en": "A real-time 4D world simulator that generates interactive scenes from a single video."
            }
        }
    },
    {
        "id": "2604.07223v1",
        "title": "TraceSafe: A Systematic Assessment of LLM Guardrails on Multi-Step Tool-Calling Trajectories",
        "authors": "Yen-Shan Chen, Sian-Yao Huang, Cheng-Lin Yang, Yun-Nung Chen",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07223v1",
        "recommendationScore": 9.5,
        "summaries": {
            "expert": {
                "zh": "TraceSafe-Bench 在多步工具调用轨迹上覆盖 12 类风险，系统评估护栏在“过程”中的检测与拦截能力。结果显示护栏效果更依赖结构化数据理解/轨迹解析能力，而非纯粹的语义安全对齐；且随着轨迹变长，风险行为更可见时，检测表现反而提升。",
                "en": "TraceSafe-Bench evaluates safety across 12 risk categories on multi-step tool-calling trajectories, showing guardrail efficacy is driven more by structural data competence than semantic safety alignment. General-purpose LLMs can outperform specialized guardrails on risk detection, and performance can improve as longer trajectories reveal more dynamic behavior."
            },
            "general": {
                "zh": "该论文提出面向智能体多步工具调用的安全评测基准，专门测“执行过程”而不是单轮文本。结论强调：要让智能体更安全，结构推理与对轨迹的理解能力可能比单纯扩大模型更关键。",
                "en": "This paper introduces a benchmark to test AI safety when agents call tools over multiple steps. It suggests that understanding structured traces matters a lot for guardrails, sometimes more than model size."
            },
            "lazy": {
                "zh": "专门测智能体“多步用工具”的护栏到底靠不靠谱。",
                "en": "A benchmark for how well guardrails work during multi-step tool-using agent runs."
            }
        }
    },
    {
        "id": "2604.07343v1",
        "title": "Personalized RewardBench: Evaluating Reward Models with Human Aligned Personalization",
        "authors": "Qiyao Ma, Dechen Gao, Rui Cai, Boqi Zhao, Hanchu Zhou, Junshan Zhang, Zhe Zhao",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07343v1",
        "recommendationScore": 9.4,
        "summaries": {
            "expert": {
                "zh": "Personalized RewardBench 通过用户特定准则构造响应对，用于评估奖励模型捕捉“个人偏好”的能力。实验表明该基准与 Best-of-N 采样、PPO 微调等下游表现的相关性更强，同时揭示现有 SOTA 奖励模型在个性化上仍明显不足。",
                "en": "Personalized RewardBench evaluates reward models on user-specific rubrics via preference response pairs, measuring personalization rather than generic quality. It correlates better with downstream behavior (e.g., Best-of-N sampling, PPO) and shows current SOTA reward models still struggle to model individualized preferences."
            },
            "general": {
                "zh": "这个基准专门评估奖励模型能否学到“你喜欢什么”，而不仅是平均意义上的好回答。结果显示很多强模型在个性化上并不稳，离真正的“为你定制”还有距离。",
                "en": "This benchmark tests whether reward models can follow an individual’s preferences instead of just general quality. It finds that even strong models still have gaps in true personalization."
            },
            "lazy": {
                "zh": "不是评“好不好”，而是评“是不是你想要的”。",
                "en": "A benchmark for whether reward models match individual user preferences."
            }
        }
    },
    {
        "id": "2604.07236v1",
        "title": "How Much LLM Does a Self-Revising Agent Actually Need?",
        "authors": "Seongwoo Jeong, Seonil Son",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07236v1",
        "recommendationScore": 9.3,
        "summaries": {
            "expert": {
                "zh": "论文提出声明式反射运行协议，将智能体的状态、置信信号与受限动作外部化为可检查的运行时结构，并将能力拆解为显式世界模型规划、符号化反思与稀疏的 LLM 修订。基于带噪声的战舰游戏实验显示，显式规划对胜率贡献最大，而低频 LLM 修订仅带来边际且不单调的提升。",
                "en": "The paper introduces a declared reflective runtime protocol that externalizes agent state, confidence, and constrained actions into inspectable structures, decomposing competence into explicit world-model planning, symbolic reflection, and sparse LLM-based revision. In a noisy Battleship setting, explicit planning drives most of the win-rate gains, while low-frequency conditional LLM revision adds only marginal, non-monotonic improvements."
            },
            "general": {
                "zh": "该研究在问：自我修订智能体到底需要多少“LLM 智能”，以及多少来自外围结构。结论倾向于：把规划与反思做成显式结构，往往比频繁调用 LLM 更能带来稳定收益。",
                "en": "This work asks how much of a self-revising agent’s performance comes from the LLM versus the surrounding structure. It suggests that explicit planning/structure can matter more than frequent LLM intervention."
            },
            "lazy": {
                "zh": "很多时候，智能体更需要“好结构”，而不是“多说两句”。",
                "en": "Agents may benefit more from structured planning than from frequent LLM revisions."
            }
        }
    },
    {
        "id": "2604.07190v1",
        "title": "The ATOM Report: Measuring the Open Language Model Ecosystem",
        "authors": "Nathan Lambert, Florian Brand",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07190v1",
        "recommendationScore": 9.1,
        "summaries": {
            "expert": {
                "zh": "ATOM Report 从下载量、派生模型与推理市场等维度系统测量约 1500 个开源语言模型生态。报告记录了 2025 年夏季后开源模型采用格局的显著变化，并对主流系列（如 Qwen、DeepSeek、Llama）给出数据化对比。",
                "en": "The ATOM Report measures roughly 1,500 open language models via metrics like Hugging Face downloads, derivatives, and inference market share. It documents a major ecosystem shift after mid-2025 and provides data-driven comparisons across leading model families such as Qwen, DeepSeek, and Llama."
            },
            "general": {
                "zh": "这是一份开源大模型生态“体检报告”，告诉你谁在被用、谁在被二次开发、谁在推理市场占主导。它适合用来快速把握开源 LLM 竞争格局与趋势。",
                "en": "This report is a snapshot of the open LLM ecosystem—who gets adopted, forked, and deployed. It’s useful for quickly understanding competitive dynamics and trends."
            },
            "lazy": {
                "zh": "开源大模型世界的“年度盘点”。",
                "en": "A data-driven snapshot of the open LLM ecosystem and how it’s shifting."
            }
        }
    },
    {
        "id": "2604.07230v1",
        "title": "PhyEdit: Towards Real-World Object Manipulation via Physically-Grounded Image Editing",
        "authors": "Ruihang Xu, Dewei Zhou, Xiaolong Shen, Fan Ma, Yi Yang",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07230v1",
        "recommendationScore": 9.0,
        "summaries": {
            "expert": {
                "zh": "PhyEdit 将显式 3D 几何/物理模拟作为可插拔的视觉引导，提升图像编辑中物体操控的空间一致性与尺度/透视正确性。作者还发布 RealManip-10K（含深度标注）与 ManipEval，用于评估 3D 几何精度、操作一致性等维度。",
                "en": "PhyEdit uses explicit 3D geometric/physical simulation as a plug-and-play visual guide to improve spatial manipulation accuracy in image editing. The authors release RealManip-10K (with depth annotations) and the ManipEval benchmark to evaluate 3D geometry accuracy and manipulation consistency."
            },
            "general": {
                "zh": "它解决“把东西挪一下就穿模/比例不对”的老问题，用 3D 几何作为约束让编辑结果更真实。配套数据集与评测让不同方法能在几何一致性上被更公平地比较。",
                "en": "It makes edits more physically and geometrically consistent by using 3D cues, so moved objects look properly scaled and placed. The accompanying dataset/benchmark helps compare methods on spatial correctness."
            },
            "lazy": {
                "zh": "让 P 图更像真的：用 3D 几何约束把物体放对位置和尺度。",
                "en": "Photo editing that uses 3D geometry so moved objects look correctly placed and scaled."
            }
        }
    },
    {
        "id": "2604.07201v1",
        "title": "BRIDGE: Multimodal-to-Text Retrieval via Reinforcement-Learned Query Alignment",
        "authors": "Mohamed Darwish Mounis, Mohamed Mahmoud, Shaimaa Sedek, Mahmoud Abdalla, Mahmoud SalahEldin Kasem, Abdelrahman Abdallah, Hyun-Soo Kang",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07201v1",
        "recommendationScore": 8.9,
        "summaries": {
            "expert": {
                "zh": "BRIDGE 通过强化学习训练的查询对齐模型 FORGE，将含噪的多模态查询蒸馏为更利于检索的紧凑字符串，并结合推理增强稠密检索器 LENS。结果表明，多模态到文本检索的主要瓶颈在“查询对齐/可检索表达”，该系统能显著提升 embedding 相似度驱动的召回表现。",
                "en": "BRIDGE improves multimodal-to-text retrieval with FORGE (an RL-trained query alignment model that distills noisy multimodal queries into compact search strings) and LENS (a reasoning-enhanced dense retriever). The results suggest query alignment is a primary bottleneck, improving embedding-based similarity and retrieval performance."
            },
            "general": {
                "zh": "这是一个更会“把你的图+字意图翻译成搜索词”的检索系统，提升跨模态搜索体验。它强调把查询表达对齐到可检索的文本形式，比单纯换更大编码器更有效。",
                "en": "This system makes multimodal search better by rewriting image+text queries into cleaner, more retrievable text queries. It argues alignment and query formulation matter as much as (or more than) bigger encoders."
            },
            "lazy": {
                "zh": "把复杂的图文查询变成更好搜的关键词，让检索更准。",
                "en": "Turns messy image+text queries into better search text to retrieve more accurately."
            }
        }
    },
    {
        "id": "2604.07238v1",
        "title": "On the Price of Privacy for Language Identification and Generation",
        "authors": "Xiaoyu Li, Andi Han, Jiaojiao Jiang, Junbin Gao",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07238v1",
        "recommendationScore": 8.8,
        "summaries": {
            "expert": {
                "zh": "该研究分析差分隐私（DP）在语言识别与生成中的统计代价，给出算法与匹配下界。在近似 DP 设定下可保持接近非隐私的错误率，而在纯 DP 下误差会按 ε 相关因子呈指数性恶化，给出最优速率刻画。",
                "en": "This work characterizes the agnostic statistical cost of differential privacy (DP) for language identification and generation, providing matching algorithms and lower bounds. It shows approximate DP can retain non-private error rates, while pure DP incurs exponential degradation by an epsilon-dependent factor, yielding optimal rates."
            },
            "general": {
                "zh": "论文量化了“更隐私”会让语言模型/语言识别损失多少准确率。结论是：在很多近似 DP 的现实设定里，隐私代价可能比直觉更小。",
                "en": "The paper studies how much accuracy you lose when enforcing differential privacy in language tasks. It suggests the privacy cost can be surprisingly small in approximate-DP regimes."
            },
            "lazy": {
                "zh": "隐私保护不一定“贵”：在一些设定下性能损失很小。",
                "en": "Privacy can be cheap: some DP setups lose little performance."
            }
        }
    },
    {
        "id": "2604.07165v1",
        "title": "Reason in Chains, Learn in Trees: Self-Rectification and Grafting for Multi-turn Agent Policy Optimization",
        "authors": "Yu Li, Sizhe Tang, Tian Lan",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07165v1",
        "recommendationScore": 8.7,
        "summaries": {
            "expert": {
                "zh": "T-STAR（Tree-structured Self-Taught Agent Rectification）将多轮轨迹合并为“认知树”，用内省估值降低逐步优势估计的方差，并通过 In-Context Thought Grafting 在关键分歧点对比成功/失败分支以合成修正性推理。该框架旨在缓解多步任务的稀疏奖励与长链错误传播问题，提升智能体策略优化稳定性。",
                "en": "T-STAR (Tree-structured Self-Taught Agent Rectification) merges multi-turn trajectories into a Cognitive Tree, enabling variance-reduced step-level advantages via Introspective Valuation. It uses In-Context Thought Grafting to synthesize corrective reasoning at critical divergence points by contrasting successful and failed branches, improving policy optimization under sparse rewards."
            },
            "general": {
                "zh": "它把智能体的决策过程组织成一棵“可能性树”，更容易定位哪一步推理出了问题并进行纠错。这样能让多步任务训练更稳定、更会从失败里学。",
                "en": "It organizes an agent’s multi-step reasoning into a tree so it can pinpoint where chains go wrong and learn corrections. This can make training on long-horizon tasks more stable under sparse feedback."
            },
            "lazy": {
                "zh": "用“树”来帮智能体找错并改正，长链推理更不容易翻车。",
                "en": "A tree-based way for agents to find and fix mistakes in long reasoning chains."
            }
        }
    }
];
