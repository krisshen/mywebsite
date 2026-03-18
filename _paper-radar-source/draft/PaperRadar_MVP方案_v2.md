# PaperRadar · MVP 方案 v2

> Next.js 14 + TypeScript + Tailwind CSS · 纯前端静态数据

---

## 产品定义

每天手动挑选 3–5 篇 AI 论文，为每篇生成三级摘要，发布到一个静态页面。用户点击按钮切换阅读难度。

**不是什么：** 不是自动化系统，不是数据库产品，不是用户平台。

---

## 核心功能（仅此三项）

| 功能 | 说明 |
|------|------|
| 今日精选论文 | 3–5 篇，手动维护 `data/papers.ts` |
| 三级难度摘要 | 专业版 / 通用版 / 懒人版，支持全局切换 + 单卡独立切换 |
| 原文链接 + 推荐指数 | 指向 arXiv，1–5 星（红色星形） |

---

## 技术栈（实际实现）

```
paper-radar/
├── app/
│   ├── layout.tsx        ← HTML 壳、SEO meta、字体引入（Inter）
│   ├── page.tsx          ← 主页：Header / 数据统计栏 / 全局切换器 / 论文列表 / Footer
│   └── globals.css       ← 基础 Tailwind 指令 + summary-fade 动画
├── components/
│   ├── PaperCard.tsx     ← 单篇论文卡片，含本地难度切换 + 淡入淡出
│   └── ModeSwitcher.tsx  ← 三按钮切换组件（global / card 两种变体）
├── data/
│   └── papers.ts         ← 数据层：Paper 类型定义 + papers 数组（每日只改这里）
├── next.config.js
├── tailwind.config.ts
└── package.json
```

**依赖：**

| 包 | 版本 | 用途 |
|----|------|------|
| next | 14.2.5 | App Router 框架 |
| react / react-dom | ^18 | UI 渲染 |
| tailwindcss | ^3.4.1 | 样式 |
| typescript | ^5 | 类型安全 |

- 部署：Vercel（`npm run build` → 静态导出）
- 成本：$0
- 数据库：无；后端：无

---

## 数据结构（`data/papers.ts`）

**每日只需修改此文件的 `papers` 数组。**

```typescript
export type SummaryMode = 'expert' | 'general' | 'lazy'

export type Paper = {
    id: string               // 卡片序号，如 '01'
    title: string            // 论文标题
    authors: string          // 作者列表
    year: string             // 发表年份
    arxivUrl: string         // 完整 arXiv URL
    recommendationScore: number  // 推荐指数 1–5
    summaries: {
        expert: string       // 专业版，~200字
        general: string      // 通用版，~150字
        lazy: string         // 懒人版，~50字（可加 emoji）
    }
}
```

---

## 摘要生成 Prompt

```
你是 AI 论文内容分析专家。

论文标题：{{title}}
作者：{{authors}}
摘要原文：{{abstract}}

请输出以下三个版本，直接给文本，不要标签：

【专业版】面向研究者，保留所有技术术语，精确描述方法与结论，200字以内。

【通用版】面向有编程基础的工程师，用类比解释核心思路，避免缩写，150字以内。

【懒人版】一句话，说清楚这篇论文做了什么、有什么用，50字以内。可以加 emoji 开头。
```

---

## 每日工作流

```
1. 浏览 arXiv，挑 3–5 篇
2. 用 Claude 生成三级摘要（使用上面的 Prompt）
3. 在 data/papers.ts 中更新 papers 数组
4. git push → Vercel 自动部署
5. 完成
```

预计耗时：30–45 分钟/天

---

## 页面结构（实际实现）

```
┌─────────────────────────────────────────────┐
│ Header                                      │
│   Daily AI Paper Digest（eyebrow）           │
│   PaperRadar LOGO（Georgia 字体）            │
│   每天精选 3–5 篇，让任何人都能读懂 AI 论文   │
│   ● 日期 badge（红点 animate-pulse）         │
├─────────────────────────────────────────────┤
│ 数据统计栏                                   │
│   🔍 今日论文总量  ⭐ 精选推荐               │
│   📚 3 种阅读难度  ⏱ 平均阅读时长            │
├─────────────────────────────────────────────┤
│ 全局模式切换器                               │
│   今日精选论文            [专业版][通用版][懒人版] │
├─────────────────────────────────────────────┤
│ 论文卡片 × N                                 │
│   ┌──────────────────────────────────────┐  │
│   │ [hover 时顶部红色细线]               │  │
│   │ 01  标题（Georgia 字体）       ★★★★★ │  │
│   │     作者 · 年份                      │  │
│   │ 阅读模式 [专业版][通用版][懒人版]    │  │
│   │ ┌────────────────────────────────┐  │  │
│   │ │ 摘要内容（淡入淡出 150ms）     │  │  │
│   │ └────────────────────────────────┘  │  │
│   │ ● 通用版                  arXiv ↗  │  │
│   └──────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│ Footer                                      │
│   PaperRadar · 每天用 AI 帮你精读前沿论文   │
│   © 2025 PaperRadar · 数据来自 arXiv        │
└─────────────────────────────────────────────┘
```

---

## 交互设计细节

| 功能 | 实现方式 |
|------|---------|
| 全局难度切换 | `page.tsx` 持有 `globalMode` state，传入每个 `PaperCard` |
| 单卡独立切换 | `PaperCard` 持有本地 `mode` state，与 global 同步 |
| 摘要淡入淡出 | `visible` state + `opacity-0/100` + 150ms `setTimeout` |
| 全局→单卡同步 | `useEffect` + `useRef` 检测 `globalMode` 变化触发淡出 |
| 悬浮效果 | 卡片上移 0.5 + 阴影加深 + 顶部红线显现 |
| 星形评分 | `StarRating` 组件，红色（`#c0392b`）填充，灰色未填充 |

---

## 本地开发

```bash
npm install
npm run dev       # http://localhost:3000
```

---

## 第二阶段（跑顺之后再说）

以下功能**暂不做**，等有用户反馈再判断：

- arXiv RSS 自动抓取
- 自动评分过滤
- 数据库存储
- 邮件订阅
- 趋势统计
- 用户系统
- 多标签筛选
- 历史存档页

---

## 两周执行计划

**第一周**

| 天 | 任务 |
|----|------|
| Day 1–2 | ✅ 搭建 Next.js 项目，完成页面与组件 |
| Day 3–4 | 跑通摘要生成 Prompt，积累 10 篇样本 |
| Day 5–7 | 部署到 Vercel，开始每日更新 |

**第二周**

| 天 | 任务 |
|----|------|
| Day 8–10 | 录制演示视频（重点展示难度切换） |
| Day 11–14 | 发布视频，收集反馈，决定下一步 |

---

## 风险

| 风险 | 应对 |
|------|------|
| 每天更新太累，断更 | 允许隔天，质量优先于频率 |
| 摘要质量不稳定 | 保留 arXiv 原文链接，注明 AI 生成 |
| 没有流量 | 视频是核心引流手段，先做内容 |

---

*PaperRadar MVP v2 · 基于实际生成代码更新 · 2026-02*
