# 福易通 API（FYT Router）官网

福易通 API（FYT Router）的产品官网与控制台前端：面向 Agent 与企业级开发者的统一大模型智能路由层门户，包含产品介绍、模型列表与定价、快速接入示例（OpenAI / Anthropic 双协议）、控制台演示与 FAQ。

## 技术栈

React + TypeScript + Vite，Tailwind CSS，lucide-react 图标。

## 快速开始

**前置要求**：Node.js 18+（仓库带 `bun.lock`，推荐用 bun 安装）

```bash
# 1. 安装依赖
bun install   # 或 npm install

# 2. 配置环境变量
cp .env.example .env.local   # 按需填写

# 3. 启动开发服务器
npm run dev       # http://localhost:3000
```

其他脚本：

```bash
npm run build     # 生产构建
npm run preview   # 本地预览构建产物
npm run lint      # tsc --noEmit 类型检查
```

> 部分能力依赖服务端 Gemini（见 `metadata.json` 的 `majorCapabilities`），部署到 AI Studio 时自动启用。
