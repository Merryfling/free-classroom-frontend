# Free Classroom Frontend

基于 Next.js 的空闲教室查询系统前端应用。

## 技术栈

- Next.js 13
- TypeScript
- Tailwind CSS
- shadcn/ui

## 功能特点

- 实时显示教室空闲/占用状态
- 自动计算当前周数（基于2024年12月9日为第15周）
- 支持空闲/占用时段切换显示
- 自动刷新数据（每两小时，8:00-21:00）
- 响应式设计，支持移动端和桌面端

## 开发环境设置

1. 克隆仓库：
```bash
git clone https://github.com/Merryfling/free-classroom-frontend.git
cd free-classroom-frontend
```

2. 安装依赖：
```bash
npm install
```

3. 创建环境配置文件：
```bash
cp .env.example .env
```

4. 启动开发服务器：
```bash
npm run dev
```

## 环境变量

- `NEXT_PUBLIC_API_URL`: 后端 API 地址
  - 本地开发：http://localhost:8080
  - 生产环境：https://your-backend-domain.com

## 部署

### Vercel 部署（推荐）

1. Fork 本仓库到你的 GitHub 账号

2. 在 [Vercel](https://vercel.com) 创建新项目：
   - 导入你 fork 的仓库
   - 框架预设选择 "Next.js"
   - 在环境变量设置中添加 `NEXT_PUBLIC_API_URL`

3. 部署完成后，Vercel 会自动生成一个域名

### 自定义域名（可选）

1. 在 Vercel 项目设置中添加你的域名
2. 按照 Vercel 的说明配置 DNS 记录
3. 等待 DNS 生效（通常需要几分钟到几小时）

### 手动部署

如果要部署到自己的服务器：

1. 构建生产版本：
```bash
npm run build
```

2. 启动生产服务器：
```bash
npm start
```

## 项目结构

```
src/
├── app/              # Next.js 应用目录
├── components/       # React 组件
│   ├── ui/          # UI 组件
│   └── ...          # 业务组件
└── lib/             # 工具函数和类型定义
```

## 贡献

欢迎提交 Pull Request 和 Issue。

## 许可证

MIT 