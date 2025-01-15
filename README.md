# 基沃托斯音乐盒 (Blue Archive Music Box)

一个优雅的蔚蓝档案音乐播放器，使用 Next.js 14 构建。

## 功能特点

- 🎵 在线播放蔚蓝档案音乐
- 🎨 优雅的可视化效果
- 📱 响应式设计，支持移动端
- 🎯 实时进度显示
- 🎼 播放列表管理
- 🌈 粒子动画效果

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (状态管理)
- Supabase (数据库和存储)
- Howler.js (音频处理)

## 开发环境设置

### 前置要求

1. **Node.js 环境**
   - 安装 [Node.js](https://nodejs.org/) (推荐 v18.17 或更高版本)
   - 安装 [pnpm](https://pnpm.io/) (可选，但推荐)

2. **开发工具**
   - 安装 [Visual Studio Code](https://code.visualstudio.com/)
   - 推荐的 VSCode 插件：
     - ESLint
     - Prettier
     - Tailwind CSS IntelliSense

3. **账号准备**
   - [GitHub](https://github.com) 账号
   - [Vercel](https://vercel.com) 账号
   - [Supabase](https://supabase.com) 账号

## 部署步骤

### 1. Fork 项目
1. 访问本项目的 GitHub 仓库
2. 点击右上角的 "Fork" 按钮
3. 等待 Fork 完成

### 2. Supabase 配置
1. 登录 [Supabase](https://supabase.com)
2. 创建新项目：
   - 点击 "New Project"
   - 输入项目名称
   - 选择离你最近的地区
   - 设置数据库密码
   - 等待项目创建完成

### 3. 数据库设置
1. 进入 Supabase 项目
2. 打开 SQL 编辑器
3. 创建数据表，复制并运行以下 SQL：

```sql
-- 创建 tracks 表
CREATE TABLE tracks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  audioUrl TEXT NOT NULL,
  coverImage TEXT,
  category TEXT NOT NULL,
  duration INTEGER NOT NULL,
  artist TEXT,
  album TEXT,
  releaseDate TIMESTAMP,
  characters TEXT[] DEFAULT '{}',
  event TEXT,
  tags TEXT[] DEFAULT '{}',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 创建 playlists 表
CREATE TABLE playlists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  userId TEXT NOT NULL,
  tracks UUID[] DEFAULT '{}',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

[存储配置和项目密钥部分保持不变]

### 6. Vercel 部署
1. 登录 [Vercel](https://vercel.com)
2. 点击 "Add New Project"
3. 导入 GitHub 仓库：
   - 选择你 fork 的仓库
   - 点击 "Import"

4. 配置项目：
   - Framework Preset: Next.js
   - Root Directory: ./
   - Node.js Version: 18.x

5. 环境变量设置：
   - 点击 "Environment Variables"
   - 添加以下变量：
     ```
     NEXT_PUBLIC_SUPABASE_URL=你的_PROJECT_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_ANON_KEY
     ```

6. 部署项目：
   - 点击 "Deploy"
   - 等待部署完成
   - 访问生成的域名查看项目

## 常见问题

### 1. 类型错误
如果遇到 TypeScript 类型错误，请确保：
1. 已安装所有依赖：
   ```bash
   npm install
   npm install -D @types/node @types/react @types/react-dom @types/howler typescript
   ```

2. 检查 `tsconfig.json` 配置：
   ```json
   {
     "compilerOptions": {
       "target": "es5",
       "lib": ["dom", "dom.iterable", "esnext"],
       "allowJs": true,
       "skipLibCheck": true,
       "strict": true,
       "noEmit": true,
       "esModuleInterop": true,
       "module": "esnext",
       "moduleResolution": "bundler",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "jsx": "preserve",
       "incremental": true,
       "plugins": [
         {
           "name": "next"
         }
       ],
       "paths": {
         "@/*": ["./src/*"]
       }
     },
     "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
     "exclude": ["node_modules"]
   }
   ```

### 2. 部署问题
1. **Vercel 部署失败**
   - 确保环境变量已正确设置
   - 检查 `next.config.js` 配置
   - 查看构建日志定位具体错误

2. **Supabase 连接问题**
   - 验证环境变量值是否正确
   - 检查 Supabase 项目是否正常运行
   - 确认数据库表是否已创建

### 3. 音频播放问题
1. **音频无法播放**
   - 检查音频文件格式（支持 mp3, wav）
   - 确认 Storage bucket 权限设置正确
   - 验证音频 URL 是否可访问

2. **播放器控制失效**
   - 清除浏览器缓存
   - 检查控制台错误信息
   - 确认 Howler.js 是否正确加载

## 贡献指南

1. Fork 本项目
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交改动：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

项目作者 - [@hhhoim](https://github.com/hhhoim)

项目链接: [https://github.com/hhhoim/blue-archive-music](https://github.com/hhhoim/blue-archive-music)
