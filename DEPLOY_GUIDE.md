# 部署指南 - 5分钟搞定！

将你的音标学习应用部署到 Vercel 或 Netlify，完全免费！

---

## 方案一：Vercel 部署（推荐）

### 步骤 1：注册 Vercel 账号
访问 https://vercel.com/signup，用 GitHub/GitLab/Bitbucket 账号登录

### 步骤 2：导入项目
1. 登录后点击「Add New Project」
2. 点击「Import」导入你的项目
3. 选择你的 Git 仓库

### 步骤 3：配置并部署
- **Project Name**: 输入项目名称（如 `phonetic-learning`）
- **Framework Preset**: 自动检测为 Vite
- **Root Directory**: 保持默认
- 点击「Deploy」

### 步骤 4：完成！
部署完成后，你会获得一个类似 `https://phonetic-learning-xxx.vercel.app` 的链接！

---

## 方案二：Netlify 部署

### 步骤 1：注册 Netlify 账号
访问 https://app.netlify.com/signup

### 步骤 2：添加站点
1. 登录后点击「Add new site」
2. 选择「Deploy manually」或「Import an existing project」

### 步骤 3：直接上传（最简单）
1. 在项目根目录运行 `npm run build`
2. 将 `dist` 文件夹拖放到 Netlify 的上传区域
3. 等待上传完成

### 步骤 4：完成！
你会获得一个类似 `https://random-name-12345.netlify.app` 的链接！

---

## 方案三：使用 Vercel CLI（如果你想在命令行部署）

### 安装 Vercel CLI
```bash
npm install -g vercel
```

### 登录并部署
```bash
vercel login
vercel
```

---

## 手机上使用 PWA

### iOS (iPhone/iPad)
1. 用 Safari 浏览器打开部署后的网站
2. 点击底部的「分享」按钮（方形带向上箭头）
3. 向下滚动，点击「添加到主屏幕」
4. 点击「添加」

### Android
1. 用 Chrome 浏览器打开部署后的网站
2. 点击右上角菜单（三个点）
3. 点击「安装应用」或「添加到主屏幕」
4. 按照提示完成安装

---

## 项目已配置好的功能

✅ PWA 支持（manifest.json）
✅ 响应式设计（支持手机和电脑）
✅ 完整的 48 个音标
✅ 音标发音（英语兔标准录音）
✅ 拼读规则
✅ 互动练习

---

## 快速开始

最简单的方式：
1. 去 https://vercel.com 注册
2. 导入你的项目
3. 点击 Deploy

5分钟后你就有一个可以在手机上像原生应用一样使用的音标学习应用了！🎉
