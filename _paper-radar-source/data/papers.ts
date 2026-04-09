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
        "recommendationScore": 5.0,
        "summaries": {
            "expert": {
                "zh": "Large Chunk Test-Time Training (LaCT) has shown strong performance on long-context 3D reconstruction, but its fully plastic inference-time updates remain vulnerable to catastrophic forgetting and overfitting. As a result, LaCT is typically instantiated with a single large chunk spanning the full input sequence, falling short of the broader goal of handling arbitrarily long sequences in a single pass. We propose Elastic Test-Time Training inspired by elastic weight consolidation, that stabilizes LaCT fast-weight updates with a Fisher-weighted elastic prior around a maintained anchor state. The anchor evolves as an exponential moving average of past fast weights to balance stability and plasticity. Based on this updated architecture, we introduce Fast Spatial Memory (FSM), an efficient and scalable model for 4D reconstruction that learns spatiotemporal representations from long observation sequences and renders novel view-time combinations. We pre-trained FSM on large-scale curated 3D/4D data to capture the dynamics and semantics of complex spatial environments. Extensive experiments show that FSM supports fast adaptation over long sequences and delivers high-quality 3D/4D reconstruction with smaller chunks and mitigating the camera-interpolation shortcut. Overall, we hope to advance LaCT beyond the bounded single-chunk setting toward robust multi-chunk adaptation, a necessary step for generalization to genuinely longer sequences, while substantially alleviating the activation-memory bottleneck.",
                "en": "Large Chunk Test-Time Training (LaCT) has shown strong performance on long-context 3D reconstruction, but its fully plastic inference-time updates remain vulnerable to catastrophic forgetting and overfitting. As a result, LaCT is typically instantiated with a single large chunk spanning the full input sequence, falling short of the broader goal of handling arbitrarily long sequences in a single pass. We propose Elastic Test-Time Training inspired by elastic weight consolidation, that stabilizes LaCT fast-weight updates with a Fisher-weighted elastic prior around a maintained anchor state. The anchor evolves as an exponential moving average of past fast weights to balance stability and plasticity. Based on this updated architecture, we introduce Fast Spatial Memory (FSM), an efficient and scalable model for 4D reconstruction that learns spatiotemporal representations from long observation sequences and renders novel view-time combinations. We pre-trained FSM on large-scale curated 3D/4D data to capture the dynamics and semantics of complex spatial environments. Extensive experiments show that FSM supports fast adaptation over long sequences and delivers high-quality 3D/4D reconstruction with smaller chunks and mitigating the camera-interpolation shortcut. Overall, we hope to advance LaCT beyond the bounded single-chunk setting toward robust multi-chunk adaptation, a necessary step for generalization to genuinely longer sequences, while substantially alleviating the activation-memory bottleneck."
            },
            "general": {
                "zh": "通用版摘要稍后补充。",
                "en": "General summary coming soon."
            },
            "lazy": {
                "zh": "懒人版摘要稍后补充。",
                "en": "Lazy summary coming soon."
            }
        }
    },
    {
        "id": "2604.07348v1",
        "title": "MoRight: Motion Control Done Right",
        "authors": "Shaowei Liu, Xuanchi Ren, Tianchang Shen, Huan Ling, Saurabh Gupta, Shenlong Wang, Sanja Fidler, Jun Gao",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07348v1",
        "recommendationScore": 5.0,
        "summaries": {
            "expert": {
                "zh": "Generating motion-controlled videos--where user-specified actions drive physically plausible scene dynamics under freely chosen viewpoints--demands two capabilities: (1) disentangled motion control, allowing users to separately control the object motion and adjust camera viewpoint; and (2) motion causality, ensuring that user-driven actions trigger coherent reactions from other objects rather than merely displacing pixels. Existing methods fall short on both fronts: they entangle camera and object motion into a single tracking signal and treat motion as kinematic displacement without modeling causal relationships between object motion. We introduce MoRight, a unified framework that addresses both limitations through disentangled motion modeling. Object motion is specified in a canonical static-view and transferred to an arbitrary target camera viewpoint via temporal cross-view attention, enabling disentangled camera and object control. We further decompose motion into active (user-driven) and passive (consequence) components, training the model to learn motion causality from data. At inference, users can either supply active motion and MoRight predicts consequences (forward reasoning), or specify desired passive outcomes and MoRight recovers plausible driving actions (inverse reasoning), all while freely adjusting the camera viewpoint. Experiments on three benchmarks demonstrate state-of-the-art performance in generation quality, motion controllability, and interaction awareness.",
                "en": "Generating motion-controlled videos--where user-specified actions drive physically plausible scene dynamics under freely chosen viewpoints--demands two capabilities: (1) disentangled motion control, allowing users to separately control the object motion and adjust camera viewpoint; and (2) motion causality, ensuring that user-driven actions trigger coherent reactions from other objects rather than merely displacing pixels. Existing methods fall short on both fronts: they entangle camera and object motion into a single tracking signal and treat motion as kinematic displacement without modeling causal relationships between object motion. We introduce MoRight, a unified framework that addresses both limitations through disentangled motion modeling. Object motion is specified in a canonical static-view and transferred to an arbitrary target camera viewpoint via temporal cross-view attention, enabling disentangled camera and object control. We further decompose motion into active (user-driven) and passive (consequence) components, training the model to learn motion causality from data. At inference, users can either supply active motion and MoRight predicts consequences (forward reasoning), or specify desired passive outcomes and MoRight recovers plausible driving actions (inverse reasoning), all while freely adjusting the camera viewpoint. Experiments on three benchmarks demonstrate state-of-the-art performance in generation quality, motion controllability, and interaction awareness."
            },
            "general": {
                "zh": "通用版摘要稍后补充。",
                "en": "General summary coming soon."
            },
            "lazy": {
                "zh": "懒人版摘要稍后补充。",
                "en": "Lazy summary coming soon."
            }
        }
    },
    {
        "id": "2604.07345v1",
        "title": "Measurement of Generative AI Workload Power Profiles for Whole-Facility Data Center Infrastructure Planning",
        "authors": "Roberto Vercellino, Jared Willard, Gustavo Campos, Weslley da Silva Pereira, Olivia Hull, Matthew Selensky, Juliane Mueller",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07345v1",
        "recommendationScore": 5.0,
        "summaries": {
            "expert": {
                "zh": "The rapid growth of generative artificial intelligence (AI) has introduced unprecedented computational demands, driving significant increases in the energy footprint of data centers. However, existing power consumption data is largely proprietary and reported at varying resolutions, creating challenges for estimating whole-facility energy use and planning infrastructure. In this work, we present a methodology that bridges this gap by linking high-resolution workload power measurements to whole-facility energy demand. Using NLR's high-performance computing data center equipped with NVIDIA H100 GPUs, we measure power consumption of AI workloads at 0.1-second resolution for AI training, fine-tuning and inference jobs. Workloads are characterized using MLCommons benchmarks for model training and fine-tuning, and vLLM benchmarks for inference, enabling reproducible and standardized workload profiling. The dataset of power consumption profiles is made publicly available. These power profiles are then scaled to the whole-facility-level using a bottom-up, event-driven, data center energy model. The resulting whole-facility energy profiles capture realistic temporal fluctuations driven by AI workloads and user-behavior, and can be used to inform infrastructure planning for grid connection, on-site energy generation, and distributed microgrids.",
                "en": "The rapid growth of generative artificial intelligence (AI) has introduced unprecedented computational demands, driving significant increases in the energy footprint of data centers. However, existing power consumption data is largely proprietary and reported at varying resolutions, creating challenges for estimating whole-facility energy use and planning infrastructure. In this work, we present a methodology that bridges this gap by linking high-resolution workload power measurements to whole-facility energy demand. Using NLR's high-performance computing data center equipped with NVIDIA H100 GPUs, we measure power consumption of AI workloads at 0.1-second resolution for AI training, fine-tuning and inference jobs. Workloads are characterized using MLCommons benchmarks for model training and fine-tuning, and vLLM benchmarks for inference, enabling reproducible and standardized workload profiling. The dataset of power consumption profiles is made publicly available. These power profiles are then scaled to the whole-facility-level using a bottom-up, event-driven, data center energy model. The resulting whole-facility energy profiles capture realistic temporal fluctuations driven by AI workloads and user-behavior, and can be used to inform infrastructure planning for grid connection, on-site energy generation, and distributed microgrids."
            },
            "general": {
                "zh": "通用版摘要稍后补充。",
                "en": "General summary coming soon."
            },
            "lazy": {
                "zh": "懒人版摘要稍后补充。",
                "en": "Lazy summary coming soon."
            }
        }
    },
    {
        "id": "2604.07343v1",
        "title": "Personalized RewardBench: Evaluating Reward Models with Human Aligned Personalization",
        "authors": "Qiyao Ma, Dechen Gao, Rui Cai, Boqi Zhao, Hanchu Zhou, Junshan Zhang, Zhe Zhao",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07343v1",
        "recommendationScore": 5.0,
        "summaries": {
            "expert": {
                "zh": "Pluralistic alignment has emerged as a critical frontier in the development of Large Language Models (LLMs), with reward models (RMs) serving as a central mechanism for capturing diverse human values. While benchmarks for general response quality are prevalent, evaluating how well reward models account for individual user preferences remains an open challenge. To bridge this gap, we introduce Personalized RewardBench, a novel benchmark designed to rigorously assess reward models' capacity to model personalized preferences. We construct chosen and rejected response pairs based on strict adherence to (or violation of) user-specific rubrics, ensuring that preference distinctions are uniquely tailored to the individual. In particular, human evaluations confirm that the primary discriminative factor between pairs is strictly personal preference, with both responses maintaining high general quality (e.g., correctness, relevance and helpfulness). Extensive testing reveals that existing state-of-the-art reward models struggle significantly with personalization, peaking at an accuracy of just 75.94%. Crucially, because an effective reward model benchmark should predict a reward model's performance on downstream tasks, we conduct experiments demonstrating that our benchmark exhibits a significantly higher correlation with downstream performance in both Best-of-N (BoN) sampling and Proximal Policy Optimization (PPO) compared to existing baselines. These findings establish Personalized RewardBench as a robust and accurate proxy for evaluating reward models' performance in downstream applications.",
                "en": "Pluralistic alignment has emerged as a critical frontier in the development of Large Language Models (LLMs), with reward models (RMs) serving as a central mechanism for capturing diverse human values. While benchmarks for general response quality are prevalent, evaluating how well reward models account for individual user preferences remains an open challenge. To bridge this gap, we introduce Personalized RewardBench, a novel benchmark designed to rigorously assess reward models' capacity to model personalized preferences. We construct chosen and rejected response pairs based on strict adherence to (or violation of) user-specific rubrics, ensuring that preference distinctions are uniquely tailored to the individual. In particular, human evaluations confirm that the primary discriminative factor between pairs is strictly personal preference, with both responses maintaining high general quality (e.g., correctness, relevance and helpfulness). Extensive testing reveals that existing state-of-the-art reward models struggle significantly with personalization, peaking at an accuracy of just 75.94%. Crucially, because an effective reward model benchmark should predict a reward model's performance on downstream tasks, we conduct experiments demonstrating that our benchmark exhibits a significantly higher correlation with downstream performance in both Best-of-N (BoN) sampling and Proximal Policy Optimization (PPO) compared to existing baselines. These findings establish Personalized RewardBench as a robust and accurate proxy for evaluating reward models' performance in downstream applications."
            },
            "general": {
                "zh": "通用版摘要稍后补充。",
                "en": "General summary coming soon."
            },
            "lazy": {
                "zh": "懒人版摘要稍后补充。",
                "en": "Lazy summary coming soon."
            }
        }
    },
    {
        "id": "2604.07340v1",
        "title": "TC-AE: Unlocking Token Capacity for Deep Compression Autoencoders",
        "authors": "Teng Li, Ziyuan Huang, Cong Chen, Yangfu Li, Yuanhuiyi Lyu, Dandan Zheng, Chunhua Shen, Jun Zhang",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07340v1",
        "recommendationScore": 5.0,
        "summaries": {
            "expert": {
                "zh": "We propose TC-AE, a ViT-based architecture for deep compression autoencoders. Existing methods commonly increase the channel number of latent representations to maintain reconstruction quality under high compression ratios. However, this strategy often leads to latent representation collapse, which degrades generative performance. Instead of relying on increasingly complex architectures or multi-stage training schemes, TC-AE addresses this challenge from the perspective of the token space, the key bridge between pixels and image latents, through two complementary innovations: Firstly, we study token number scaling by adjusting the patch size in ViT under a fixed latent budget, and identify aggressive token-to-latent compression as the key factor that limits effective scaling. To address this issue, we decompose token-to-latent compression into two stages, reducing structural information loss and enabling effective token number scaling for generation. Secondly, to further mitigate latent representation collapse, we enhance the semantic structure of image tokens via joint self-supervised training, leading to more generative-friendly latents. With these designs, TC-AE achieves substantially improved reconstruction and generative performance under deep compression. We hope our research will advance ViT-based tokenizer for visual generation.",
                "en": "We propose TC-AE, a ViT-based architecture for deep compression autoencoders. Existing methods commonly increase the channel number of latent representations to maintain reconstruction quality under high compression ratios. However, this strategy often leads to latent representation collapse, which degrades generative performance. Instead of relying on increasingly complex architectures or multi-stage training schemes, TC-AE addresses this challenge from the perspective of the token space, the key bridge between pixels and image latents, through two complementary innovations: Firstly, we study token number scaling by adjusting the patch size in ViT under a fixed latent budget, and identify aggressive token-to-latent compression as the key factor that limits effective scaling. To address this issue, we decompose token-to-latent compression into two stages, reducing structural information loss and enabling effective token number scaling for generation. Secondly, to further mitigate latent representation collapse, we enhance the semantic structure of image tokens via joint self-supervised training, leading to more generative-friendly latents. With these designs, TC-AE achieves substantially improved reconstruction and generative performance under deep compression. We hope our research will advance ViT-based tokenizer for visual generation."
            },
            "general": {
                "zh": "通用版摘要稍后补充。",
                "en": "General summary coming soon."
            },
            "lazy": {
                "zh": "懒人版摘要稍后补充。",
                "en": "Lazy summary coming soon."
            }
        }
    },
    {
        "id": "2604.07338v1",
        "title": "Appear2Meaning: A Cross-Cultural Benchmark for Structured Cultural Metadata Inference from Images",
        "authors": "Yuechen Jiang, Enze Zhang, Md Mohsinul Kabir, Qianqian Xie, Stavroula Golfomitsou, Konstantinos Arvanitis, Sophia Ananiadou",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07338v1",
        "recommendationScore": 5.0,
        "summaries": {
            "expert": {
                "zh": "Recent advances in vision-language models (VLMs) have improved image captioning for cultural heritage. However, inferring structured cultural metadata (e.g., creator, origin, period) from visual input remains underexplored. We introduce a multi-category, cross-cultural benchmark for this task and evaluate VLMs using an LLM-as-Judge framework that measures semantic alignment with reference annotations. To assess cultural reasoning, we report exact-match, partial-match, and attribute-level accuracy across cultural regions. Results show that models capture fragmented signals and exhibit substantial performance variation across cultures and metadata types, leading to inconsistent and weakly grounded predictions. These findings highlight the limitations of current VLMs in structured cultural metadata inference beyond visual perception.",
                "en": "Recent advances in vision-language models (VLMs) have improved image captioning for cultural heritage. However, inferring structured cultural metadata (e.g., creator, origin, period) from visual input remains underexplored. We introduce a multi-category, cross-cultural benchmark for this task and evaluate VLMs using an LLM-as-Judge framework that measures semantic alignment with reference annotations. To assess cultural reasoning, we report exact-match, partial-match, and attribute-level accuracy across cultural regions. Results show that models capture fragmented signals and exhibit substantial performance variation across cultures and metadata types, leading to inconsistent and weakly grounded predictions. These findings highlight the limitations of current VLMs in structured cultural metadata inference beyond visual perception."
            },
            "general": {
                "zh": "通用版摘要稍后补充。",
                "en": "General summary coming soon."
            },
            "lazy": {
                "zh": "懒人版摘要稍后补充。",
                "en": "Lazy summary coming soon."
            }
        }
    },
    {
        "id": "2604.07337v1",
        "title": "From Blobs to Spokes: High-Fidelity Surface Reconstruction via Oriented Gaussians",
        "authors": "Diego Gomez, Antoine Guédon, Nissim Maruani, Bingchen Gong, Maks Ovsjanikov",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07337v1",
        "recommendationScore": 5.0,
        "summaries": {
            "expert": {
                "zh": "3D Gaussian Splatting (3DGS) has revolutionized fast novel view synthesis, yet its opacity-based formulation makes surface extraction fundamentally difficult. Unlike implicit methods built on Signed Distance Fields or occupancy, 3DGS lacks a global geometric field, forcing existing approaches to resort to heuristics such as TSDF fusion of blended depth maps.   Inspired by the Objects as Volumes framework, we derive a principled occupancy field for Gaussian Splatting and show how it can be used to extract highly accurate watertight meshes of complex scenes. Our key contribution is to introduce a learnable oriented normal at each Gaussian element and to define an adapted attenuation formulation, which leads to closed-form expressions for both the normal and occupancy fields at arbitrary locations in space. We further introduce a novel consistency loss and a dedicated densification strategy to enforce Gaussians to wrap the entire surface by closing geometric holes, ensuring a complete shell of oriented primitives. We modify the differentiable rasterizer to output depth as an isosurface of our continuous model, and introduce Primal Adaptive Meshing for Region-of-Interest meshing at arbitrary resolution.   We additionally expose fundamental biases in standard surface evaluation protocols and propose two more rigorous alternatives. Overall, our method Gaussian Wrapping sets a new state-of-the-art on DTU and Tanks and Temples, producing complete, watertight meshes at a fraction of the size of concurrent work-recovering thin structures such as the notoriously elusive bicycle spokes.",
                "en": "3D Gaussian Splatting (3DGS) has revolutionized fast novel view synthesis, yet its opacity-based formulation makes surface extraction fundamentally difficult. Unlike implicit methods built on Signed Distance Fields or occupancy, 3DGS lacks a global geometric field, forcing existing approaches to resort to heuristics such as TSDF fusion of blended depth maps.   Inspired by the Objects as Volumes framework, we derive a principled occupancy field for Gaussian Splatting and show how it can be used to extract highly accurate watertight meshes of complex scenes. Our key contribution is to introduce a learnable oriented normal at each Gaussian element and to define an adapted attenuation formulation, which leads to closed-form expressions for both the normal and occupancy fields at arbitrary locations in space. We further introduce a novel consistency loss and a dedicated densification strategy to enforce Gaussians to wrap the entire surface by closing geometric holes, ensuring a complete shell of oriented primitives. We modify the differentiable rasterizer to output depth as an isosurface of our continuous model, and introduce Primal Adaptive Meshing for Region-of-Interest meshing at arbitrary resolution.   We additionally expose fundamental biases in standard surface evaluation protocols and propose two more rigorous alternatives. Overall, our method Gaussian Wrapping sets a new state-of-the-art on DTU and Tanks and Temples, producing complete, watertight meshes at a fraction of the size of concurrent work-recovering thin structures such as the notoriously elusive bicycle spokes."
            },
            "general": {
                "zh": "通用版摘要稍后补充。",
                "en": "General summary coming soon."
            },
            "lazy": {
                "zh": "懒人版摘要稍后补充。",
                "en": "Lazy summary coming soon."
            }
        }
    },
    {
        "id": "2604.07329v1",
        "title": "Distilling Photon-Counting CT into Routine Chest CT through Clinically Validated Degradation Modeling",
        "authors": "Junqi Liu, Xinze Zhou, Wenxuan Li, Scott Ye, Arkadiusz Sitek, Xiaofeng Yang, Yucheng Tang, Daguang Xu, Kai Ding, Kang Wang, Yang Yang, Alan L. Yuille, Zongwei Zhou",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07329v1",
        "recommendationScore": 5.0,
        "summaries": {
            "expert": {
                "zh": "Photon-counting CT (PCCT) provides superior image quality with higher spatial resolution and lower noise compared to conventional energy-integrating CT (EICT), but its limited clinical availability restricts large-scale research and clinical deployment. To bridge this gap, we propose SUMI, a simulated degradation-to-enhancement method that learns to reverse realistic acquisition artifacts in low-quality EICT by leveraging high-quality PCCT as reference. Our central insight is to explicitly model realistic acquisition degradations, transforming PCCT into clinically plausible lower-quality counterparts and learning to invert this process. The simulated degradations were validated for clinical realism by board-certified radiologists, enabling faithful supervision without requiring paired acquisitions at scale. As outcomes of this technical contribution, we: (1) train a latent diffusion model on 1,046 PCCTs, using an autoencoder first pre-trained on both these PCCTs and 405,379 EICTs from 145 hospitals to extract general CT latent features that we release for reuse in other generative medical imaging tasks; (2) construct a large-scale dataset of over 17,316 publicly available EICTs enhanced to PCCT-like quality, with radiologist-validated voxel-wise annotations of airway trees, arteries, veins, lungs, and lobes; and (3) demonstrate substantial improvements: across external data, SUMI outperforms state-of-the-art image translation methods by 15% in SSIM and 20% in PSNR, improves radiologist-rated clinical utility in reader studies, and enhances downstream top-ranking lesion detection performance, increasing sensitivity by up to 15% and F1 score by up to 10%. Our results suggest that emerging imaging advances can be systematically distilled into routine EICT using limited high-quality scans as reference.",
                "en": "Photon-counting CT (PCCT) provides superior image quality with higher spatial resolution and lower noise compared to conventional energy-integrating CT (EICT), but its limited clinical availability restricts large-scale research and clinical deployment. To bridge this gap, we propose SUMI, a simulated degradation-to-enhancement method that learns to reverse realistic acquisition artifacts in low-quality EICT by leveraging high-quality PCCT as reference. Our central insight is to explicitly model realistic acquisition degradations, transforming PCCT into clinically plausible lower-quality counterparts and learning to invert this process. The simulated degradations were validated for clinical realism by board-certified radiologists, enabling faithful supervision without requiring paired acquisitions at scale. As outcomes of this technical contribution, we: (1) train a latent diffusion model on 1,046 PCCTs, using an autoencoder first pre-trained on both these PCCTs and 405,379 EICTs from 145 hospitals to extract general CT latent features that we release for reuse in other generative medical imaging tasks; (2) construct a large-scale dataset of over 17,316 publicly available EICTs enhanced to PCCT-like quality, with radiologist-validated voxel-wise annotations of airway trees, arteries, veins, lungs, and lobes; and (3) demonstrate substantial improvements: across external data, SUMI outperforms state-of-the-art image translation methods by 15% in SSIM and 20% in PSNR, improves radiologist-rated clinical utility in reader studies, and enhances downstream top-ranking lesion detection performance, increasing sensitivity by up to 15% and F1 score by up to 10%. Our results suggest that emerging imaging advances can be systematically distilled into routine EICT using limited high-quality scans as reference."
            },
            "general": {
                "zh": "通用版摘要稍后补充。",
                "en": "General summary coming soon."
            },
            "lazy": {
                "zh": "懒人版摘要稍后补充。",
                "en": "Lazy summary coming soon."
            }
        }
    },
    {
        "id": "2604.07328v1",
        "title": "How to sketch a learning algorithm",
        "authors": "Sam Gunn",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07328v1",
        "recommendationScore": 5.0,
        "summaries": {
            "expert": {
                "zh": "How does the choice of training data influence an AI model? This question is of central importance to interpretability, privacy, and basic science. At its core is the data deletion problem: after a reasonable amount of precomputation, quickly predict how the model would behave in a given situation if a given subset of training data had been excluded from the learning algorithm.   We present a data deletion scheme capable of predicting model outputs with vanishing error $\\varepsilon$ in the deep learning setting. Our precomputation and prediction algorithms are only $\\mathrm{poly}(1/\\varepsilon)$ factors slower than regular training and inference, respectively. The storage requirements are those of $\\mathrm{poly}(1/\\varepsilon)$ models.   Our proof is based on an assumption that we call \"stability.\" In contrast to the assumptions made by prior work, stability appears to be fully compatible with learning powerful AI models. In support of this, we show that stability is satisfied in a minimal set of experiments with microgpt. Our code is available at https://github.com/SamSpo1/microgpt-sketch.   At a technical level, our work is based on a new method for locally sketching an arithmetic circuit by computing higher-order derivatives in random complex directions. Forward-mode automatic differentiation allows cheap computation of these derivatives.",
                "en": "How does the choice of training data influence an AI model? This question is of central importance to interpretability, privacy, and basic science. At its core is the data deletion problem: after a reasonable amount of precomputation, quickly predict how the model would behave in a given situation if a given subset of training data had been excluded from the learning algorithm.   We present a data deletion scheme capable of predicting model outputs with vanishing error $\\varepsilon$ in the deep learning setting. Our precomputation and prediction algorithms are only $\\mathrm{poly}(1/\\varepsilon)$ factors slower than regular training and inference, respectively. The storage requirements are those of $\\mathrm{poly}(1/\\varepsilon)$ models.   Our proof is based on an assumption that we call \"stability.\" In contrast to the assumptions made by prior work, stability appears to be fully compatible with learning powerful AI models. In support of this, we show that stability is satisfied in a minimal set of experiments with microgpt. Our code is available at https://github.com/SamSpo1/microgpt-sketch.   At a technical level, our work is based on a new method for locally sketching an arithmetic circuit by computing higher-order derivatives in random complex directions. Forward-mode automatic differentiation allows cheap computation of these derivatives."
            },
            "general": {
                "zh": "通用版摘要稍后补充。",
                "en": "General summary coming soon."
            },
            "lazy": {
                "zh": "懒人版摘要稍后补充。",
                "en": "Lazy summary coming soon."
            }
        }
    },
    {
        "id": "2604.07321v1",
        "title": "Syntax Is Easy, Semantics Is Hard: Evaluating LLMs for LTL Translation",
        "authors": "Priscilla Kyei Danso, Mohammad Saqib Hasan, Niranjan Balasubramanian, Omar Chowdhury",
        "year": "2026",
        "arxivUrl": "https://arxiv.org/abs/2604.07321v1",
        "recommendationScore": 5.0,
        "summaries": {
            "expert": {
                "zh": "Propositional Linear Temporal Logic (LTL) is a popular formalism for specifying desirable requirements and security and privacy policies for software, networks, and systems. Yet expressing such requirements and policies in LTL remains challenging because of its intricate semantics. Since many security and privacy analysis tools require LTL formulas as input, this difficulty places them out of reach for many developers and analysts. Large Language Models (LLMs) could broaden access to such tools by translating natural language fragments into LTL formulas. This paper evaluates that premise by assessing how effectively several representative LLMs translate assertive English sentences into LTL formulas. Using both human-generated and synthetic ground-truth data, we evaluate effectiveness along syntactic and semantic dimensions. The results reveal three findings: (1) in line with prior findings, LLMs perform better on syntactic aspects of LTL than on semantic ones; (2) they generally benefit from more detailed prompts; and (3) reformulating the task as a Python code-completion problem substantially improves overall performance. We also discuss challenges in conducting a fair evaluation on this task and conclude with recommendations for future work.",
                "en": "Propositional Linear Temporal Logic (LTL) is a popular formalism for specifying desirable requirements and security and privacy policies for software, networks, and systems. Yet expressing such requirements and policies in LTL remains challenging because of its intricate semantics. Since many security and privacy analysis tools require LTL formulas as input, this difficulty places them out of reach for many developers and analysts. Large Language Models (LLMs) could broaden access to such tools by translating natural language fragments into LTL formulas. This paper evaluates that premise by assessing how effectively several representative LLMs translate assertive English sentences into LTL formulas. Using both human-generated and synthetic ground-truth data, we evaluate effectiveness along syntactic and semantic dimensions. The results reveal three findings: (1) in line with prior findings, LLMs perform better on syntactic aspects of LTL than on semantic ones; (2) they generally benefit from more detailed prompts; and (3) reformulating the task as a Python code-completion problem substantially improves overall performance. We also discuss challenges in conducting a fair evaluation on this task and conclude with recommendations for future work."
            },
            "general": {
                "zh": "通用版摘要稍后补充。",
                "en": "General summary coming soon."
            },
            "lazy": {
                "zh": "懒人版摘要稍后补充。",
                "en": "Lazy summary coming soon."
            }
        }
    }
];
