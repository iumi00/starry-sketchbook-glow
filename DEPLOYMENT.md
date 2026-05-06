# Vercel 部署指南

## 部署步骤

### 1. 准备工作
- 确保项目已推送到 GitHub 仓库
- 注册 Vercel 账号（推荐使用 GitHub 账号登录）

### 2. 部署流程

#### 方法一：通过 Vercel 网页界面
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择你的 GitHub 仓库
4. 配置项目设置：
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. 点击 "Deploy"

#### 方法二：通过 Vercel CLI
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel
```

### 3. 环境变量配置

在 Vercel 控制台中设置环境变量：
1. 进入项目设置 → Environment Variables
2. 添加必要的环境变量（参考 `.env.example`）

### 4. 部署配置说明

项目已包含 `vercel.json` 配置文件，包含：
- 构建命令和输出目录配置
- SPA 路由重写规则
- 缓存策略优化
- Node.js 运行时配置

### 5. 常见问题

#### 构建失败
- 检查 `package.json` 中的构建脚本
- 确保所有依赖都已正确安装
- 查看构建日志中的错误信息

#### 路由问题
- 项目使用 TanStack Router，已配置 SPA 重写规则
- 所有路由都会重定向到 `index.html`

#### 环境变量问题
- 确保在 Vercel 控制台中正确设置环境变量
- 变量名需要以 `VITE_` 开头才能在客户端访问

### 6. 自动部署

配置完成后，每次推送到主分支都会自动触发部署：
- GitHub → Vercel 自动部署
- 预览部署：每个 PR 都会创建预览环境
- 生产部署：合并到主分支后自动部署

## 项目特性

- **框架**: React + Vite + TanStack Router
- **样式**: Tailwind CSS
- **部署**: Vercel (SPA)
- **缓存**: 优化的缓存策略
- **路由**: 客户端路由 + 服务端重写
