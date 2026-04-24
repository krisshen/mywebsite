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
export const generatedDateLabel = "2026年4月24日星期五";

export const totalFilteredCount = 199;

export const papers: Paper[] = [
    {
        "id": "2604.07223v1",
        "title": "TraceSafe: A Systematic Assessment of LLM Guardrails on Multi-Step Tool-Calling Trajectories",
        "authors": "Yen-Shan Chen, Sian-Yao Huang, Cheng-Lin Yang, Yun-Nung Chen",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07223v1",
        "recommendationScore": 9.8,
        "summaries": {
            "expert": {
                "zh": "该研究引入 TraceSafe-Bench 以评估大型语言模型（LLM）护栏在多步工具调用轨迹中的效能。实验发现，风险检测性能主要受限于结构化数据的处理能力而非语义安全对齐，且通用 LLM 在该任务上始终优于专用安全护栏。",
                "en": "TraceSafe-Bench assesses mid-trajectory safety in autonomous agents across 12 risk categories including prompt injection and privacy leaks. The study identifies that guardrail performance is primarily dictated by structural data competence, such as JSON parsing, rather than semantic safety alignment."
            },
            "general": {
                "zh": "随着 AI 助手开始自主操作各种软件工具，如何防止它们执行危险指令变得非常重要。这项研究测试了多种 AI 的防御能力，发现能够准确解析复杂数据格式的 AI 往往更安全。",
                "en": "Researchers created a new benchmark to test how well AI safety tools function when an AI is performing complex, multi-step tasks. They found that general-purpose AI models often outperform specialized safety software in detecting these intermediate risks."
            },
            "lazy": {
                "zh": "评估 AI 助手在执行多步任务时是否安全的新基准。",
                "en": "This study tests whether AI safety guards can stop harmful actions from occurring during complex, multi-step agent workflows."
            }
        }
    },
    {
        "id": "2604.07343v1",
        "title": "Personalized RewardBench: Evaluating Reward Models with Human Aligned Personalization",
        "authors": "Qiyao Ma, Dechen Gao, Rui Cai, Boqi Zhao, Hanchu Zhou, Junshan Zhang, Zhe Zhao",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07343v1",
        "recommendationScore": 9.6,
        "summaries": {
            "expert": {
                "zh": "Personalized RewardBench 旨在评估奖励模型捕捉人类多元化及个性化偏好的能力。研究表明，现有顶尖奖励模型在个性化任务上表现欠缺，其基准测试结果与下游任务（如 BoN 采样和 PPO 优化）的性能具有高度相关性。",
                "en": "Personalized RewardBench evaluates reward models' ability to capture individual user preferences through tailored rubrics while maintaining high general response quality. Results indicate that existing state-of-the-art models struggle with personalization, yet the benchmark serves as a robust proxy for downstream performance in sampling and optimization tasks."
            },
            "general": {
                "zh": "每个人对 AI 的好坏评价标准不一，但现有的测试工具很难衡量 AI 是否符合个人口味。这个新工具专门测量 AI 奖励模型是否能真正理解并顺应用户的个性化偏好。",
                "en": "This paper introduces a new way to measure how well AI models understand and follow a specific person's unique preferences. The findings show that current top-tier models still have difficulty perfectly tailoring their responses to individual user needs."
            },
            "lazy": {
                "zh": "衡量 AI 奖励模型是否懂你“私人定制”偏好的测试工具。",
                "en": "This benchmark measures how effectively an AI can learn and respect what a specific individual likes."
            }
        }
    },
    {
        "id": "2604.07190v1",
        "title": "The ATOM Report: Measuring the Open Language Model Ecosystem",
        "authors": "Nathan Lambert, Florian Brand",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07190v1",
        "recommendationScore": 9.4,
        "summaries": {
            "expert": {
                "zh": "ATOM 报告对全球开源语言模型生态进行了深入分析，涵盖了下载量、衍生模型及推理市场份额等指标。报告记录了中国模型在 2025 年夏季在规模和普及度上超越美国同行，并持续扩大领先优势的趋势。",
                "en": "The ATOM Report analyzes the adoption and performance of approximately 1,500 mainline open language models, including major releases from Alibaba, DeepSeek, and Meta. It documents a significant shift where Chinese open-source models surpassed U.S. counterparts in market share and performance during the summer of 2025."
            },
            "general": {
                "zh": "这份报告全面审视了目前全球最顶尖的开源 AI 模型是谁在开发以及谁在用。它发现中国开发的 AI 模型在影响力上已经超过了美国，成为全球研究者和创业者的重要基础。",
                "en": "This report provides a global overview of the open-source AI model landscape and the organizations developing them. It highlights a major trend showing that models from China are now leading the ecosystem compared to those developed in the U.S."
            },
            "lazy": {
                "zh": "开源 AI 模型生态普查：中国模型已占据全球领先地位。",
                "en": "This report reveals that Chinese open-source AI models have become the new global leaders in the field."
            }
        }
    },
    {
        "id": "2604.07238v1",
        "title": "On the Price of Privacy for Language Identification and Generation",
        "authors": "Xiaoyu Li, Andi Han, Jiaojiao Jiang, Junbin Gao",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07238v1",
        "recommendationScore": 9.1,
        "summaries": {
            "expert": {
                "zh": "本文研究了在差分隐私（DP）限制下进行语言识别与生成的统计成本，并确立了匹配的上下界。结果证明，在近似 DP 下隐私保护几乎不产生额外误差成本，而在纯 DP 下误差率仅呈现轻微的指数级衰减。",
                "en": "This research establishes algorithms and lower bounds to quantify the cost of privacy in language identification and generation within an agnostic statistical setting. It demonstrates that approximate differential privacy recovers non-private error rates, while pure differential privacy results in a predictable exponent degradation factor of min{1, ε}."
            },
            "general": {
                "zh": "在训练 AI 时保护用户隐私会大幅降低其性能吗？这项数学研究证明，在采用先进的隐私保护技术时，AI 学习语言的能力受到的影响其实非常微小。",
                "en": "This study explores the trade-offs between maintaining user privacy and the accuracy of AI language models. It concludes that the performance cost for protecting privacy is actually quite low when using modern technical methods."
            },
            "lazy": {
                "zh": "科学研究证明，保护用户隐私对 AI 性能的影响其实很小。",
                "en": "This paper proves that making AI models private doesn't have to significantly reduce their accuracy."
            }
        }
    },
    {
        "id": "2604.07345v1",
        "title": "Measurement of Generative AI Workload Power Profiles for Whole-Facility Data Center Infrastructure Planning",
        "authors": "Roberto Vercellino, Jared Willard, Gustavo Campos, Weslley da Silva Pereira, Olivia Hull, Matthew Selensky, Juliane Mueller",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07345v1",
        "recommendationScore": 8.9,
        "summaries": {
            "expert": {
                "zh": "该研究利用 NVIDIA H100 GPU 测量了生成式 AI 在训练、微调和推理负载下的高分辨率电力特征。通过 bottom-up 的数据中心能源模型，将这些特征扩展至设施级别，为电网连接和基础设施规划提供数据支持。",
                "en": "This study provides high-resolution power profiles for Generative AI workloads using NVIDIA H100 GPUs, capturing training and inference data at 0.1-second intervals. These profiles are utilized in a bottom-up data center energy model to simulate whole-facility demand for improved infrastructure and grid planning."
            },
            "general": {
                "zh": "生成式 AI 的运行非常耗电，这对数据中心的电力规划提出了挑战。这项工作通过精确测量 AI 在不同任务下的用电波动，帮助建设者更好地设计电网和能源供应系统。",
                "en": "Scientists measured exactly how much electricity AI chips consume every tenth of a second while they work. This information helps data center operators plan for energy needs and design more efficient power systems."
            },
            "lazy": {
                "zh": "精确测量 AI 运行时的耗电特征，为数据中心电力规划提供依据。",
                "en": "Researchers measured the precise electricity usage of AI hardware to help design better and more reliable data centers."
            }
        }
    },
    {
        "id": "2604.07242v1",
        "title": "Weaves, Wires, and Morphisms: Formalizing and Implementing the Algebra of Deep Learning",
        "authors": "Vincent Abbott, Gioele Zardini",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07242v1",
        "recommendationScore": 8.7,
        "summaries": {
            "expert": {
                "zh": "该论文引入了一个基于范畴论的深度学习形式化框架，通过轴步幅和数组广播范畴来精确描述模型架构。该框架支持代数构建模型，并提供了可在 PyTorch 中编译和渲染图表的 Python 及 TypeScript 实现。",
                "en": "The paper introduces a categorical framework that formalizes deep learning architectures through novel axis-stride and array-broadcasted categories. This allows for precise compositional manipulation of model functions and includes implementations in Python and TypeScript for algebraic construction and PyTorch compilation."
            },
            "general": {
                "zh": "深度学习模型通常由零散的代码和图表描述，缺乏严谨的数学定义。这项工作用高级数学语言为 AI 模型建立了一套标准“说明书”，让设计和分析模型变得更加系统化。",
                "en": "This paper proposes a new mathematical language to describe the complex internal structures of deep learning models. It provides tools that convert these mathematical blueprints into visual diagrams and actual computer code for building AI."
            },
            "lazy": {
                "zh": "用严谨的数学代数框架重新定义深度学习模型的设计。",
                "en": "This paper uses advanced math to create a more systematic way to design and build AI model architectures."
            }
        }
    },
    {
        "id": "2604.07321v1",
        "title": "Syntax Is Easy, Semantics Is Hard: Evaluating LLMs for LTL Translation",
        "authors": "Priscilla Kyei Danso, Mohammad Saqib Hasan, Niranjan Balasubramanian, Omar Chowdhury",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07321v1",
        "recommendationScore": 8.5,
        "summaries": {
            "expert": {
                "zh": "该工作评估了 LLM 将自然语言翻译为线性时序逻辑（LTL）的能力，分析了其在语法和语义维度的表现。研究发现，虽然 AI 擅长语法格式，但在理解深层逻辑语义方面仍面临挑战，而将其转化为代码补全任务可显著提升效果。",
                "en": "This work evaluates LLMs on translating English into Linear Temporal Logic (LTL) for security and privacy policy specifications. Findings show that while models handle syntactic structures well, they struggle with semantics, though reformulating the task as code completion significantly improves accuracy."
            },
            "general": {
                "zh": "让 AI 把普通人说的话转换成严密的逻辑指令是一项挑战。研究发现，目前的 AI 往往只是“模仿”逻辑的格式，而未能真正理解逻辑背后的复杂含义。",
                "en": "The study tests if AI can translate everyday English into the strict mathematical logic used for software security. It found that while AI is good at following grammar, it often misunderstands the actual meaning of the security rules it is supposed to create."
            },
            "lazy": {
                "zh": "评估 AI 将自然语言转化为严谨逻辑指令的能力，发现语义理解依然是难点。",
                "en": "This research checks if AI can correctly turn English instructions into complex mathematical logic for security purposes."
            }
        }
    },
    {
        "id": "2604.07348v1",
        "title": "MoRight: Motion Control Done Right",
        "authors": "Shaowei Liu, Xuanchi Ren, Tianchang Shen, Huan Ling, Saurabh Gupta, Shenlong Wang, Sanja Fidler, Jun Gao",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07348v1",
        "recommendationScore": 8.3,
        "summaries": {
            "expert": {
                "zh": "MoRight 框架通过解耦运动建模实现了相机视角与物体动作的独立控制。模型学习了主动与被动运动的因果关系，支持用户在自由调整视角的同时进行前向后果预测或逆向动作推导。",
                "en": "MoRight utilizes temporal cross-view attention to disentangle object motion from camera viewpoints in video generation. By decomposing motion into active user-driven actions and passive consequences, the framework learns to predict physically plausible causal interactions and enables both forward and inverse reasoning."
            },
            "general": {
                "zh": "在生成视频时，想要单独控制镜头移动和物体的特定动作通常很难。这个新系统让用户可以像导演一样，在自由换角度的同时，还能精准控制物体的动作及其引发的后续反应。",
                "en": "This new technology allows users to control specific object movements in a video while independently adjusting the camera angle. It also ensures that if one object moves, others in the scene react in a realistic, causal way."
            },
            "lazy": {
                "zh": "实现视频生成中视角和物体运动的完美分离与因果控制。",
                "en": "This tool provides better control over movements and camera angles in AI-generated videos while keeping them realistic."
            }
        }
    },
    {
        "id": "2604.07279v1",
        "title": "Mem3R: Streaming 3D Reconstruction with Hybrid Memory via Test-Time Training",
        "authors": "Changkun Liu, Jiezhi Yang, Zeman Li, Yuan Deng, Jiancong Guo, Luca Ballan",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07279v1",
        "recommendationScore": 8.1,
        "summaries": {
            "expert": {
                "zh": "Mem3R 采用混合记忆设计，通过测试时训练（TTT）更新轻量级 MLP 以解耦相机追踪与几何映射。该设计有效缓解了长序列处理中的漂移和遗忘问题，在显著降低参数量的同时大幅提升了重建精度。",
                "en": "Mem3R utilizes a hybrid memory design to decouple camera tracking from geometric mapping, addressing temporal forgetting in streaming 3D reconstruction. It uses an implicit fast-weight MLP updated via Test-Time Training for tracking, which significantly reduces Absolute Trajectory Error on long sequences compared to existing recurrent models."
            },
            "general": {
                "zh": "在机器人和现实增强应用中，AI 需要在移动过程中实时记住周围的 3D 环境。Mem3R 通过一种特殊的记忆机制，让 AI 在处理长视频流时更精准、更省资源，且不会“健忘”。",
                "en": "This research introduces a better way for robots or AR devices to build 3D maps of their surroundings in real-time. By separating how the device tracks its own movement from how it maps the room, the system avoids becoming confused over long distances."
            },
            "lazy": {
                "zh": "专为长视频流设计的实时、精准 3D 环境重建新模型。",
                "en": "This system helps robots and AR devices build more accurate 3D maps of rooms without getting lost over time."
            }
        }
    },
    {
        "id": "2604.07340v1",
        "title": "TC-AE: Unlocking Token Capacity for Deep Compression Autoencoders",
        "authors": "Teng Li, Ziyuan Huang, Cong Chen, Yangfu Li, Yuanhuiyi Lyu, Dandan Zheng, Chunhua Shen, Jun Zhang",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07340v1",
        "recommendationScore": 7.9,
        "summaries": {
            "expert": {
                "zh": "TC-AE 提出了一种基于 ViT 的深度压缩自动编码器，通过两阶段解码分解和联合自监督训练来扩展令牌容量。这种设计有效解决了高压缩比下的潜在表示崩溃问题，显著提升了图像重建与生成的质量。",
                "en": "TC-AE improves ViT-based deep compression autoencoders by decomposing token-to-latent compression into two stages to prevent structural information loss. Additionally, joint self-supervised training is employed to enhance the semantic structure of image tokens, mitigating the collapse of latent representations in generative tasks."
            },
            "general": {
                "zh": "为了节省资源，AI 生成图像前需要对图像进行深度压缩，但这往往会导致细节丢失或画面崩溃。这项新技术通过提升图像“令牌”的处理能力，让画面在高度压缩后依然能保持高质量的细节。",
                "en": "Researchers developed a new method to shrink image files significantly while ensuring they remain high-quality for AI to use. Their technique focuses on how the small building blocks of an image are compressed to prevent any loss of important detail."
            },
            "lazy": {
                "zh": "通过提升令牌容量，解决图像深度压缩后的画质崩溃问题。",
                "en": "This is a new way to compress images that keeps them looking sharp and detailed for AI applications."
            }
        }
    }
];
