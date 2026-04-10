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
        "id": "2604.07223v1",
        "title": "TraceSafe: A Systematic Assessment of LLM Guardrails on Multi-Step Tool-Calling Trajectories",
        "authors": "Yen-Shan Chen, Sian-Yao Huang, Cheng-Lin Yang, Yun-Nung Chen",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07223v1",
        "recommendationScore": 10,
        "summaries": {
            "expert": {
                "zh": "引入 TraceSafe-Bench 评估多步工具调用轨迹的安全性。研究发现护栏效果受结构化数据处理能力影响远大于语义安全对齐，且通用模型优于专用护栏。",
                "en": "TraceSafe-Bench evaluates the efficacy of LLM guardrails across multi-step tool-calling trajectories using 12 risk categories. The study finds that performance is primarily dictated by structural reasoning competence, such as JSON parsing, rather than semantic safety alignment."
            },
            "general": {
                "zh": "随着 AI 变得更自主，中间执行过程容易出现安全风险。这项研究发现 AI 处理复杂数据格式的能力是其防御风险的关键。",
                "en": "Researchers created a new testing tool to see if AI safety systems can catch errors while an agent performs complex, multi-step tasks. They discovered that an AI's ability to follow data formats is more important for safety than its general safety training."
            },
            "lazy": {
                "zh": "研究 AI 代理在执行多步任务时的安全漏洞与防御。",
                "en": "This paper tests if AI safety guards can actually stop agents from making mistakes during long, complicated workflows."
            }
        }
    },
    {
        "id": "2604.07343v1",
        "title": "Personalized RewardBench: Evaluating Reward Models with Human Aligned Personalization",
        "authors": "Qiyao Ma, Dechen Gao, Rui Cai, Boqi Zhao, Hanchu Zhou, Junshan Zhang, Zhe Zhao",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07343v1",
        "recommendationScore": 9,
        "summaries": {
            "expert": {
                "zh": "提出 Personalized RewardBench 以评估奖励模型捕捉个体用户偏好的能力。研究指出当前主流模型在个性化对齐上表现不足，且该基准与下游任务表现高度相关。",
                "en": "Personalized RewardBench assesses reward models by using chosen and rejected response pairs based on individual user rubrics. The benchmark demonstrates a high correlation with downstream performance in PPO and Best-of-N sampling, revealing that current state-of-the-art models struggle with personalization."
            },
            "general": {
                "zh": "每个人对 AI 回复的好坏评价不同。这个新工具测试 AI 能否根据特定用户的不同品味和标准给出合理的评分。",
                "en": "This paper introduces a new way to measure how well AI can learn a specific person's preferences rather than just general rules. It shows that most current AI models are not yet very good at following individual user styles or requirements."
            },
            "lazy": {
                "zh": "评估 AI 奖励模型对用户个性化偏好的建模能力。",
                "en": "It's a benchmark that checks if AI can actually figure out what you personally like."
            }
        }
    },
    {
        "id": "2604.07274v1",
        "title": "A Systematic Study of Retrieval Pipeline Design for Retrieval-Augmented Medical Question Answering",
        "authors": "Nusrat Sultana, Abdullah Muhammad Moosa, Kazi Afzalur Rahman, Sajal Chandra Banik",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07274v1",
        "recommendationScore": 8,
        "summaries": {
            "expert": {
                "zh": "系统评估了医疗问答中 RAG 流程的设计，涵盖查询重构与重排序等组件。结果显示检索增强显著提升了零样本性能，且领域特定模型表现更佳。",
                "en": "This study systematically evaluates forty retrieval-augmented generation configurations for medical question answering using the MedQA USMLE benchmark. The results indicate that dense retrieval combined with query reformulation and reranking optimizes performance, especially when using domain-specialized language models."
            },
            "general": {
                "zh": "研究如何通过让 AI 在回答医学问题前搜索参考书来减少错误。结果表明这种检索增强方法能让 AI 在普通电脑上也能给出更准确的医疗建议。",
                "en": "Scientists tested many different ways to connect AI to medical textbooks to help it answer health-related questions. They found that using specialized medical AI along with smart search techniques makes the system much more accurate."
            },
            "lazy": {
                "zh": "系统评估检索增强技术对医疗问答系统的性能提升。",
                "en": "Giving AI a medical library and the right search tools makes it much better at passing medical exams."
            }
        }
    },
    {
        "id": "2604.07345v1",
        "title": "Measurement of Generative AI Workload Power Profiles for Whole-Facility Data Center Infrastructure Planning",
        "authors": "Roberto Vercellino, Jared Willard, Gustavo Campos, Weslley da Silva Pereira, Olivia Hull, Matthew Selensky, Juliane Mueller",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07345v1",
        "recommendationScore": 7,
        "summaries": {
            "expert": {
                "zh": "提出一种将高分辨率 GPU 工作负载测量与全设施能耗模型相结合的方法。通过对 H100 GPU 训练与推理功率的精细化建模，为数据中心规划提供支撑。",
                "en": "The authors present high-resolution power consumption profiles for NVIDIA H100 GPUs during various generative AI workloads. These profiles are used in a bottom-up energy model to simulate whole-facility demand, aiding in infrastructure planning for data centers and microgrids."
            },
            "general": {
                "zh": "AI 模型的训练和运行非常耗电。这项工作通过精确测量 AI 的用电模式，帮助数据中心更好地规划电力和能源基础设施。",
                "en": "This research provides detailed data on how much electricity AI chips use when training or running models. This information helps engineers plan the power needs and electrical grids for large data centers."
            },
            "lazy": {
                "zh": "测量生成式 AI 的能效特征以辅助数据中心电力规划。",
                "en": "It measures exactly how much power AI chips use so data centers can plan their electricity needs."
            }
        }
    },
    {
        "id": "2604.07276v1",
        "title": "Making Room for AI: Multi-GPU Molecular Dynamics with Deep Potentials in GROMACS",
        "authors": "Luca Pennati, Andong Hu, Ivy Peng, Lukas Müllender, Stefano Markidis",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07276v1",
        "recommendationScore": 6,
        "summaries": {
            "expert": {
                "zh": "在分子动力学软件 GROMACS 中集成了 DeePMD-kit，实现了跨多 GPU 的神经网络势能推理。研究验证了其在大规模原子系统下的扩展性并分析了性能瓶颈。",
                "en": "This work integrates the DeePMD-kit framework into GROMACS to support GPU-accelerated, domain-decomposed inference of deep potentials. Benchmarking on NVIDIA and AMD GPUs shows that while neural network inference is the primary bottleneck, the implementation maintains strong scaling for large-scale molecular dynamics."
            },
            "general": {
                "zh": "科学家将 AI 模型引入了主流模拟软件，显著提高了模拟精度。这让利用大量显卡进行高水平的药物研发和材料模拟变得更加可行。",
                "en": "Researchers added AI capabilities to a popular chemistry simulation software called GROMACS to make molecular research more accurate. They proved that this new setup can run effectively on large supercomputers with many graphics cards."
            },
            "lazy": {
                "zh": "在 GROMACS 中实现多显卡加速的 AI 分子动力学模拟。",
                "en": "They put AI into a standard chemistry simulator to make it more accurate and faster on powerful computers."
            }
        }
    },
    {
        "id": "2604.07350v1",
        "title": "Fast Spatial Memory with Elastic Test-Time Training",
        "authors": "Ziqiao Ma, Xueyang Yu, Haoyu Zhen, Yuncong Yang, Joyce Chai, Chuang Gan",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07350v1",
        "recommendationScore": 5,
        "summaries": {
            "expert": {
                "zh": "提出弹性测试时训练（Elastic TTT），利用 Fisher 加权先验稳定权重更新。该技术在长序列 4D 重建任务中实现了高效的空时表征学习并缓解了遗忘问题。",
                "en": "Fast Spatial Memory (FSM) utilizes Elastic Test-Time Training with a Fisher-weighted elastic prior to stabilize model updates during long-sequence 4D reconstruction. This approach mitigates catastrophic forgetting and reduces the activation-memory bottleneck by allowing for robust multi-chunk adaptation."
            },
            "general": {
                "zh": "在对视频进行长时长的 3D 建模时，AI 常会忘记之前的信息。新技术通过特殊的记忆机制，让 AI 能在更长的时间跨度内保持记忆的准确性。",
                "en": "This paper introduces a better way for AI to remember 3D scenes as it watches long videos. The new method prevents the AI from forgetting what it saw earlier, leading to much more accurate 3D models of moving objects."
            },
            "lazy": {
                "zh": "采用弹性测试时训练技术提升 4D 重建的长序列稳定性。",
                "en": "It's a way for AI to build 3D models of moving scenes without forgetting previous details or running out of memory."
            }
        }
    },
    {
        "id": "2604.07279v1",
        "title": "Mem3R: Streaming 3D Reconstruction with Hybrid Memory via Test-Time Training",
        "authors": "Changkun Liu, Jiezhi Yang, Zeman Li, Yuan Deng, Jiancong Guo, Luca Ballan",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07279v1",
        "recommendationScore": 4,
        "summaries": {
            "expert": {
                "zh": "提出流式 3D 重建模型 Mem3R，通过混合存储解耦相机跟踪与几何映射。该设计利用测试时训练优化跟踪精度，在降低参数量的同时减少了轨迹误差。",
                "en": "Mem3R employs a hybrid memory design that decouples camera tracking from geometric mapping to improve temporal consistency in streaming 3D reconstruction. The model uses an implicit fast-weight memory for tracking and an explicit token-based state for mapping, resulting in reduced model size and lower trajectory error."
            },
            "general": {
                "zh": "为机器人实时绘制地图开发的新技术。它能像人类一样一边观察一边记录环境，有效解决了长时间运行后的位置偏差问题。",
                "en": "This AI model helps robots and AR headsets map 3D environments more accurately by separating the task of tracking movement from the task of drawing the map. This design uses less memory and prevents the map from becoming distorted over time."
            },
            "lazy": {
                "zh": "通过混合存储和测试时训练实现低漂移的流式 3D 重建。",
                "en": "A smarter 3D mapping AI that stays accurate and uses less memory during long recordings."
            }
        }
    },
    {
        "id": "2604.07348v1",
        "title": "MoRight: Motion Control Done Right",
        "authors": "Shaowei Liu, Xuanchi Ren, Tianchang Shen, Huan Ling, Saurabh Gupta, Shenlong Wang, Sanja Fidler, Jun Gao",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07348v1",
        "recommendationScore": 3,
        "summaries": {
            "expert": {
                "zh": "提出 MoRight 框架实现视频生成中的物体运动与视角解耦。模型通过学习运动因果性，能够预测物体受力后的连锁反应，支持前向预测与逆向动作恢复。",
                "en": "MoRight is a framework for motion-controlled video generation that disentangles camera viewpoints from object motion using temporal cross-view attention. It models motion causality by separating active driving actions from passive consequences, allowing for both forward and inverse physical reasoning."
            },
            "general": {
                "zh": "用户现在可以分别控制视频里物体的动作和观察视角。AI 还能理解因果关系，比如它知道推一下物体会导致什么物理后果。",
                "en": "This tool lets users control the movement of objects in AI-generated videos independently from how the camera moves. It also ensures that when one object moves, other objects in the scene react in a way that looks physically realistic."
            },
            "lazy": {
                "zh": "实现视频生成中物体运动与视角的解耦及因果逻辑控制。",
                "en": "It's an AI video generator that lets you control the camera and object movements separately while keeping the physics real."
            }
        }
    },
    {
        "id": "2604.07340v1",
        "title": "TC-AE: Unlocking Token Capacity for Deep Compression Autoencoders",
        "authors": "Teng Li, Ziyuan Huang, Cong Chen, Yangfu Li, Yuanhuiyi Lyu, Dandan Zheng, Chunhua Shen, Jun Zhang",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07340v1",
        "recommendationScore": 2,
        "summaries": {
            "expert": {
                "zh": "提出 TC-AE 架构，通过两阶段 token 压缩策略解决高压缩比下的表征崩溃问题。结合联合自监督训练增强语义结构，提升了图像重建与生成的质量。",
                "en": "TC-AE improves ViT-based autoencoders by decomposing token-to-latent compression into two stages to prevent latent representation collapse. The architecture also utilizes joint self-supervised training to enhance the semantic structure of image tokens, improving both reconstruction and generation quality."
            },
            "general": {
                "zh": "图片在深度压缩后往往会变得模糊。这项研究通过优化图片“零件”的处理方式，让压缩得很小的图片也能在还原时保持清晰。",
                "en": "Researchers found a new way to compress images for AI without losing the important details that make the pictures look real. Their method prevents the compressed data from becoming a mess, leading to much higher quality AI-generated images."
            },
            "lazy": {
                "zh": "优化令牌容量设计以提升图像压缩与生成的质量。",
                "en": "This new image compressor makes AI-generated pictures look much better even at very small file sizes."
            }
        }
    },
    {
        "id": "2604.07321v1",
        "title": "Syntax Is Easy, Semantics Is Hard: Evaluating LLMs for LTL Translation",
        "authors": "Priscilla Kyei Danso, Mohammad Saqib Hasan, Niranjan Balasubramanian, Omar Chowdhury",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07321v1",
        "recommendationScore": 1,
        "summaries": {
            "expert": {
                "zh": "评估了 LLM 将自然语言翻译为线性时序逻辑（LTL）公式的效果，发现模型语法处理较好但语义理解较弱。研究指出通过代码补全重构任务可有效提升准确性。",
                "en": "This paper evaluates LLMs on translating natural language into Linear Temporal Logic (LTL) for system requirements. The study finds that while models handle LTL syntax well, they struggle with semantics, though performance is boosted when the task is reformulated as a code-completion problem."
            },
            "general": {
                "zh": "软件安全规则通常需要写成复杂的数学公式，该研究测试了 AI 代写这些公式的能力。结果发现 AI 虽然能写对格式，但在理解深层含义上还有欠缺。",
                "en": "This study tested how well AI can translate plain English into a complex logical language used for software security. They found that while AI is good at following the basic rules of the language, it often misses the deeper meaning of the instructions."
            },
            "lazy": {
                "zh": "评估大语言模型翻译线性时序逻辑公式的能力与挑战。",
                "en": "AI is decent at writing the formal rules for security but often gets the actual meaning of the rules wrong."
            }
        }
    }
];
