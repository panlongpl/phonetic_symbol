# 手机原生 App 构建指南

使用 Capacitor 将音标学习应用打包成 iOS 和 Android 原生应用！

## 前置要求

### 通用要求
- Node.js 18+
- npm 或 yarn

### iOS 构建（仅 Mac）
- macOS 12+
- Xcode 14+
- CocoaPods

### Android 构建
- Android Studio
- Android SDK
- JDK 11+

---

## 快速开始

### 1. 构建 Web 项目
```bash
npm run build
```

### 2. 添加平台（首次使用）
```bash
# 添加 iOS 平台（Mac 上）
npx cap add ios

# 添加 Android 平台
npx cap add android
```

### 3. 同步代码
每次修改代码后，重新构建并同步：
```bash
npm run build
npx cap sync
```

---

## iOS 应用构建

### 步骤 1：打开 Xcode
```bash
npx cap open ios
```

### 步骤 2：在 Xcode 中配置
1. 选择项目根目录
2. 在「Signing & Capabilities」中配置你的 Apple Developer 账号
3. 选择你的开发团队
4. 设置 Bundle Identifier（默认是 `com.phoneticlearning.app`）

### 步骤 3：运行到模拟器或真机
- 在 Xcode 顶部选择模拟器或连接的真机
- 点击「Run」按钮（▶️）或按 `Cmd+R`

### 步骤 4：导出 IPA 文件（发布到 App Store）
1. 在 Xcode 菜单选择 Product → Archive
2. 等待归档完成
3. 在 Organizer 窗口点击「Distribute App」
4. 按照向导完成导出

---

## Android 应用构建

### 步骤 1：打开 Android Studio
```bash
npx cap open android
```

### 步骤 2：在 Android Studio 中配置
1. 等待 Gradle 同步完成
2. 在 `app/build.gradle` 中检查 applicationId（默认是 `com.phoneticlearning.app`）

### 步骤 3：运行到模拟器或真机
- 在 Android Studio 顶部选择模拟器或连接的真机
- 点击「Run」按钮（▶️）或按 `Shift+F10`

### 步骤 4：生成 APK/AAB 文件
**调试版 APK：**
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. APK 位置：`android/app/build/outputs/apk/debug/`

**发布版 AAB（推荐用于 Google Play）：**
1. Build → Generate Signed Bundle / APK
2. 选择「Android App Bundle」
3. 配置密钥库（首次需要创建）
4. 完成导出

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run build` | 构建 Web 项目 |
| `npx cap sync` | 同步 Web 代码到原生平台 |
| `npx cap copy` | 仅复制 Web 资源（不更新 native 代码） |
| `npx cap open ios` | 在 Xcode 中打开 iOS 项目 |
| `npx cap open android` | 在 Android Studio 中打开 Android 项目 |
| `npx cap add ios` | 添加 iOS 平台 |
| `npx cap add android` | 添加 Android 平台 |

---

## 修改应用配置

### 应用名称和 ID
编辑 `capacitor.config.ts`：
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.phoneticlearning.app',  // 修改这里
  appName: '英语音标学习',              // 修改这里
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

### 修改应用图标和启动画面
使用 `@capacitor/assets` 工具生成图标：
```bash
npm install -D @capacitor/assets
# 准备 logo.png 和 logo-dark.png 在 assets/ 目录
npx capacitor-assets generate
```

---

## 常见问题

### Q: 修改了 Web 代码后如何更新原生应用？
A: 运行 `npm run build && npx cap sync`

### Q: iOS 构建报错？
A: 确保使用最新的 Xcode，运行 `cd ios && pod install`

### Q: Android 构建报错？
A: 确保 Android Studio 和 SDK 是最新版本

---

## 下一步

1. 添加 iOS/Android 平台：`npx cap add ios && npx cap add android`
2. 同步代码：`npx cap sync`
3. 打开 Xcode/Android Studio 构建应用

祝你构建顺利！🎉
