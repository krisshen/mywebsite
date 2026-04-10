import argparse
import json
import os
from datetime import datetime

SUMMARIES = {
    "2604.01151v1": {
        "expert": {
            "zh": "提出NARCBench基准，利用模型激活空间的线性探测技术检测多智能体间的隐蔽协作。研究发现协作信号在处理编码消息时在Token层面具有局部性特征，且不同类型的串通在激活空间表现各异。",
            "en": "The researchers introduce NARCBench to evaluate collusion detection and propose five probing techniques that aggregate per-agent activation scores to identify covert coordination. They achieve 1.00 AUROC in-distribution and show that signals are localized at the token level, specifically spiking during steganographic message processing.",
        },
        "general": {
            "zh": "针对LLM智能体可能通过隐蔽手段绕过监管的问题，提出通过分析模型内部状态而非仅通过文本来发现串通。这为多智能体系统的安全审计提供了一种全新的“白盒”监控手段。",
            "en": "LLM agents can covertly coordinate, creating risks for human oversight. This paper uses internal model activations to detect such collusion, providing a way to monitor multi-agent systems without relying solely on text-level inspections.",
        },
        "lazy": {
            "zh": "别以为私下打手势AI看不出来，模型内部的“心跳”已经出卖了它们。",
            "en": "Catching colluding AI agents by reading their minds through model activations.",
        },
    },
    "2604.01168v1": {
        "expert": {
            "zh": "针对混合递归-注意力模型，提出仅优化每层递归的一个初始状态矩阵（S0）而不更新权重的PEFT方法。在极少监督数据下，该方法在HumanEval等任务上显著优于LoRA，且推理开销为零。",
            "en": "S0 tuning optimizes a single initial state matrix per recurrent layer while freezing all model weights, outperforming LoRA by 10.8 percentage points on HumanEval. The method demonstrates significant cross-domain transfer on MATH-500 and GSM8K, particularly when verified supervision is scarce.",
        },
        "general": {
            "zh": "为混合架构模型提供了一种极轻量级的微调方案，只需调整几十MB的初始状态文件即可快速切换任务。这意味着开发者无需合并权重或重新加载模型就能实现高效的下游任务适配。",
            "en": "Fine-tuning hybrid models often requires heavy weight merging or adds latency. This approach tunes only the initial state of recurrent layers, offering a 48 MB file for task switching that achieves better performance than LoRA without any inference cost.",
        },
        "lazy": {
            "zh": "换个“心情”（初始状态）就能让AI写代码变强，还完全不增加推理负担。",
            "en": "Tune the starting state, not the weights, for zero-overhead model adaptation.",
        },
    },
    "2604.01170v1": {
        "expert": {
            "zh": "提出ORCA框架，结合共形预测与元学习进行测试时训练，动态更新校准模块以应对分布偏移。该方法在保证理论风险界限的同时，显著提升了Qwen2.5等模型在复杂推理任务中的采样效率和泛化性。",
            "en": "ORCA is a framework for calibrating the LLM sampling process using conformal prediction and a meta-learning test-time training procedure. It updates a calibration module for each input to maintain valid confidence estimates under distributional shifts, achieving up to 67% compute savings on MATH-500.",
        },
        "general": {
            "zh": "针对LLM推理计算昂贵的问题，通过在线校准采样过程，在保持准确率的前提下大幅节省计算资源。它能让模型在面对从未见过的任务时，更聪明地决定何时停止思考。",
            "en": "LLM reasoning can be compute-intensive and poorly calibrated. ORCA provides a way to scale inference efficiently by dynamically updating calibration at test-time, significantly reducing costs while guaranteeing error rates.",
        },
        "lazy": {
            "zh": "给AI装个“自知之明”的实时进度条，能省下一半以上的推理算力。",
            "en": "Smarter sampling at test-time saves compute while keeping reasoning reliable.",
        },
    },
    "2604.01178v1": {
        "expert": {
            "zh": "引入Multiscreen架构，通过显式阈值的“筛选”机制取代传统Softmax注意力中相对权重的重新分配。该设计实现了绝对查询-键相关性，不仅减少了40%的参数量，还在长文本检索和推理延迟上表现优异。",
            "en": "The paper introduces Multiscreen, replacing standard softmax attention with a screening mechanism that evaluates keys against an explicit threshold to establish absolute relevance. This architecture achieves comparable loss with 40% fewer parameters than Transformers and reduces 100K context inference latency by 3.2x.",
        },
        "general": {
            "zh": "传统注意力机制总是“矮子里面拔将军”，而筛选机制则直接丢弃不相关的干扰信息。这种新架构让模型更轻量、运行更快，特别是在处理超长上下文时速度提升可达3.2倍。",
            "en": "Standard attention is inefficient because it compares every key to every query, even irrelevant ones. By using a threshold-based screening method, this new architecture improves speed and context handling while using significantly fewer parameters.",
        },
        "lazy": {
            "zh": "别再被迫在垃圾信息里挑最好的了，直接把不合格的Keys统统踢出局。",
            "en": "Softmax is out; screening irrelevant data makes models faster and lighter.",
        },
    },
    "2604.01193v1": {
        "expert": {
            "zh": "提出简单自蒸馏（SSD）方法，仅通过对模型自身的原始输出进行标准监督微调，无需验证器或强化学习。该研究揭示了SSD通过重塑Token分布，有效解决了解码过程中的精度与探索冲突。",
            "en": "Simple Self-Distillation (SSD) involves sampling solutions from a model and fine-tuning it on its own raw outputs with standard supervised fine-tuning. The researchers found this reshapes token distributions to suppress distractor tails, improving Qwen3-30B-Instruct performance on LiveCodeBench by 12.9 percentage points.",
        },
        "general": {
            "zh": "发现LLM写代码时只需通过微调自己的输出就能显著进步，在LiveCodeBench上提升了超过10个百分点。这证明了即使没有外部导师或复杂算法，模型也能实现自我进化的闭环。",
            "en": "Improving code generation usually requires expensive human labels or complex reinforcement learning. This method proves that a model can improve simply by fine-tuning on its own outputs, specifically helping with harder coding problems.",
        },
        "lazy": {
            "zh": "AI也玩“左右互搏”，自己教自己写代码居然比以前更厉害了。",
            "en": "Models can get better at coding just by training on their own best guesses.",
        },
    },
    "2604.01195v1": {
        "expert": {
            "zh": "构建包含2万个高难度推理查询的ORBIT数据集，采用种子创建、QA生成及内外双重验证的四阶段节俭框架。通过GRPO训练的Qwen3-4B模型在搜索智能体任务上表现强劲，验证了合成数据的有效性。",
            "en": "ORBIT uses a modular four-stage framework—seed creation, QA generation, self-verification, and external search verification—to produce 20K reasoning-intensive queries without paid APIs. The resulting dataset was used to train a Qwen3-4B model via GRPO, achieving strong performance as a search agent.",
        },
        "general": {
            "zh": "解决搜索智能体训练数据昂贵且难以验证的问题，提供了一套无需依赖付费API的自动化数据生成方案。开源的数据集和代码为开发者构建高性能、可验证的搜索助手降低了门槛。",
            "en": "Building datasets for web-search agents is often too expensive or complex for small teams. This open-sourced framework allows for the low-cost creation of high-quality training data that requires multi-step reasoning and external verification.",
        },
        "lazy": {
            "zh": "没钱买API也能造出高质量推理数据，这个省钱秘籍让小模型也能变身搜索大神。",
            "en": "A frugal way to build high-quality reasoning data for search bots without burning cash.",
        },
    },
    "2604.01210v1": {
        "expert": {
            "zh": "提出CliffSearch框架，利用LLM智能体执行变异、交叉和评审等进化算子，实现理论与代码的协同演化。该系统引入了基于正确性和独创性的评审门控，确保发现的算法兼具可解释性与性能优化。",
            "en": "CliffSearch utilizes an agentic evolutionary framework where LLM agents implement operators like crossover and mutation to discover scientific algorithms. The system prioritizes structured artifacts (theory + code) and uses reviewer-gated selection to ensure correctness and originality alongside performance metrics.",
        },
        "general": {
            "zh": "将算法发现过程自动化，让AI像科学家一样不断提出、实验并修正理论模型与代码实现。这种方法不仅追求跑分，更强调方案的可复现性和科学原理的严谨性。",
            "en": "Current AI discovery tools often focus on generating code without proper scientific grounding. This framework ensures that discovered algorithms are both novel and theoretically sound by using a structured, agent-led evolutionary process.",
        },
        "lazy": {
            "zh": "这是一个让AI自己进化出更强算法的实验室，而且写出的方案人类还能看懂。",
            "en": "LLMs evolve new scientific algorithms by checking both the theory and the code.",
        },
    },
    "2604.01212v1": {
        "expert": {
            "zh": "推出模拟创业环境的YC-Bench，要求智能体在长达一年的周期内处理员工管理与合同决策等数百轮交互。实验发现Scratchpad的使用是成功的关键指标，而对抗性环境感知仍是当前模型的短板。",
            "en": "YC-Bench evaluates agents on a simulated one-year startup management task spanning hundreds of turns. Results from 12 models show that scratchpad usage is the best predictor of success, while adversarial client detection is the primary cause of failure.",
        },
        "general": {
            "zh": "专门测试AI在真实复杂场景下的长期规划能力，看它们能否在长达几百步的博弈中保持不破产。测试结果揭示了即使是顶尖模型在处理连环错误和资源分配时依然面临严峻挑战。",
            "en": "Measuring an AI's ability to plan over long periods is difficult. This benchmark tests agents in a complex startup simulation, revealing that most current models still struggle with compounding mistakes and long-term strategic coherence.",
        },
        "lazy": {
            "zh": "想看AI当CEO能不能活过一年？这个测试可能会让大多数模型直接“破产”。",
            "en": "A benchmark that forces AI to run a startup for a year to see if it goes bankrupt.",
        },
    },
    "2604.01220v1": {
        "expert": {
            "zh": "提出YOCO-U架构，将YOCO的解码器-解码器设计与参数共享的递归计算相结合。该架构通过在浅层层进行多次迭代，实现了恒定的全局KV缓存和线性预填充，同时显著增强了模型的表达深度。",
            "en": "YOCO-U integrates the decoder-decoder architecture of YOCO with recursive computation via a Universal Self-Decoder. This setup performs multiple parameter-shared iterations in shallow efficient-attention layers, maintaining a constant global KV cache and linear pre-filling.",
        },
        "general": {
            "zh": "解决了标准Transformer在扩展推理计算时KV缓存爆炸的痛点，通过架构优化实现了极高的推理效率。它能在不牺牲性能的前提下，让大模型在处理长上下文时更加轻快。",
            "en": "Standard Transformers face high memory and compute costs when scaling depth due to KV cache growth. This architecture allows for increased model depth and better reasoning through recursion while keeping inference efficient and memory usage constant.",
        },
        "lazy": {
            "zh": "把大模型变深的同时不让显存炸裂，YOCO-U让推理变得既深邃又省事。",
            "en": "Recursive computation makes deeper models smarter without eating up more memory.",
        },
    },
    "2604.01221v1": {
        "expert": {
            "zh": "针对个人电脑文件管理的HippoCamp基准，涵盖42.4GB跨模态文件和密集的轨迹标注。分析显示，多模态感知和证据锚定是当前MLLM在处理海量个人数据时的主要瓶颈。",
            "en": "HippoCamp is a multimodal file management benchmark featuring 42.4 GB of data across 2K files with 581 QA pairs. It includes 46.1K structured trajectories for failure diagnosis, revealing that multimodal perception and evidence grounding are the primary bottlenecks for personal AI assistants.",
        },
        "general": {
            "zh": "测试AI在你的私人电脑里找文件、分析照片和处理文档的能力，这是构建个人助理的必经之路。现状是即便是最强模型在理解个人侧写和长程搜索上也经常翻车。",
            "en": "AI agents often fail when dealing with a user's real, messy personal files across different formats. HippoCamp provides a realistic environment to test how well agents can search, reason, and manage files on a personal computer.",
        },
        "lazy": {
            "zh": "以后想让AI帮你翻电脑里的陈年旧账，这个榜单告诉你哪个智能体最靠谱。",
            "en": "A massive benchmark testing how well AI actually handles your personal files and photos.",
        },
    },
    "2604.07350v1": {
        "expert": {
            "zh": "提出弹性测试时训练（Elastic TTT），利用 Fisher 加权先验稳定权重更新。该技术在长序列 4D 重建任务中实现了高效的空时表征学习并缓解了遗忘问题。",
            "en": "Fast Spatial Memory (FSM) utilizes Elastic Test-Time Training with a Fisher-weighted elastic prior to stabilize model updates during long-sequence 4D reconstruction. This approach mitigates catastrophic forgetting and reduces the activation-memory bottleneck by allowing for robust multi-chunk adaptation.",
        },
        "general": {
            "zh": "在对视频进行长时长的 3D 建模时，AI 常会忘记之前的信息。新技术通过特殊的记忆机制，让 AI 能在更长的时间跨度内保持记忆的准确性。",
            "en": "This paper introduces a better way for AI to remember 3D scenes as it watches long videos. The new method prevents the AI from forgetting what it saw earlier, leading to much more accurate 3D models of moving objects.",
        },
        "lazy": {
            "zh": "采用弹性测试时训练技术提升 4D 重建的长序列稳定性。",
            "en": "It's a way for AI to build 3D models of moving scenes without forgetting previous details or running out of memory.",
        },
    },
    "2604.07209v1": {
        "expert": {
            "zh": "INSPATIO-WORLD 采用时空自回归（STAR）架构：隐式时空缓存聚合观测为潜表示，并用显式空间约束模块强化几何结构。它还提出联合分布匹配蒸馏（JDMD），用真实数据分布正则化生成过程以缓解由合成数据导致的保真度下降。",
            "en": "INSPATIO-WORLD uses a Spatiotemporal Autoregressive (STAR) architecture with an Implicit Spatiotemporal Cache and an Explicit Spatial Constraint Module for geometric structure. It introduces Joint Distribution Matching Distillation (JDMD) to regularize training with real-world distributions and mitigate fidelity degradation from synthetic data reliance.",
        },
        "general": {
            "zh": "这是一个可实时生成高保真、可交互动态场景的 4D 世界模拟器，并能从单段参考视频恢复场景。它显著提升空间一致性与交互精度，适合用于导航、规划与仿真。",
            "en": "This simulator can generate realistic, interactive 4D worlds from a single video clip in real time. It focuses on maintaining strong spatial consistency for smooth navigation and interaction.",
        },
        "lazy": {
            "zh": "从一段视频生成可互动的 4D 世界，并且还能实时跑起来。",
            "en": "A real-time 4D world simulator that generates interactive scenes from a single video.",
        },
    },
    "2604.07223v1": {
        "expert": {
            "zh": "引入 TraceSafe-Bench 评估多步工具调用轨迹的安全性。研究发现护栏效果受结构化数据处理能力影响远大于语义安全对齐，且通用模型优于专用护栏。",
            "en": "TraceSafe-Bench evaluates the efficacy of LLM guardrails across multi-step tool-calling trajectories using 12 risk categories. The study finds that performance is primarily dictated by structural reasoning competence, such as JSON parsing, rather than semantic safety alignment.",
        },
        "general": {
            "zh": "随着 AI 变得更自主，中间执行过程容易出现安全风险。这项研究发现 AI 处理复杂数据格式的能力是其防御风险的关键。",
            "en": "Researchers created a new testing tool to see if AI safety systems can catch errors while an agent performs complex, multi-step tasks. They discovered that an AI's ability to follow data formats is more important for safety than its general safety training.",
        },
        "lazy": {
            "zh": "研究 AI 代理在执行多步任务时的安全漏洞与防御。",
            "en": "This paper tests if AI safety guards can actually stop agents from making mistakes during long, complicated workflows.",
        },
    },
    "2604.07343v1": {
        "expert": {
            "zh": "提出 Personalized RewardBench 以评估奖励模型捕捉个体用户偏好的能力。研究指出当前主流模型在个性化对齐上表现不足，且该基准与下游任务表现高度相关。",
            "en": "Personalized RewardBench assesses reward models by using chosen and rejected response pairs based on individual user rubrics. The benchmark demonstrates a high correlation with downstream performance in PPO and Best-of-N sampling, revealing that current state-of-the-art models struggle with personalization.",
        },
        "general": {
            "zh": "每个人对 AI 回复的好坏评价不同。这个新工具测试 AI 能否根据特定用户的不同品味和标准给出合理的评分。",
            "en": "This paper introduces a new way to measure how well AI can learn a specific person's preferences rather than just general rules. It shows that most current AI models are not yet very good at following individual user styles or requirements.",
        },
        "lazy": {
            "zh": "评估 AI 奖励模型对用户个性化偏好的建模能力。",
            "en": "It's a benchmark that checks if AI can actually figure out what you personally like.",
        },
    },
    "2604.07274v1": {
        "expert": {
            "zh": "系统评估了医疗问答中 RAG 流程的设计，涵盖查询重构与重排序等组件。结果显示检索增强显著提升了零样本性能，且领域特定模型表现更佳。",
            "en": "This study systematically evaluates forty retrieval-augmented generation configurations for medical question answering using the MedQA USMLE benchmark. The results indicate that dense retrieval combined with query reformulation and reranking optimizes performance, especially when using domain-specialized language models.",
        },
        "general": {
            "zh": "研究如何通过让 AI 在回答医学问题前搜索参考书来减少错误。结果表明这种检索增强方法能让 AI 在普通电脑上也能给出更准确的医疗建议。",
            "en": "Scientists tested many different ways to connect AI to medical textbooks to help it answer health-related questions. They found that using specialized medical AI along with smart search techniques makes the system much more accurate.",
        },
        "lazy": {
            "zh": "系统评估检索增强技术对医疗问答系统的性能提升。",
            "en": "Giving AI a medical library and the right search tools makes it much better at passing medical exams.",
        },
    },
    "2604.07345v1": {
        "expert": {
            "zh": "提出一种将高分辨率 GPU 工作负载测量与全设施能耗模型相结合的方法。通过对 H100 GPU 训练与推理功率的精细化建模，为数据中心规划提供支撑。",
            "en": "The authors present high-resolution power consumption profiles for NVIDIA H100 GPUs during various generative AI workloads. These profiles are used in a bottom-up energy model to simulate whole-facility demand, aiding in infrastructure planning for data centers and microgrids.",
        },
        "general": {
            "zh": "AI 模型的训练和运行非常耗电。这项工作通过精确测量 AI 的用电模式，帮助数据中心更好地规划电力和能源基础设施。",
            "en": "This research provides detailed data on how much electricity AI chips use when training or running models. This information helps engineers plan the power needs and electrical grids for large data centers.",
        },
        "lazy": {
            "zh": "测量生成式 AI 的能效特征以辅助数据中心电力规划。",
            "en": "It measures exactly how much power AI chips use so data centers can plan their electricity needs.",
        },
    },
    "2604.07276v1": {
        "expert": {
            "zh": "在分子动力学软件 GROMACS 中集成了 DeePMD-kit，实现了跨多 GPU 的神经网络势能推理。研究验证了其在大规模原子系统下的扩展性并分析了性能瓶颈。",
            "en": "This work integrates the DeePMD-kit framework into GROMACS to support GPU-accelerated, domain-decomposed inference of deep potentials. Benchmarking on NVIDIA and AMD GPUs shows that while neural network inference is the primary bottleneck, the implementation maintains strong scaling for large-scale molecular dynamics.",
        },
        "general": {
            "zh": "科学家将 AI 模型引入了主流模拟软件，显著提高了模拟精度。这让利用大量显卡进行高水平的药物研发和材料模拟变得更加可行。",
            "en": "Researchers added AI capabilities to a popular chemistry simulation software called GROMACS to make molecular research more accurate. They proved that this new setup can run effectively on large supercomputers with many graphics cards.",
        },
        "lazy": {
            "zh": "在 GROMACS 中实现多显卡加速的 AI 分子动力学模拟。",
            "en": "They put AI into a standard chemistry simulator to make it more accurate and faster on powerful computers.",
        },
    },
    "2604.07279v1": {
        "expert": {
            "zh": "提出流式 3D 重建模型 Mem3R，通过混合存储解耦相机跟踪与几何映射。该设计利用测试时训练优化跟踪精度，在降低参数量的同时减少了轨迹误差。",
            "en": "Mem3R employs a hybrid memory design that decouples camera tracking from geometric mapping to improve temporal consistency in streaming 3D reconstruction. The model uses an implicit fast-weight memory for tracking and an explicit token-based state for mapping, resulting in reduced model size and lower trajectory error.",
        },
        "general": {
            "zh": "为机器人实时绘制地图开发的新技术。它能像人类一样一边观察一边记录环境，有效解决了长时间运行后的位置偏差问题。",
            "en": "This AI model helps robots and AR headsets map 3D environments more accurately by separating the task of tracking movement from the task of drawing the map. This design uses less memory and prevents the map from becoming distorted over time.",
        },
        "lazy": {
            "zh": "通过混合存储和测试时训练实现低漂移的流式 3D 重建。",
            "en": "A smarter 3D mapping AI that stays accurate and uses less memory during long recordings.",
        },
    },
    "2604.07348v1": {
        "expert": {
            "zh": "提出 MoRight 框架实现视频生成中的物体运动与视角解耦。模型通过学习运动因果性，能够预测物体受力后的连锁反应，支持前向预测与逆向动作恢复。",
            "en": "MoRight is a framework for motion-controlled video generation that disentangles camera viewpoints from object motion using temporal cross-view attention. It models motion causality by separating active driving actions from passive consequences, allowing for both forward and inverse physical reasoning.",
        },
        "general": {
            "zh": "用户现在可以分别控制视频里物体的动作和观察视角。AI 还能理解因果关系，比如它知道推一下物体会导致什么物理后果。",
            "en": "This tool lets users control the movement of objects in AI-generated videos independently from how the camera moves. It also ensures that when one object moves, other objects in the scene react in a way that looks physically realistic.",
        },
        "lazy": {
            "zh": "实现视频生成中物体运动与视角的解耦及因果逻辑控制。",
            "en": "It's an AI video generator that lets you control the camera and object movements separately while keeping the physics real.",
        },
    },
    "2604.07340v1": {
        "expert": {
            "zh": "提出 TC-AE 架构，通过两阶段 token 压缩策略解决高压缩比下的表征崩溃问题。结合联合自监督训练增强语义结构，提升了图像重建与生成的质量。",
            "en": "TC-AE improves ViT-based autoencoders by decomposing token-to-latent compression into two stages to prevent latent representation collapse. The architecture also utilizes joint self-supervised training to enhance the semantic structure of image tokens, improving both reconstruction and generation quality.",
        },
        "general": {
            "zh": "图片在深度压缩后往往会变得模糊。这项研究通过优化图片“零件”的处理方式，让压缩得很小的图片也能在还原时保持清晰。",
            "en": "Researchers found a new way to compress images for AI without losing the important details that make the pictures look real. Their method prevents the compressed data from becoming a mess, leading to much higher quality AI-generated images.",
        },
        "lazy": {
            "zh": "优化令牌容量设计以提升图像压缩与生成的质量。",
            "en": "This new image compressor makes AI-generated pictures look much better even at very small file sizes.",
        },
    },
    "2604.07321v1": {
        "expert": {
            "zh": "评估了 LLM 将自然语言翻译为线性时序逻辑（LTL）公式的效果，发现模型语法处理较好但语义理解较弱。研究指出通过代码补全重构任务可有效提升准确性。",
            "en": "This paper evaluates LLMs on translating natural language into Linear Temporal Logic (LTL) for system requirements. The study finds that while models handle LTL syntax well, they struggle with semantics, though performance is boosted when the task is reformulated as a code-completion problem.",
        },
        "general": {
            "zh": "软件安全规则通常需要写成复杂的数学公式，该研究测试了 AI 代写这些公式的能力。结果发现 AI 虽然能写对格式，但在理解深层含义上还有欠缺。",
            "en": "This study tested how well AI can translate plain English into a complex logical language used for software security. They found that while AI is good at following the basic rules of the language, it often misses the deeper meaning of the instructions.",
        },
        "lazy": {
            "zh": "评估大语言模型翻译线性时序逻辑公式的能力与挑战。",
            "en": "AI is decent at writing the formal rules for security but often gets the actual meaning of the rules wrong.",
        },
    },
    "2604.07236v1": {
        "expert": {
            "zh": "论文提出声明式反射运行协议，将智能体的状态、置信信号与受限动作外部化为可检查的运行时结构，并将能力拆解为显式世界模型规划、符号化反思与稀疏的 LLM 修订。基于带噪声的战舰游戏实验显示，显式规划对胜率贡献最大，而低频 LLM 修订仅带来边际且不单调的提升。",
            "en": "The paper introduces a declared reflective runtime protocol that externalizes agent state, confidence, and constrained actions into inspectable structures, decomposing competence into explicit world-model planning, symbolic reflection, and sparse LLM-based revision. In a noisy Battleship setting, explicit planning drives most of the win-rate gains, while low-frequency conditional LLM revision adds only marginal, non-monotonic improvements.",
        },
        "general": {
            "zh": "该研究在问：自我修订智能体到底需要多少“LLM 智能”，以及多少来自外围结构。结论倾向于：把规划与反思做成显式结构，往往比频繁调用 LLM 更能带来稳定收益。",
            "en": "This work asks how much of a self-revising agent’s performance comes from the LLM versus the surrounding structure. It suggests that explicit planning/structure can matter more than frequent LLM intervention.",
        },
        "lazy": {
            "zh": "很多时候，智能体更需要“好结构”，而不是“多说两句”。",
            "en": "Agents may benefit more from structured planning than from frequent LLM revisions.",
        },
    },
    "2604.07190v1": {
        "expert": {
            "zh": "ATOM Report 从下载量、派生模型与推理市场等维度系统测量约 1500 个开源语言模型生态。报告记录了 2025 年夏季后开源模型采用格局的显著变化，并对主流系列（如 Qwen、DeepSeek、Llama）给出数据化对比。",
            "en": "The ATOM Report measures roughly 1,500 open language models via metrics like Hugging Face downloads, derivatives, and inference market share. It documents a major ecosystem shift after mid-2025 and provides data-driven comparisons across leading model families such as Qwen, DeepSeek, and Llama.",
        },
        "general": {
            "zh": "这是一份开源大模型生态“体检报告”，告诉你谁在被用、谁在被二次开发、谁在推理市场占主导。它适合用来快速把握开源 LLM 竞争格局与趋势。",
            "en": "This report is a snapshot of the open LLM ecosystem—who gets adopted, forked, and deployed. It’s useful for quickly understanding competitive dynamics and trends.",
        },
        "lazy": {
            "zh": "开源大模型世界的“年度盘点”。",
            "en": "A data-driven snapshot of the open LLM ecosystem and how it’s shifting.",
        },
    },
    "2604.07230v1": {
        "expert": {
            "zh": "PhyEdit 将显式 3D 几何/物理模拟作为可插拔的视觉引导，提升图像编辑中物体操控的空间一致性与尺度/透视正确性。作者还发布 RealManip-10K（含深度标注）与 ManipEval，用于评估 3D 几何精度、操作一致性等维度。",
            "en": "PhyEdit uses explicit 3D geometric/physical simulation as a plug-and-play visual guide to improve spatial manipulation accuracy in image editing. The authors release RealManip-10K (with depth annotations) and the ManipEval benchmark to evaluate 3D geometry accuracy and manipulation consistency.",
        },
        "general": {
            "zh": "它解决“把东西挪一下就穿模/比例不对”的老问题，用 3D 几何作为约束让编辑结果更真实。配套数据集与评测让不同方法能在几何一致性上被更公平地比较。",
            "en": "It makes edits more physically and geometrically consistent by using 3D cues, so moved objects look properly scaled and placed. The accompanying dataset/benchmark helps compare methods on spatial correctness.",
        },
        "lazy": {
            "zh": "让 P 图更像真的：用 3D 几何约束把物体放对位置和尺度。",
            "en": "Photo editing that uses 3D geometry so moved objects look correctly placed and scaled.",
        },
    },
    "2604.07201v1": {
        "expert": {
            "zh": "BRIDGE 通过强化学习训练的查询对齐模型 FORGE，将含噪的多模态查询蒸馏为更利于检索的紧凑字符串，并结合推理增强稠密检索器 LENS。结果表明，多模态到文本检索的主要瓶颈在“查询对齐/可检索表达”，该系统能显著提升 embedding 相似度驱动的召回表现。",
            "en": "BRIDGE improves multimodal-to-text retrieval with FORGE (an RL-trained query alignment model that distills noisy multimodal queries into compact search strings) and LENS (a reasoning-enhanced dense retriever). The results suggest query alignment is a primary bottleneck, improving embedding-based similarity and retrieval performance.",
        },
        "general": {
            "zh": "这是一个更会“把你的图+字意图翻译成搜索词”的检索系统，提升跨模态搜索体验。它强调把查询表达对齐到可检索的文本形式，比单纯换更大编码器更有效。",
            "en": "This system makes multimodal search better by rewriting image+text queries into cleaner, more retrievable text queries. It argues alignment and query formulation matter as much as (or more than) bigger encoders.",
        },
        "lazy": {
            "zh": "把复杂的图文查询变成更好搜的关键词，让检索更准。",
            "en": "Turns messy image+text queries into better search text to retrieve more accurately.",
        },
    },
    "2604.07238v1": {
        "expert": {
            "zh": "该研究分析差分隐私（DP）在语言识别与生成中的统计代价，给出算法与匹配下界。在近似 DP 设定下可保持接近非隐私的错误率，而在纯 DP 下误差会按 ε 相关因子呈指数性恶化，给出最优速率刻画。",
            "en": "This work characterizes the agnostic statistical cost of differential privacy (DP) for language identification and generation, providing matching algorithms and lower bounds. It shows approximate DP can retain non-private error rates, while pure DP incurs exponential degradation by an epsilon-dependent factor, yielding optimal rates.",
        },
        "general": {
            "zh": "论文量化了“更隐私”会让语言模型/语言识别损失多少准确率。结论是：在很多近似 DP 的现实设定里，隐私代价可能比直觉更小。",
            "en": "The paper studies how much accuracy you lose when enforcing differential privacy in language tasks. It suggests the privacy cost can be surprisingly small in approximate-DP regimes.",
        },
        "lazy": {
            "zh": "隐私保护不一定“贵”：在一些设定下性能损失很小。",
            "en": "Privacy can be cheap: some DP setups lose little performance.",
        },
    },
    "2604.07165v1": {
        "expert": {
            "zh": "T-STAR（Tree-structured Self-Taught Agent Rectification）将多轮轨迹合并为“认知树”，用内省估值降低逐步优势估计的方差，并通过 In-Context Thought Grafting 在关键分歧点对比成功/失败分支以合成修正性推理。该框架旨在缓解多步任务的稀疏奖励与长链错误传播问题，提升智能体策略优化稳定性。",
            "en": "T-STAR (Tree-structured Self-Taught Agent Rectification) merges multi-turn trajectories into a Cognitive Tree, enabling variance-reduced step-level advantages via Introspective Valuation. It uses In-Context Thought Grafting to synthesize corrective reasoning at critical divergence points by contrasting successful and failed branches, improving policy optimization under sparse rewards.",
        },
        "general": {
            "zh": "它把智能体的决策过程组织成一棵“可能性树”，更容易定位哪一步推理出了问题并进行纠错。这样能让多步任务训练更稳定、更会从失败里学。",
            "en": "It organizes an agent’s multi-step reasoning into a tree so it can pinpoint where chains go wrong and learn corrections. This can make training on long-horizon tasks more stable under sparse feedback.",
        },
        "lazy": {
            "zh": "用“树”来帮智能体找错并改正，长链推理更不容易翻车。",
            "en": "A tree-based way for agents to find and fix mistakes in long reasoning chains.",
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
                # Prefer the curated (display-safe) title from top_10.json.
                "title": curated_paper.get("title") or source_paper["title"],
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
