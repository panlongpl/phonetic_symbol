# PWA（手机端）使用指南

## 如何在手机上使用这个应用

### 方式一：PWA 渐进式 Web 应用（推荐）

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到网站**
   - 将 `dist` 目录部署到任意 Web 服务器
   - 推荐使用：Vercel、Netlify、GitHub Pages 等

3. **在手机上安装**
   - **iOS (iPhone/iPad)**:
     1. 用 Safari 浏览器打开网站
     2. 点击底部的「分享」按钮
     3. 向下滚动，点击「添加到主屏幕」
     4. 点击「添加」

   - **Android**:
     1. 用 Chrome 浏览器打开网站
     2. 点击右上角菜单（三个点）
     3. 点击「安装应用」或「添加到主屏幕」
     4. 按照提示完成安装

### 方式二：本地预览

```bash
npm run preview
```

然后在手机浏览器访问你电脑的 IP 地址 + 端口。

## 完善 PWA 图标（可选）

为了获得最佳体验，建议添加以下图标到 `public/icons/` 目录：

- `icon-192x192.png` - 192x192 像素 PNG
- `icon-512x512.png` - 512x512 像素 PNG
- `icon-maskable-192x192.png` - 可裁剪图标 192x192
- `icon-maskable-512x512.png` - 可裁剪图标 512x512

可以使用在线工具生成图标：
- https://favicon.io/
- https://realfavicongenerator.net/
