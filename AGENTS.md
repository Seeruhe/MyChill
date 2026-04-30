# AGENTS.md

本文件面向进入本仓库协作的代理或开发者，帮助你快速理解项目、减少误改，并用尽量小的改动完成任务。

## 1. 项目概览

- 项目名称：`Chill FM`
- 类型：Vite + React 19 + TypeScript 单页前端应用
- 风格：复古电台 / 爵士嘻哈 / dot-matrix 视觉风格
- AI 能力：通过 Groq API 调用 `Llama 3.3 70B`，为艺术家问答和“Archivist Assistant”提供内容

当前应用的核心体验包括：

- 音乐播放台与唱片/曲目展示
- 艺术家档案侧栏与故事文案
- AI 问答弹窗
- 明暗模式、滚动动画、画布视觉效果

## 2. 关键文件

- `src/App.tsx`
  当前主应用基本都在这里。它同时承载了：
  - 页面结构与交互状态
  - 曲目和艺术家静态数据
  - 动画、画布绘制、弹窗、播放控制
  - AI 助手调用入口

  这是仓库里最重要也最容易变得脆弱的文件。除非任务明确要求重构，否则优先做局部、小范围修改。

- `src/services/groqService.ts`
  Groq 客户端调用与提示词封装位置。任何 AI 回复逻辑、模型名、系统语气、字数限制等都在这里调整。

- `src/index.css`
  全局样式、主题 token、动画 keyframes、自定义视觉效果都在这里。视觉修改优先复用现有变量，例如 `--color-accent`、`--color-bg` 等。

- `src/main.tsx`
  React 应用挂载入口，通常无需改动。

- `vite.config.ts`
  使用 Vite 注入 `process.env.GROQ_API_KEY` 到前端代码，并配置 React/Tailwind 插件与别名。

- `README.md`
  当前仓库的基础运行说明，内容较简略。

## 3. 运行方式

常用命令：

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

说明：

- `dev` 使用 `vite --port=3000 --host=0.0.0.0`
- `lint` 实际上是 `tsc --noEmit`，这里没有 ESLint
- `build` 是最基本的交付前检查

注意：

- `package.json` 中的 `clean` 是 `rm -rf dist`，在 Windows PowerShell 下不一定可直接工作。不要默认依赖这个脚本。

## 4. 环境变量与安全

- 需要在本地提供 `GROQ_API_KEY`
- 示例见 `.env.example`
- 不要把真实密钥写入源码、提交到仓库或硬编码到组件中

虽然 `vite.config.ts` 会把 `GROQ_API_KEY` 注入前端，但这也意味着密钥会进入客户端构建产物。若任务涉及正式上线或安全整改，应优先考虑把 Groq 调用迁移到服务端，而不是继续扩展前端直连模式。

## 5. 当前代码特征

- 这是一个前端为主的项目，没有看到测试目录，也没有现成的后端服务结构
- UI 与业务逻辑高度集中在 `src/App.tsx`
- 项目使用 `motion` 做动画，使用 `lucide-react` 做图标
- 部分内容是硬编码的静态数据，包含曲目、艺术家资料和文案
- 部分界面文案同时包含英文和中文

处理此仓库时，优先遵循以下策略：

- 小改优于大改
- 保持视觉语言一致，不要把页面改成通用模板风格
- 优先复用现有状态、样式 token 和组件结构
- 未被请求时，不主动做大规模拆分或状态管理迁移

## 6. 编辑建议

- 如果只是改文案、交互或样式，优先在现有结构上补丁式修改
- 如果必须拆分 `src/App.tsx`，先确认收益明显，再拆到少量高价值组件
- 修改 AI 相关能力时，同时检查：
  - `src/services/groqService.ts`
  - `src/App.tsx` 中发起请求与展示响应的部分
- 修改视觉样式时，同时检查：
  - `src/index.css`
  - `src/App.tsx` 中大量 Tailwind class

## 7. 验证标准

完成修改后，至少做下面这些检查：

- `npm run lint`
- `npm run build`

如果任务涉及交互或界面，额外确认：

- 首页能正常加载
- AI 弹窗可打开/关闭
- 关键状态切换不会导致明显报错
- 桌面端布局没有明显破坏

## 8. 仓库现状提醒

- 当前目录不是一个完整的 git worktree；如果需要 git 操作，先确认上层目录或仓库初始化情况
- README 较简略，后续若新增能力，建议同步补充 README
- 某些中文文案可能存在编码异常或历史字符问题，编辑时注意文件编码与显示结果

## 9. 适合代理的工作方式

进入这个仓库后，建议按以下顺序理解上下文：

1. 先读 `README.md` 和 `package.json`
2. 再读 `src/App.tsx` 把页面主流程看清
3. 涉及 AI 时读 `src/services/groqService.ts`
4. 涉及视觉时读 `src/index.css`
5. 修改后至少跑 `npm run lint` 和 `npm run build`

如果任务没有明确要求，请避免：

- 无理由引入新的状态管理库
- 无理由替换动画库或样式体系
- 无理由把页面改成与当前品牌风格不一致的通用设计
- 把真实 API Key 写进仓库

## 10. 一句话总结

这是一个以氛围感和交互体验为核心的单页 AI 音乐前端。做修改时，请优先保护现有视觉语言与体验节奏，用最小、最稳的方式完成任务。
