# Android APK 构建指南

由于这台电脑上没有安装 Android Studio，我为你提供两种方案：

---

## 方案一：在有 Android Studio 的电脑上构建（推荐）

### 前置条件
- Android Studio（最新版）
- JDK 11+
- Android SDK

### 步骤

#### 1. 准备项目
```bash
# 1. 克隆或复制整个项目到目标电脑
# 2. 进入项目目录
cd phonetic_symbol

# 3. 安装依赖（如果还没安装）
npm install

# 4. 构建 Web 项目
npm run build

# 5. 添加 Android 平台（如果还没添加）
npx cap add android

# 6. 同步代码
npx cap sync
```

#### 2. 在 Android Studio 中打开
```bash
npx cap open android
```

#### 3. 构建调试版 APK
1. 等待 Gradle 同步完成（可能需要几分钟）
2. 在顶部菜单栏选择：**Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. 等待构建完成
4. APK 位置：`android/app/build/outputs/apk/debug/app-debug.apk`

#### 4. 构建发布版 APK（可选，用于正式发布）
1. **Build** → **Generate Signed Bundle / APK**
2. 选择 **APK**
3. 配置密钥库（首次需要创建新的密钥库）
4. 选择 release 构建变体
5. 完成构建
6. APK 位置：`android/app/release/`

---

## 方案二：使用 PWA（更简单，无需构建）

如果你只是想在手机上使用，不需要通过 App Store 发布，PWA 是更简单的方案：

### 部署到免费托管服务

#### 使用 Netlify（最简单）
1. 访问 https://app.netlify.com/
2. 点击「Add new site」→「Deploy manually」
3. 将 `dist` 文件夹拖放到上传区域
4. 等待部署完成（约 1 分钟）
5. 获取网站链接，在手机浏览器打开
6. 点击「添加到主屏幕」

#### 使用 Vercel
1. 访问 https://vercel.com/
2.