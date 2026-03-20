import json
import os
import argparse
from datetime import datetime

# You would paste the generated summaries here if running manually, 
# or the assistant will populate this dictionary.
SUMMARIES = {
    "2603.19235v1": {
        "expert": "VEGA-3D 提出了一种利用视频生成模型隐式 3D 先验进行场景理解的范式转换。该方法将预训练的视频扩散模型重新定位为'潜在世界模拟器'，通过从中间噪声水平提取时空特征，并通过令牌级自适应门控融合机制与语义表示集成，从而在无需显式 3D 监督的情况下为多模态大语言模型提供丰富的几何线索。",
        "general": "这篇论文提出了一个有趣的观点：视频生成模型为了生成连贯的视频，已经学会了强大的 3D 结构先验和物理规律。VEGA-3D 框架利用这些隐式知识来增强视觉语言模型的 3D 理解能力，而不需要额外的 3D 标注数据。这种方法在 3D 场景理解、空间推理和具身操作等基准测试中都取得了优异表现。",
        "lazy": "这篇论文发现，会'生成视频'的 AI 其实已经偷偷学会了 3D 空间感。作者开发了一个工具，让这些 AI 把它们隐含的 3D 知识拿出来，帮助其他 AI 更好地理解空间和物体。"
    },
    "2603.19234v1": {
        "expert": "Matryoshka Gaussian Splatting 为标准 3DGS 管线引入了连续细节层次（LoD）能力，同时不牺牲全容量渲染质量。其核心创新是随机预算训练：每次迭代采样随机 splat 预算，同时优化对应的前缀和完整集合。这种方法只需两次前向传播，无需架构修改。",
        "general": "3D 高斯溅射（3DGS）是一种很酷的 3D 场景表示方法，但它通常只能以固定质量渲染。这个工作让 3DGS 可以像俄罗斯套娃一样，根据需要灵活调整渲染质量——需要快速预览时用少量高斯点，需要高质量时用全部高斯点。这种灵活的质量-速度权衡对实际部署非常有价值。",
        "lazy": "这个技术让 3D 渲染可以'按需调速'。想快速预览就用低画质，想看细节就用高画质，而且不需要准备多个版本的模型，一个模型就能搞定所有需求。"
    },
    "2603.19232v1": {
        "expert": "CubiD 是首个针对高维表示的离散生成模型。它在高维离散表示的任何维度、任何位置都可以被掩码和预测，实现了细粒度的掩码生成。在 ImageNet-256 上，CubiD 实现了最先进的离散生成性能，且证明了这些离散化令牌可以同时有效服务于理解和生成任务。",
        "general": "目前的离散视觉生成方法通常只能处理低维令牌（8-32 维），这限制了它们的语义表达能力。CubiD 突破了这个限制，首次实现了高维离散令牌（768-1024 维）的生成。这意味着同一组令牌既能用于图像理解，也能用于图像生成，为构建统一的多模态架构铺平了道路。",
        "lazy": "以前 AI 生成图片和理解图片用的是不同的'语言'。这篇论文让它们学会了同一种语言，这样 AI 就能既看得懂图片，又能画出图片，而且用的是同一套内部表示。"
    },
    "2603.19229v1": {
        "expert": "NavTrust 是首个统一的具身导航可信度基准，系统地破坏 RGB、深度和指令等输入模态，在真实场景中评估其对导航性能的影响。该基准评估了七种最先进的方法，揭示了在真实腐蚀条件下的显著性能下降。",
        "general": "现有的具身导航研究主要在理想条件下评估性能，但真实世界充满了各种干扰：摄像头可能模糊、深度传感器可能不准、指令可能含糊不清。NavTrust 基准专门测试导航系统在这些'脏'条件下的鲁棒性，帮助研究者发现和修复系统的薄弱环节。",
        "lazy": "这个基准专门给机器人导航系统'找茬'——故意让摄像头变糊、传感器出错、指令说不清楚，然后看机器人还能不能正常工作。这样能帮我们造出更可靠的机器人。"
    },
    "2603.19227v1": {
        "expert": "该工作提出了一种弥合语义和运动条件的三阶段框架，核心是 MoTok 扩散离散运动令牌化器。MoTok 通过将语义抽象与精细重建解耦，实现了紧凑的单层令牌同时保持运动保真度。在 HumanML3D 上，该方法将轨迹误差从 0.72 cm 降至 0.08 cm。",
        "general": "运动生成通常需要在语义控制（比如'挥手'）和运动细节（比如手的具体轨迹）之间做权衡。这个工作巧妙地将两者分离：先用离散令牌规划语义动作，再用扩散模型生成精细运动轨迹。这种分离让控制更精确，同时保持了运动的自然流畅。",
        "lazy": "这个技术让 AI 生成人体运动更精准。以前 AI 可能只知道'要挥手'，但现在它能精确控制手挥多高、多快、什么轨迹，而且动作看起来很自然。"
    },
    "2603.19228v1": {
        "expert": "SAMA 将视频编辑分解为语义锚定和运动建模两个阶段。语义锚定通过联合预测稀疏锚帧的语义令牌和视频潜在变量来建立可靠的视觉锚点。运动对齐则通过在运动中心视频恢复前置任务（立方体修复、速度扰动、管状洗牌）上预训练同一骨干网络来内化时间动态。",
        "general": "现有的视频编辑方法通常需要外部先验（如 VLM 特征）来保持质量和一致性，但这限制了泛化能力。SAMA 的创新在于让模型自己学会语义和运动的分离表示，无需外部辅助就能实现高质量编辑。更有趣的是，仅靠预训练阶段就能获得不错的零样本视频编辑能力。",
        "lazy": "这个视频编辑 AI 不需要额外的'助手'来帮忙，它自己学会了把视频拆成'要改什么'和'怎么动'两部分。这样改出来的视频既符合指令，又保持了原来的运动感觉。"
    },
    "2603.19226v1": {
        "expert": "该方法引入多对象生成感知（MultiGP），通过利用同一场景中所有物体共享同一光照这一共识来解决固有的辐射度量解缠难题。关键技术创新包括：级联端到端架构、协调引导确保扩散收敛到单一一致光照估计、轴向注意力促进不同反射率物体之间的'交流'，以及纹理提取 ControlNet。",
        "general": "从单张图片中分离出材质、纹理和光照是一个极度困难的问题。这个工作的巧妙之处在于利用了'同一场景的物体共享光照'这一物理约束。通过让多个物体'互相参考'，系统能更准确地推断每个物体的真实材质和纹理，同时估计出场景的整体光照。",
        "lazy": "这个 AI 能从一张照片里看出物体的真实颜色和材质，还能知道当时的光线是什么样的。秘诀是让照片里的不同物体'互相作证'，这样推断结果更准确。"
    },
    "2603.19225v1": {
        "expert": "FinTradeBench 是首个整合公司基本面和交易信号的金融推理基准，包含 1400 个问题，涵盖纳斯达克 100 家公司十年的历史数据。基准分为三类推理：基本面聚焦、交易信号聚焦以及需要跨信号推理的混合问题。",
        "general": "现有的金融 AI 评测主要关注公司财报等基本面数据，很少考虑股票的市场交易表现。FinTradeBench 将两者结合起来，测试 AI 能否综合分析公司的'内在价值'和'市场表现'来做出更全面的投资判断。这对评估 LLM 在真实金融决策中的能力很有价值。",
        "lazy": "这个基准考 AI 做投资分析的能力。它不只看公司财报好不好，还要看股票在市场上表现怎么样，然后让 AI 综合判断该不该投资。这比只看一方面更接近真实的投资决策。"
    },
    "2603.19224v1": {
        "expert": "EffectErase 引入了 VOR（Video Object Removal）大规模数据集，包含 60K 高质量视频对，涵盖五种效果类型。该方法将视频对象插入视为逆辅助任务，在互惠学习方案中训练，包含任务感知区域引导和插入-移除一致性目标。",
        "general": "视频去物不仅要移除物体本身，还要消除它产生的各种视觉效果（变形、阴影、反射等）。现有的数据集很少系统地涵盖这些效果。VOR 数据集填补了这个空白，而 EffectErase 方法通过让模型同时学习'添加效果'和'移除效果'，获得了更好的效果消除能力。",
        "lazy": "这个技术能从视频里完美地'擦掉'一个物体，连它的影子和反光都擦得干干净净。秘诀是让 AI 同时学习怎么'加特效'和'去特效'，这样去得更彻底。"
    },
    "2603.19220v1": {
        "expert": "Nemotron-Cascade 2 是一个开放的 30B MoE 模型（3B 激活参数），在数学和编码推理性能上接近前沿开放模型。它是第二个在 2025 年 IMO、IOI 和 ICPC 世界总决赛中达到金牌级性能的开放权重 LLM，以 20 倍更少的参数展示了极高的智能密度。",
        "general": "这个模型的亮点是用很少的参数实现了极强的推理能力。它只有 30B 参数（其中每次只激活 3B），但在国际数学和信息学奥林匹克竞赛中都达到了金牌水平。这说明模型设计和训练方法的改进可以大幅提升'智能密度'，让小模型也能有大智慧。",
        "lazy": "这是一个'小而精'的 AI 模型。虽然它比很多大模型小得多，但在数学和编程竞赛中却能拿金牌。这证明了模型不一定要大才能聪明，训练方法得当，小模型也能很强。"
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
    ts_content += f"export const generatedYear = '{generated_at.year}';\n"
    ts_content += f"export const generatedDateLabel = {json.dumps(generated_date_label, ensure_ascii=False)};\n\n"
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