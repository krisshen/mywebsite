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
export const generatedDateLabel = "2026年4月3日星期五";

export const totalFilteredCount = 208;

export const papers: Paper[] = [
    {
        "id": "2604.01221v1",
        "title": "HippoCamp: Benchmarking Contextual Agents on Personal Computers",
        "authors": "Zhe Yang, Shulin Tian, Kairui Hu, Shuai Liu, Hoang-Nhat Nguyen, Yichi Zhang, Zujin Guo, Mengying Yu, Zinan Zhang, Jingkang Yang, Chen Change Loy, Ziwei Liu",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.01221v1",
        "recommendationScore": 9.6,
        "summaries": {
            "expert": {
                "zh": "针对个人电脑文件管理的HippoCamp基准，涵盖42.4GB跨模态文件和密集的轨迹标注。分析显示，多模态感知和证据锚定是当前MLLM在处理海量个人数据时的主要瓶颈。",
                "en": "HippoCamp is a multimodal file management benchmark featuring 42.4 GB of data across 2K files with 581 QA pairs. It includes 46.1K structured trajectories for failure diagnosis, revealing that multimodal perception and evidence grounding are the primary bottlenecks for personal AI assistants."
            },
            "general": {
                "zh": "测试AI在你的私人电脑里找文件、分析照片和处理文档的能力，这是构建个人助理的必经之路。现状是即便是最强模型在理解个人侧写和长程搜索上也经常翻车。",
                "en": "AI agents often fail when dealing with a user's real, messy personal files across different formats. HippoCamp provides a realistic environment to test how well agents can search, reason, and manage files on a personal computer."
            },
            "lazy": {
                "zh": "以后想让AI帮你翻电脑里的陈年旧账，这个榜单告诉你哪个智能体最靠谱。",
                "en": "A massive benchmark testing how well AI actually handles your personal files and photos."
            }
        }
    },
    {
        "id": "2604.01220v1",
        "title": "Universal YOCO for Efficient Depth Scaling",
        "authors": "Yutao Sun, Li Dong, Tianzhu Ye, Shaohan Huang, Jianyong Wang, Furu Wei",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.01220v1",
        "recommendationScore": 9.5,
        "summaries": {
            "expert": {
                "zh": "提出YOCO-U架构，将YOCO的解码器-解码器设计与参数共享的递归计算相结合。该架构通过在浅层层进行多次迭代，实现了恒定的全局KV缓存和线性预填充，同时显著增强了模型的表达深度。",
                "en": "YOCO-U integrates the decoder-decoder architecture of YOCO with recursive computation via a Universal Self-Decoder. This setup performs multiple parameter-shared iterations in shallow efficient-attention layers, maintaining a constant global KV cache and linear pre-filling."
            },
            "general": {
                "zh": "解决了标准Transformer在扩展推理计算时KV缓存爆炸的痛点，通过架构优化实现了极高的推理效率。它能在不牺牲性能的前提下，让大模型在处理长上下文时更加轻快。",
                "en": "Standard Transformers face high memory and compute costs when scaling depth due to KV cache growth. This architecture allows for increased model depth and better reasoning through recursion while keeping inference efficient and memory usage constant."
            },
            "lazy": {
                "zh": "把大模型变深的同时不让显存炸裂，YOCO-U让推理变得既深邃又省事。",
                "en": "Recursive computation makes deeper models smarter without eating up more memory."
            }
        }
    },
    {
        "id": "2604.01212v1",
        "title": "YC-Bench: Benchmarking AI Agents for Long-Term Planning and Consistent Execution",
        "authors": "Muyu He, Adit Jain, Anand Kumar, Vincent Tu, Soumyadeep Bakshi, Sachin Patro, Nazneen Rajani",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.01212v1",
        "recommendationScore": 9.5,
        "summaries": {
            "expert": {
                "zh": "推出模拟创业环境的YC-Bench，要求智能体在长达一年的周期内处理员工管理与合同决策等数百轮交互。实验发现Scratchpad的使用是成功的关键指标，而对抗性环境感知仍是当前模型的短板。",
                "en": "YC-Bench evaluates agents on a simulated one-year startup management task spanning hundreds of turns. Results from 12 models show that scratchpad usage is the best predictor of success, while adversarial client detection is the primary cause of failure."
            },
            "general": {
                "zh": "专门测试AI在真实复杂场景下的长期规划能力，看它们能否在长达几百步的博弈中保持不破产。测试结果揭示了即使是顶尖模型在处理连环错误和资源分配时依然面临严峻挑战。",
                "en": "Measuring an AI's ability to plan over long periods is difficult. This benchmark tests agents in a complex startup simulation, revealing that most current models still struggle with compounding mistakes and long-term strategic coherence."
            },
            "lazy": {
                "zh": "想看AI当CEO能不能活过一年？这个测试可能会让大多数模型直接“破产”。",
                "en": "A benchmark that forces AI to run a startup for a year to see if it goes bankrupt."
            }
        }
    },
    {
        "id": "2604.01210v1",
        "title": "CliffSearch: Structured Agentic Co-Evolution over Theory and Code for Scientific Algorithm Discovery",
        "authors": "Youssef Mroueh, Carlos Fonseca, Brian Belgodere, David Cox",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.01210v1",
        "recommendationScore": 9.4,
        "summaries": {
            "expert": {
                "zh": "提出CliffSearch框架，利用LLM智能体执行变异、交叉和评审等进化算子，实现理论与代码的协同演化。该系统引入了基于正确性和独创性的评审门控，确保发现的算法兼具可解释性与性能优化。",
                "en": "CliffSearch utilizes an agentic evolutionary framework where LLM agents implement operators like crossover and mutation to discover scientific algorithms. The system prioritizes structured artifacts (theory + code) and uses reviewer-gated selection to ensure correctness and originality alongside performance metrics."
            },
            "general": {
                "zh": "将算法发现过程自动化，让AI像科学家一样不断提出、实验并修正理论模型与代码实现。这种方法不仅追求跑分，更强调方案的可复现性和科学原理的严谨性。",
                "en": "Current AI discovery tools often focus on generating code without proper scientific grounding. This framework ensures that discovered algorithms are both novel and theoretically sound by using a structured, agent-led evolutionary process."
            },
            "lazy": {
                "zh": "这是一个让AI自己进化出更强算法的实验室，而且写出的方案人类还能看懂。",
                "en": "LLMs evolve new scientific algorithms by checking both the theory and the code."
            }
        }
    },
    {
        "id": "2604.01195v1",
        "title": "ORBIT: Scalable and Verifiable Data Generation for Search Agents on a Tight Budget",
        "authors": "Nandan Thakur, Zijian Chen, Xueguang Ma, Jimmy Lin",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.01195v1",
        "recommendationScore": 9.3,
        "summaries": {
            "expert": {
                "zh": "构建包含2万个高难度推理查询的ORBIT数据集，采用种子创建、QA生成及内外双重验证的四阶段节俭框架。通过GRPO训练的Qwen3-4B模型在搜索智能体任务上表现强劲，验证了合成数据的有效性。",
                "en": "ORBIT uses a modular four-stage framework—seed creation, QA generation, self-verification, and external search verification—to produce 20K reasoning-intensive queries without paid APIs. The resulting dataset was used to train a Qwen3-4B model via GRPO, achieving strong performance as a search agent."
            },
            "general": {
                "zh": "解决搜索智能体训练数据昂贵且难以验证的问题，提供了一套无需依赖付费API的自动化数据生成方案。开源的数据集和代码为开发者构建高性能、可验证的搜索助手降低了门槛。",
                "en": "Building datasets for web-search agents is often too expensive or complex for small teams. This open-sourced framework allows for the low-cost creation of high-quality training data that requires multi-step reasoning and external verification."
            },
            "lazy": {
                "zh": "没钱买API也能造出高质量推理数据，这个省钱秘籍让小模型也能变身搜索大神。",
                "en": "A frugal way to build high-quality reasoning data for search bots without burning cash."
            }
        }
    },
    {
        "id": "2604.01193v1",
        "title": "Embarrassingly Simple Self-Distillation Improves Code Generation",
        "authors": "Ruixiang Zhang, Richard He Bai, Huangjie Zheng, Navdeep Jaitly, Ronan Collobert, Yizhe Zhang",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.01193v1",
        "recommendationScore": 9.6,
        "summaries": {
            "expert": {
                "zh": "提出简单自蒸馏（SSD）方法，仅通过对模型自身的原始输出进行标准监督微调，无需验证器或强化学习。该研究揭示了SSD通过重塑Token分布，有效解决了解码过程中的精度与探索冲突。",
                "en": "Simple Self-Distillation (SSD) involves sampling solutions from a model and fine-tuning it on its own raw outputs with standard supervised fine-tuning. The researchers found this reshapes token distributions to suppress distractor tails, improving Qwen3-30B-Instruct performance on LiveCodeBench by 12.9 percentage points."
            },
            "general": {
                "zh": "发现LLM写代码时只需通过微调自己的输出就能显著进步，在LiveCodeBench上提升了超过10个百分点。这证明了即使没有外部导师或复杂算法，模型也能实现自我进化的闭环。",
                "en": "Improving code generation usually requires expensive human labels or complex reinforcement learning. This method proves that a model can improve simply by fine-tuning on its own outputs, specifically helping with harder coding problems."
            },
            "lazy": {
                "zh": "AI也玩“左右互搏”，自己教自己写代码居然比以前更厉害了。",
                "en": "Models can get better at coding just by training on their own best guesses."
            }
        }
    },
    {
        "id": "2604.01178v1",
        "title": "Screening Is Enough",
        "authors": "Ken M. Nakanishi",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.01178v1",
        "recommendationScore": 9.4,
        "summaries": {
            "expert": {
                "zh": "引入Multiscreen架构，通过显式阈值的“筛选”机制取代传统Softmax注意力中相对权重的重新分配。该设计实现了绝对查询-键相关性，不仅减少了40%的参数量，还在长文本检索和推理延迟上表现优异。",
                "en": "The paper introduces Multiscreen, replacing standard softmax attention with a screening mechanism that evaluates keys against an explicit threshold to establish absolute relevance. This architecture achieves comparable loss with 40% fewer parameters than Transformers and reduces 100K context inference latency by 3.2x."
            },
            "general": {
                "zh": "传统注意力机制总是“矮子里面拔将军”，而筛选机制则直接丢弃不相关的干扰信息。这种新架构让模型更轻量、运行更快，特别是在处理超长上下文时速度提升可达3.2倍。",
                "en": "Standard attention is inefficient because it compares every key to every query, even irrelevant ones. By using a threshold-based screening method, this new architecture improves speed and context handling while using significantly fewer parameters."
            },
            "lazy": {
                "zh": "别再被迫在垃圾信息里挑最好的了，直接把不合格的Keys统统踢出局。",
                "en": "Softmax is out; screening irrelevant data makes models faster and lighter."
            }
        }
    },
    {
        "id": "2604.01170v1",
        "title": "Online Reasoning Calibration: Test-Time Training Enables Generalizable Conformal LLM Reasoning",
        "authors": "Cai Zhou, Zekai Wang, Menghua Wu, Qianyu Julie Zhu, Flora C. Shi, Chenyu Wang, Ashia Wilson, Tommi Jaakkola, Stephen Bates",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.01170v1",
        "recommendationScore": 9.4,
        "summaries": {
            "expert": {
                "zh": "提出ORCA框架，结合共形预测与元学习进行测试时训练，动态更新校准模块以应对分布偏移。该方法在保证理论风险界限的同时，显著提升了Qwen2.5等模型在复杂推理任务中的采样效率和泛化性。",
                "en": "ORCA is a framework for calibrating the LLM sampling process using conformal prediction and a meta-learning test-time training procedure. It updates a calibration module for each input to maintain valid confidence estimates under distributional shifts, achieving up to 67% compute savings on MATH-500."
            },
            "general": {
                "zh": "针对LLM推理计算昂贵的问题，通过在线校准采样过程，在保持准确率的前提下大幅节省计算资源。它能让模型在面对从未见过的任务时，更聪明地决定何时停止思考。",
                "en": "LLM reasoning can be compute-intensive and poorly calibrated. ORCA provides a way to scale inference efficiently by dynamically updating calibration at test-time, significantly reducing costs while guaranteeing error rates."
            },
            "lazy": {
                "zh": "给AI装个“自知之明”的实时进度条，能省下一半以上的推理算力。",
                "en": "Smarter sampling at test-time saves compute while keeping reasoning reliable."
            }
        }
    },
    {
        "id": "2604.01168v1",
        "title": "S0 Tuning: Zero-Overhead Adaptation of Hybrid Recurrent-Attention Models",
        "authors": "Jack Young",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.01168v1",
        "recommendationScore": 9.3,
        "summaries": {
            "expert": {
                "zh": "针对混合递归-注意力模型，提出仅优化每层递归的一个初始状态矩阵（S0）而不更新权重的PEFT方法。在极少监督数据下，该方法在HumanEval等任务上显著优于LoRA，且推理开销为零。",
                "en": "S0 tuning optimizes a single initial state matrix per recurrent layer while freezing all model weights, outperforming LoRA by 10.8 percentage points on HumanEval. The method demonstrates significant cross-domain transfer on MATH-500 and GSM8K, particularly when verified supervision is scarce."
            },
            "general": {
                "zh": "为混合架构模型提供了一种极轻量级的微调方案，只需调整几十MB的初始状态文件即可快速切换任务。这意味着开发者无需合并权重或重新加载模型就能实现高效的下游任务适配。",
                "en": "Fine-tuning hybrid models often requires heavy weight merging or adds latency. This approach tunes only the initial state of recurrent layers, offering a 48 MB file for task switching that achieves better performance than LoRA without any inference cost."
            },
            "lazy": {
                "zh": "换个“心情”（初始状态）就能让AI写代码变强，还完全不增加推理负担。",
                "en": "Tune the starting state, not the weights, for zero-overhead model adaptation."
            }
        }
    },
    {
        "id": "2604.01151v1",
        "title": "Detecting Multi-Agent Collusion Through Multi-Agent Interpretability",
        "authors": "Aaron Rose, Carissa Cullen, Brandon Gary Kaplowitz, Christian Schroeder de Witt",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.01151v1",
        "recommendationScore": 9.2,
        "summaries": {
            "expert": {
                "zh": "提出NARCBench基准，利用模型激活空间的线性探测技术检测多智能体间的隐蔽协作。研究发现协作信号在处理编码消息时在Token层面具有局部性特征，且不同类型的串通在激活空间表现各异。",
                "en": "The researchers introduce NARCBench to evaluate collusion detection and propose five probing techniques that aggregate per-agent activation scores to identify covert coordination. They achieve 1.00 AUROC in-distribution and show that signals are localized at the token level, specifically spiking during steganographic message processing."
            },
            "general": {
                "zh": "针对LLM智能体可能通过隐蔽手段绕过监管的问题，提出通过分析模型内部状态而非仅通过文本来发现串通。这为多智能体系统的安全审计提供了一种全新的“白盒”监控手段。",
                "en": "LLM agents can covertly coordinate, creating risks for human oversight. This paper uses internal model activations to detect such collusion, providing a way to monitor multi-agent systems without relying solely on text-level inspections."
            },
            "lazy": {
                "zh": "别以为私下打手势AI看不出来，模型内部的“心跳”已经出卖了它们。",
                "en": "Catching colluding AI agents by reading their minds through model activations."
            }
        }
    }
];
