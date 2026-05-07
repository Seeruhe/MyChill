# AGENTS.md

本文件面向进入本仓库协作的代理或开发者，帮助你快速理解项目、减少误改，并用尽量小的改动完成任务。

## 1. 项目概览

- 项目名称：`MyChill` / `Chill FM`
- 类型：Vite + React 19 + TypeScript 单页前端应用，包含 `3d-album-stack` npm workspace
- 风格：复古电台 / 爵士嘻哈 / dot-matrix 视觉风格
- AI 能力：通过后端 API 调用 LongCat `LongCat-Flash-Chat`（OpenAI 兼容协议），为艺术家问答和 “Archivist Assistant” 提供内容

当前应用的核心体验包括：

- 音乐播放台与唱片/曲目展示
- 艺术家档案侧栏与故事文案
- AI 问答弹窗
- 明暗模式、滚动动画、画布视觉效果
- iframe 隔离的 3D 专辑阅读页面

## 2. 关键文件

- `src/App.tsx`
  主应用状态协调位置，包含播放、主题、语言、页面切换、gallery、artist panel 和 AI modal 等主流程。除非任务明确要求重构，否则优先做局部、小范围修改。

- `api/ask-artist.js`
  Vercel serverless API。这里读取服务端 `LONGCAT_API_KEY`、构建提示词、调用 LongCat，并只把 AI 回复返回给前端。可选用 `LONGCAT_API_URL` 与 `LONGCAT_MODEL` 覆盖默认端点和模型。

- `src/services/aiService.ts`
  浏览器端 AI 请求封装。它只能调用 `/api/ask-artist`，不要在这里直接访问 LongCat 或读取真实 API key。provider-neutral，切换上游 provider 不需要改这里。

- `src/index.css`
  全局样式、主题 token、动画 keyframes、自定义视觉效果。视觉修改优先复用现有变量，例如 `--color-accent`、`--color-bg` 等。

- `src/main.tsx`
  React 应用挂载入口，通常无需改动。

- `vite.config.ts`
  Vite、React、Tailwind 与路径别名配置。不要在这里注入 `LONGCAT_API_KEY` 或其它真实 provider key。

- `3d-album-stack/`
  独立 3D album stack workspace，通过 iframe 在主应用中加载。保留其原始滚动、预览、完整展开交互。

- `README.md`
  基础运行说明。

## 3. 运行方式

常用命令：

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run lint:stack`

说明：

- `dev` 使用 `vite --port=3000 --host=0.0.0.0`
- `lint` 实际上是 `tsc --noEmit`
- `build` 会先构建 `3d-album-stack`，复制产物到 `public/3d-album-stack`，再构建主应用
- 如果需要本地测试 `/api/ask-artist`，使用 `vercel dev --listen 3000`

注意：

- `package.json` 中的 `clean` 是 `rm -rf dist`，在 Windows PowerShell 下不一定可直接工作。不要默认依赖这个脚本。

## 4. 环境变量与安全

- 本地和 Vercel 需要提供服务端环境变量 `LONGCAT_API_KEY`（可选 `LONGCAT_API_URL`、`LONGCAT_MODEL`）
- 示例见 `.env.example`
- 不要把真实密钥写入源码、提交到仓库或硬编码到组件中
- 不要用 Vite `define`、`VITE_` 前缀或其它方式把 provider key 注入前端 bundle
- LongCat 调用必须通过 `/api/ask-artist` 这样的服务端边界完成

## 5. 当前代码特征

- 这是一个前端为主的项目，辅以 Vercel serverless API
- UI 与播放业务逻辑仍较集中在 `src/App.tsx`
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
  - `api/ask-artist.js`
  - `src/services/aiService.ts`
  - `src/App.tsx` 中发起请求与展示响应的部分
- 修改视觉样式时，同时检查：
  - `src/index.css`
  - `src/App.tsx` 中大量 Tailwind class

## 7. 验证标准

完成修改后，至少做下面这些检查：

- `npm run lint`
- `npm run build`

如果修改 `3d-album-stack`，也运行：

- `npm run lint:stack`

如果任务涉及交互或界面，额外确认：

- 首页能正常加载
- AI 弹窗可打开/关闭
- 关键状态切换不会导致明显报错
- 桌面端布局没有明显破坏

## 8. 仓库现状提醒

- 当前仓库已连接 GitHub：`ryanyeong/MyChill`
- README 较简略，后续若新增能力，建议同步补充 README
- 某些中文文案可能存在编码异常或历史字符问题，编辑时注意文件编码与显示结果

## 9. 适合代理的工作方式

进入这个仓库后，建议按以下顺序理解上下文：

1. 先读 `README.md`、`package.json` 和 `docs/PROJECT_CANON.md`
2. 再读 `src/App.tsx` 把页面主流程看清
3. 涉及 AI 时读 `api/ask-artist.js` 与 `src/services/aiService.ts`
4. 涉及视觉时读 `src/index.css`
5. 修改后至少跑 `npm run lint` 和 `npm run build`

如果任务没有明确要求，请避免：

- 无理由引入新的状态管理库
- 无理由替换动画库或样式体系
- 无理由把页面改成与当前品牌风格不一致的通用设计
- 把真实 API key 写进仓库或前端 bundle

## 10. 一句话总结

这是一个以氛围感和交互体验为核心的 AI 音乐前端。做修改时，请优先保护现有视觉语言、播放连续性和安全边界，用最小、最稳的方式完成任务。
