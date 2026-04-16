import argparse
import json
import os
from datetime import datetime

SUMMARIES = {
    "2604.07223v1": {
        "expert": {
            "zh": "提出TraceSafe-Bench，用于评估LLM智能体在多步工具调用轨迹中的护栏有效性，将风险面从最终回答扩展到中间执行痕迹。基准覆盖多类工具与攻击路径，并分析哪些能力真正决定护栏能否在“过程”里及时拦截风险。",
            "en": "TraceSafe-Bench evaluates safety guardrails for LLM agents over multi-step tool-use trajectories, shifting the focus from final text to intermediate execution traces. It probes guardrail behavior across varied tools and attack patterns and analyzes which capabilities actually drive effective trace-level risk detection.",
        },
        "general": {
            "zh": "这篇论文系统测了“工具调用过程”里的安全护栏，而不仅是最后的输出文本。结论强调：要让智能体更安全，必须把轨迹级风险检测与拦截纳入评测与训练闭环。",
            "en": "This paper benchmarks guardrails on the agent’s tool-calling process, not just the final answer. It argues that trajectory-level detection and intervention are essential for deploying safer tool-using agents.",
        },
        "lazy": {
            "zh": "别只盯着最终回答，工具调用的中间步骤才是新的风险高地。",
            "en": "The dangerous part is often the tool-use trace, not the final text.",
        },
    },
    "2604.07343v1": {
        "expert": {
            "zh": "提出Personalized RewardBench，用于评估奖励模型是否能在“同样合理但偏好不同”的情形下对齐到个体用户的评价准则。基准通过个性化rubric与成对偏好样本衡量个体一致性，并与下游对齐/采样策略的效果关联。",
            "en": "Personalized RewardBench evaluates whether reward models capture individual user preferences when multiple responses are plausible but taste differs. It uses personalized rubrics and paired comparisons to measure preference fidelity and studies how personalization relates to downstream alignment and sampling behavior.",
        },
        "general": {
            "zh": "不是“整体更好”的回答才重要，而是“你更喜欢”的回答。该基准让我们能量化奖励模型的个性化能力，并暴露现有模型在多元价值对齐上的短板。",
            "en": "It’s not just about a universally ‘better’ response—it’s about what a specific user prefers. This benchmark makes personalization measurable and highlights gaps in pluralistic alignment for today’s reward models.",
        },
        "lazy": {
            "zh": "奖励模型还不太会学每个人的偏好。",
            "en": "Reward models still struggle to learn personal taste.",
        },
    },
    "2604.07190v1": {
        "expert": {
            "zh": "ATOM报告对主流开源语言模型生态做了系统盘点，聚焦约1.5K条主线模型及其构建者与采用度信号。报告通过下载、衍生与生态使用等指标给出“谁在被用、谁在引领”的快照，并指出2025年夏季后中国模型在采用度上的显著上升趋势。",
            "en": "The ATOM Report provides an adoption snapshot of the open language model ecosystem, focusing on ~1.5K mainline models and who builds them. Using signals like downloads and ecosystem activity, it characterizes which model families lead adoption and documents a notable rise in Chinese model adoption starting in mid-2025.",
        },
        "general": {
            "zh": "这是一个面向研究与政策的开源大模型生态“统计年鉴”。它把分散的生态信号汇总成可讨论的指标与趋势。",
            "en": "It’s a data-driven ‘state of the ecosystem’ report for open LMs, aimed at researchers, builders, and policy audiences. It consolidates scattered signals into a clearer view of trends and adoption.",
        },
        "lazy": {
            "zh": "开源大模型生态到底谁在领跑？这份报告给出数据快照。",
            "en": "A data snapshot of who’s leading open LMs.",
        },
    },
    "2604.06811v1": {
        "expert": {
            "zh": "提出SkillTrojan，针对“技能可复用+可组合”的智能体系统，直接在技能实现中植入后门逻辑，而非篡改模型参数或训练数据。攻击通过看似正常的技能组合在特定触发条件下重组并执行恶意行为，凸显模块化技能库的安全审计难题。",
            "en": "SkillTrojan targets skill-based agent systems by implanting backdoors in skill implementations rather than model weights or training data. It leverages standard skill composition to reconstruct and execute malicious behavior only under specific triggers, highlighting a hard-to-audit attack surface in modular agent toolchains.",
        },
        "general": {
            "zh": "模块化技能让智能体更强，也让攻击更隐蔽：恶意逻辑可以躲在“正常工具”里。论文提醒我们，技能仓库需要像依赖供应链一样做安全治理。",
            "en": "Modular skills make agents more capable, but also create a supply-chain-like security risk: malicious logic can hide inside ‘normal’ tools. The work argues for stronger auditing and governance of skill repositories.",
        },
        "lazy": {
            "zh": "给智能体的技能包投毒，比改模型更隐蔽。",
            "en": "Poisoning an agent’s skills can be stealthier than attacking the model.",
        },
    },
    "2604.06846v1": {
        "expert": {
            "zh": "提出MedDialBench，用参数化、可控强度的方式模拟多维“非合作病人”行为，以评估LLM在交互式诊断对话中的鲁棒性。基准不仅提供剂量-反应式的难度控制，还分析不同维度行为之间的交互影响，帮助定位诊断失败模式。",
            "en": "MedDialBench benchmarks LLM diagnostic robustness in interactive medical dialogues by simulating multi-dimensional non-cooperative patient behaviors with controllable severity. It enables dose-response evaluation and studies cross-dimension interactions, helping characterize failure modes in dialogue-based diagnosis.",
        },
        "general": {
            "zh": "医疗对话里，病人可能含糊、遗漏甚至误导；这个基准把这些情况系统化并可调强度地测出来。它能帮助我们判断诊断智能体在真实交互中到底有多稳。",
            "en": "Real patients can be vague, omit details, or mislead—this benchmark makes those behaviors controllable and measurable. It helps evaluate how robust diagnostic agents are under realistic interactive conditions.",
        },
        "lazy": {
            "zh": "病人“不配合”时，AI医生还能稳吗？",
            "en": "How robust is medical AI when patients aren’t cooperative?",
        },
    },
    "2604.06814v1": {
        "expert": {
            "zh": "提出OmniTabBench，收集并统一评测大规模表格数据任务，用于系统比较GBDT、深度网络与基础模型在不同数据属性下的表现。论文强调以元特征分析解释“何时谁更强”，并指出表格学习不存在单一万能范式。",
            "en": "OmniTabBench is a large-scale tabular benchmark that systematically compares GBDTs, neural networks, and foundation-model approaches across diverse datasets. It pairs evaluation with metafeature analysis to explain when each paradigm excels, underscoring that no single family dominates tabular learning.",
        },
        "general": {
            "zh": "这是一份“表格数据到底该用什么模型”的大规模实证答案。它把不同模型的优势与数据特征关联起来，帮助工程落地选型。",
            "en": "It’s a large empirical answer to ‘what should I use for tabular data?’. By linking performance to dataset characteristics, it offers practical guidance for model selection.",
        },
        "lazy": {
            "zh": "表格数据没有万能模型，得看数据长什么样。",
            "en": "There’s no one best model for tabular data.",
        },
    },
    "2604.07238v1": {
        "expert": {
            "zh": "研究差分隐私在语言识别与生成任务中的“隐私代价”，在不可知统计设置下给出算法与匹配下界，精确刻画误差随隐私强度变化的规律。结果对比了近似DP与纯DP下的可达性能，为“隐私-效用”权衡提供理论基准。",
            "en": "This work quantifies the price of differential privacy for language identification and generation in the agnostic statistical setting, providing algorithms with matching lower bounds. It contrasts achievable performance under approximate vs pure DP, yielding sharp theory for privacy–utility tradeoffs in language learning.",
        },
        "general": {
            "zh": "想用敏感数据训练语言系统，就必须知道隐私保护会损失多少效果。该论文用理论结果把这条曲线算清楚，便于工程与合规决策。",
            "en": "If language systems are trained on sensitive data, we need to know the exact performance cost of privacy. This paper provides the theoretical curve to inform engineering and policy tradeoffs.",
        },
        "lazy": {
            "zh": "隐私保护到底要付出多少性能？这篇给了“算出来的答案”。",
            "en": "A theoretical answer to how much privacy costs in language learning.",
        },
    },
    "2604.07036v1": {
        "expert": {
            "zh": "提出ReDAct，通过“不确定性驱动的分流”让智能体优先用小模型决策，仅在高不确定时再委托给更大、更可靠但更昂贵的模型。该框架面向序列决策场景，目标是在控制推理成本的同时降低幻觉导致的不可逆轨迹崩坏风险。",
            "en": "ReDAct proposes uncertainty-aware deferral for LLM agents: a cheaper model handles decisions by default and defers to a stronger, more expensive model when uncertainty is high. Designed for sequential decision-making, it aims to reduce trajectory-ruining hallucinations while controlling inference cost.",
        },
        "general": {
            "zh": "把“大模型当专家会诊”而不是全程开着：便宜模型先做，拿不准再升级。它给智能体系统提供了成本与可靠性的工程折中。",
            "en": "Use the big model like an on-call expert: run a cheap model most of the time and escalate only when needed. It’s a pragmatic reliability–cost tradeoff for agentic systems.",
        },
        "lazy": {
            "zh": "不确定就升级到更强模型，既省钱又更稳。",
            "en": "Escalate to a stronger model only when unsure.",
        },
    },
    "2604.07172v1": {
        "expert": {
            "zh": "针对问答场景的语义不确定性量化，系统区分“区分度”和“校准度”，并指出现有方法常忽略后者导致不可靠。论文提出Token级温度缩放来优化校准，在多种置信度度量上改进语义校准表现。",
            "en": "For semantic uncertainty in LM question answering, the paper separates discrimination from calibration and shows that focusing on discrimination alone yields unreliable uncertainty estimates. It proposes token-level temperature scaling to improve calibration, boosting semantic uncertainty quality across multiple confidence measures.",
        },
        "general": {
            "zh": "让模型更会判断自己是不是在瞎编：不仅要能区分对错，还要让置信度“说到做到”。该方法用很轻量的温度缩放就能明显改善校准。",
            "en": "To make models better at knowing when they might be wrong, confidence should be calibrated, not just discriminative. A lightweight temperature-scaling approach improves how well uncertainty matches reality.",
        },
        "lazy": {
            "zh": "让AI的“自信值”更可信。",
            "en": "Make the model’s confidence more trustworthy.",
        },
    },
    "2604.07345v1": {
        "expert": {
            "zh": "给出一套将GPU级高时间分辨率功耗测量映射到数据中心全设施能耗需求的方法，用于生成式AI训练/推理工作负载的基础设施规划。研究强调非专有、可复现的功耗剖面与自底向上建模对于电力接入与峰值管理的价值。",
            "en": "This work measures high-resolution power profiles for generative AI workloads and links them to whole-facility data center energy demand for infrastructure planning. By providing non-proprietary, reproducible profiling and bottom-up modeling, it helps reason about grid connections, peak management, and facility sizing for AI workloads.",
        },
        "general": {
            "zh": "大模型到底“怎么花电”对电力与机房规划很关键，但公开数据一直稀缺。论文用更细粒度的功耗测量与建模把这件事做成可用的工程输入。",
            "en": "Planning AI data centers needs realistic power traces, but public data is scarce. This paper provides a methodology for measuring and modeling AI power usage at a level useful for infrastructure decisions.",
        },
        "lazy": {
            "zh": "把大模型耗电曲线测清楚，数据中心才好规划。",
            "en": "Measure AI power spikes so data centers can plan.",
        },
    },
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
            "zh": "该论文提出弹性测试时训练（Elastic Test-Time Training），通过 Fisher 加权的弹性先验来稳定快速权重更新。基于该机制的 Fast Spatial Memory 能从长观测序列中学习时空表示，并在新视角下进行时间组合渲染。",
            "en": "This paper introduces Elastic Test-Time Training, which stabilizes fast weight updates using a Fisher-weighted elastic prior centered on an evolving anchor state. The anchor state (an EMA of prior fast weights) enables robust multi-chunk adaptation for 4D reconstruction while reducing forgetting and activation-memory bottlenecks.",
        },
        "general": {
            "zh": "该研究面向长序列 3D/4D 重建中的测试时训练不稳定问题，引入“锚点状态”来抑制遗忘和过拟合。结果是在长上下文上实现更快适应与更稳定的重建质量。",
            "en": "The work improves how models reconstruct 3D/4D environments from long sequences by making test-time training more stable. It helps the model adapt quickly without forgetting what it learned earlier.",
        },
        "lazy": {
            "zh": "用更稳定的测试时训练，让模型在长视频里更会“记路”和重建世界。",
            "en": "A more stable test-time training method to help AI remember and reconstruct 3D/4D worlds from long videos.",
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
            "zh": "TraceSafe-Bench 在多步工具调用轨迹上覆盖 12 类风险，系统评估护栏在“过程”中的检测与拦截能力。结果显示护栏效果更依赖结构化数据理解/轨迹解析能力，而非纯粹的语义安全对齐；且随着轨迹变长，风险行为更可见时，检测表现反而提升。",
            "en": "TraceSafe-Bench evaluates safety across 12 risk categories on multi-step tool-calling trajectories, showing guardrail efficacy is driven more by structural data competence than semantic safety alignment. General-purpose LLMs can outperform specialized guardrails on risk detection, and performance can improve as longer trajectories reveal more dynamic behavior.",
        },
        "general": {
            "zh": "该论文提出面向智能体多步工具调用的安全评测基准，专门测“执行过程”而不是单轮文本。结论强调：要让智能体更安全，结构推理与对轨迹的理解能力可能比单纯扩大模型更关键。",
            "en": "This paper introduces a benchmark to test AI safety when agents call tools over multiple steps. It suggests that understanding structured traces matters a lot for guardrails, sometimes more than model size.",
        },
        "lazy": {
            "zh": "专门测智能体“多步用工具”的护栏到底靠不靠谱。",
            "en": "A benchmark for how well guardrails work during multi-step tool-using agent runs.",
        },
    },
    "2604.07343v1": {
        "expert": {
            "zh": "Personalized RewardBench 通过用户特定准则构造响应对，用于评估奖励模型捕捉“个人偏好”的能力。实验表明该基准与 Best-of-N 采样、PPO 微调等下游表现的相关性更强，同时揭示现有 SOTA 奖励模型在个性化上仍明显不足。",
            "en": "Personalized RewardBench evaluates reward models on user-specific rubrics via preference response pairs, measuring personalization rather than generic quality. It correlates better with downstream behavior (e.g., Best-of-N sampling, PPO) and shows current SOTA reward models still struggle to model individualized preferences.",
        },
        "general": {
            "zh": "这个基准专门评估奖励模型能否学到“你喜欢什么”，而不仅是平均意义上的好回答。结果显示很多强模型在个性化上并不稳，离真正的“为你定制”还有距离。",
            "en": "This benchmark tests whether reward models can follow an individual’s preferences instead of just general quality. It finds that even strong models still have gaps in true personalization.",
        },
        "lazy": {
            "zh": "不是评“好不好”，而是评“是不是你想要的”。",
            "en": "A benchmark for whether reward models match individual user preferences.",
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
