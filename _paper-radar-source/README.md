# PaperRadar 📡

PaperRadar 是一款极简主义的每日 AI 论文摘要产品。它专注于高质量的 AI 论文推荐，并提供三种不同深度的摘要模式（专家、普通、懒人），帮助不同背景的读者快速捕捉前沿动态。

## 核心价值
- **每日精选**：从海量 arXiv 论文中筛选出的 Top 10 最具价值论文。
- **三档摘要**：
  - **Expert (技术专家)**：深入方法论、架构和数学逻辑。
  - **General (专业人员)**：通俗又不失专业性，适合快速理解核心贡献。
  - **Lazy (懒人/TL;DR)**：一句话幽默总结，捕捉灵魂。
- **极致简约**：100% 静态前端页面，无后端、无数据库，极速加载。

## 自动化流水线 (Pipeline)

为了保证内容的实时性与高质量，我们设计了一套**人机协作（Hybrid Intelligence）**的轻量级自动化流程：

1.  **数据抓取 (Fetch)**: 运行 `scripts/fetch_papers.py` 自动从 arXiv API 获取最新相关的论文流。
2.  **领域粗筛 (Filter)**: 运行 `scripts/filter_papers.py` 基于关键词和摘要长度剔除噪音数据。
3.  **智能评分 (Score - *AI Copilot Mode*)**: 
    - 目前 `scripts/score_papers.py` 作为自动化占位符运行。
    - **当前核心逻辑**：由 **Antigravity (AI Assistant)** 直接阅读过滤后的论文摘要，基于专业判断手动完成 Top 10 的“精选”打分，确保推荐内容的深度与前瞻性。
4.  **最终选拔 (Select)**: 运行 `scripts/select_top_10.py` 生成当日的最终推送清单。
5.  **深度摘要 (Summarize)**: 
    - 使用 NotebookLM MCP 批量读取精选论文。
    - 生成多层级中文摘要并写入 `data/papers.ts`。

## 人机协作模式 (Hybrid Intelligence)

目前项目处于 **Beta 测试阶段**，我们特意采用了“**脚本干杂活，AI 干细活**”的策略：
- **脚本 (Python)**：处理高频、机械的数据抓取和格式整理，节省人力。
- **AI 助手 (Antigravity)**：承担“首席主编”职责。在没有接入高成本 LLM API 的情况下，利用 AI 助手的实时推理能力对论文进行逻辑筛选和质量把控。
- **这种模式的优势**：在保持 0 元运行成本的同时，产出了远超随机过滤的高质量学术内容。

## 开发指南

### 本地运行
```bash
npm install
npm run dev
```

### 数据更新
所有的论文数据目前存储在 `data/papers.ts`。如需手动添加，请遵循 `Paper` 类型定义。

### 测试 (Testing)

项目使用 **Jest** + **React Testing Library** 进行单元测试和组件测试。

#### 运行测试

```bash
# 运行所有测试（单次）
npm test

# 监听模式（文件变更时自动重跑）
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

#### 测试文件

所有测试位于 `__tests__/` 目录下：

| 测试文件 | 覆盖内容 |
|----------|----------|
| `papers.test.ts` | `getSummaryText()` 函数（纯字符串 / 双语 / 回退逻辑）；论文数据完整性（字段校验、唯一 ID、arXiv URL 格式、评分范围）；模块常量 |
| `LanguageContext.test.tsx` | 默认语言；`localStorage` 持久化；非法存储值兜底；`useLanguage` 在 Provider 外抛出异常；`t()` 函数对全部 14 个翻译键在中英文下的正确输出；缺失键回退 |
| `ModeSwitcher.test.tsx` | 三按钮渲染与 Emoji；激活/非激活 CSS 类；`card` 和 `global` 两种变体样式；`onChange` 回调；中英文标签切换 |
| `LanguageSwitchButton.test.tsx` | 按钮渲染；中英文状态下标签与 `aria-label` 正确性；双向切换（zh→en、en→zh）；切换后写入 `localStorage` |
| `PaperCard.test.tsx` | 标题 / ID / 作者 / 年份 / arXiv 链接渲染；双语摘要与旧版纯字符串摘要；`StarRating` 边界值（0、8.5、10 及越界分数）；模式切换渐变动画（150 ms）；快速连点时的 timeout 取消逻辑；`globalMode` prop 同步；重复点击当前模式无副作用 |

#### 覆盖率

| 文件 | 语句 | 分支 | 函数 | 行 |
|------|------|------|------|----|
| `LanguageSwitchButton.tsx` | 100% | 100% | 100% | 100% |
| `ModeSwitcher.tsx` | 100% | 88% | 100% | 100% |
| `PaperCard.tsx` | 100% | 100% | 100% | 100% |
| `LanguageContext.tsx` | 100% | 100% | 100% | 100% |
| `papers.ts` | 100% | 100% | 100% | 100% |
| **合计** | **100%** | **96.8%** | **100%** | **100%** |

> `ModeSwitcher.tsx` 第 28 行有一个未覆盖分支（`|| key` 回退），该代码在实际运行中不可达，因为 `modesConfig` 已覆盖了所有 `SummaryMode` 枚举值。

#### 技术栈

- **Test Runner**: [Jest](https://jestjs.io/) 30
- **Component Testing**: [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) + [@testing-library/jest-dom](https://github.com/testing-library/jest-dom)
- **User Interaction**: [@testing-library/user-event](https://testing-library.com/docs/user-event/intro/)
- **Environment**: `jest-environment-jsdom`
- **Transformer**: `next/jest`

### 技术栈
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: Static JSON / arXiv API
- **AI Engine**: Google NotebookLM (via MCP)

## 设计理念
- **Typography**: 使用 `Inter` 处理正文，`Georgia` 处理标题和 Logo，营造纸质论文的品质感。
- **Color**: 经典的黑白灰基调，点缀 `#c0392b` 正红色。
- **Animations**: 保持极简，仅在摘要模式切换时使用平滑的渐变动画。
