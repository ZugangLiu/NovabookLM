# SourceMind 开发计划

## 项目动机

你已经完成过一个真实问题驱动的小工具项目，说明你适合用“做出一个能用的东西”来学习，而不是只看教程。下一阶段的目标不是泛泛地学 Next.js，而是在一个完整产品里练到：

- App Router 页面与布局
- Server Components / Client Components 的边界
- Server Actions 与 Route Handlers 的分工
- 数据库建模、CRUD、认证与权限
- 文件上传、解析、切块
- AI 流式聊天
- 简化 RAG、Embedding、引用来源
- 部署、README、复盘

这个项目的最终目标是做一个类 NotebookLM 的最小可用产品：

> 用户创建 Notebook，上传资料，然后基于资料提问。系统回答必须尽量基于上传资料，并显示引用来源。

项目名暂定：

> **SourceMind：基于资料的 AI 笔记助手**

## 当前仓库基线

当前项目已经初始化为 Next.js 项目，不需要重新 `create next-app`。

已有情况：

- 使用顶层 `app/` 目录，而不是 `src/app/`
- 使用 `npm` 和 `package-lock.json`，而不是 `pnpm`
- 已有 `/`、`/dashboard`、`/settings`、`/notebooks`、`/notebooks/[id]` 页面雏形
- 当前首页仍有 create-next-app 模板内容，需要清理
- 后续以 NotebookLM 的页面逻辑为准：`/notebooks` 是登录后的 Notebook Library，`/notebooks/[id]` 是单个 Notebook Workspace，`/dashboard` 第一版暂不作为主入口

因此后续计划统一采用：

```txt
app/
components/
lib/
prisma/
npm
```

除非后面明确决定迁移，否则不要再混用 `src/app` 和 `pnpm`。

## MVP 核心功能

第一版只做 6 个能力：

1. 登录/注册
2. 创建和管理 Notebook
3. 上传 TXT / Markdown，PDF 作为增强项
4. 解析资料并切块
5. 基于资料聊天
6. 展示回答引用来源

第一版不要做：

- 多租户
- 支付
- 团队协作
- 复杂权限系统
- 浏览器插件
- 移动端
- Audio Overview
- 一开始就上 LangChain
- 一开始就追求 UI 完美

## 技术栈

建议使用：

```txt
Next.js App Router
TypeScript
Tailwind CSS
Prisma
SQLite first, PostgreSQL later
Auth.js / NextAuth
Vercel AI SDK
OpenAI / Gemini / DeepSeek API
JSON embedding first, pgvector later
Vercel deployment
```

第一版优先降低基础设施复杂度：

- 本地开发先用 SQLite，避免一开始被 PostgreSQL 连接、云数据库和环境变量拖住
- RAG 第一版先做关键词检索
- Embedding 第一版可以存 JSON 字符串，后续再迁移到 pgvector / Supabase Vector
- PDF 解析放在 TXT/MD 完整跑通之后

## 依赖安装

当前项目使用 npm，所以计划中的安装命令统一写成 npm：

```bash
npm install prisma @prisma/client
npm install zod lucide-react
npm install ai @ai-sdk/react
```

如果使用 OpenAI：

```bash
npm install @ai-sdk/openai
```

如果使用 Auth.js + Prisma：

```bash
npm install next-auth @auth/prisma-adapter
```

如果后续支持 PDF：

```bash
npm install pdf-parse
```

初始化 Prisma：

```bash
npx prisma init
```

## 总周期：18 天

每天 1 到 2 小时。工作压力大时，只完成当天最小验收标准。

整体顺序：

```txt
产品骨架
-> 数据库和 CRUD
-> 认证和权限
-> 上传和切块
-> 普通 AI 聊天
-> 简化 RAG
-> Embedding
-> 产品化和部署
```

核心原则：

> 先把产品主流程跑通，再逐步增强 AI 能力。

---

# Day 0：整理项目基线

## 目标

让当前仓库变成一个干净的 SourceMind 起点。

## 任务

- 保留顶层 `app/` 结构
- 清理首页 create-next-app 模板链接和默认文案
- 修改 metadata
- 确认使用 npm
- 确认 `npm run dev` 可启动
- 确认 `npm run lint` 可运行

## 验收标准

访问：

```txt
http://localhost:3000
```

首页显示：

```txt
SourceMind
Chat with your own sources.
```

---

# Day 1：页面骨架和布局

## 目标

做出接近 NotebookLM 的基本信息架构。

NotebookLM 的核心不是传统 SaaS Dashboard，而是：

```txt
Notebook Library
-> Notebook Workspace
   -> Sources
   -> Chat
   -> Notes / Studio
```

因此第一版把 `/notebooks` 作为登录后的主入口，`/notebooks/[id]` 作为真正的工作台。`/dashboard` 暂时不实现，或者只做 redirect 到 `/notebooks`。

## 页面

```txt
/
/notebooks
/notebooks/[id]
/settings
```

页面职责：

```txt
/
登录前首页，介绍 SourceMind，提供登录/开始使用入口

/notebooks
Notebook Library：创建 notebook、展示 notebook 列表、搜索/排序占位、空状态

/notebooks/[id]
Notebook Workspace：左侧 sources，中间 chat，右侧 notes/studio 占位

/settings
账户、模型、偏好设置

/dashboard
第一版暂不做，或 redirect 到 /notebooks
```

Notebook Workspace 的第一版三栏职责：

```txt
Sources
- 添加资料
- 展示资料列表
- 展示 processing / ready / failed 状态
- 后续支持选择哪些 source 参与回答

Chat
- 展示基于资料的对话
- 显示建议问题占位
- 回答中展示 citations

Notes / Studio
- 第一版只做占位
- 后续保存回答、手写 notes、生成摘要或学习指南
```

## 建议目录

```txt
app/page.tsx
app/notebooks/page.tsx
app/notebooks/[id]/page.tsx
app/settings/page.tsx
components/app-sidebar.tsx
components/header.tsx
components/shell.tsx
components/notebook-workspace.tsx
```

## 练习重点

- App Router
- Layout
- Link 跳转
- Server Component 默认策略
- 必要时才使用 Client Component

## 验收标准

- 页面之间可以正常跳转
- `/notebooks` 有 Notebook Library 区域
- `/notebooks/[id]` 有 Sources、Chat、Notes/Studio 三栏工作台占位
- Settings 有基础设置占位
- 如果保留 `/dashboard`，它会跳转到 `/notebooks`

---

# Day 2：数据库建模

## 目标

建立最小数据模型。

## 开发阶段建议

先用 SQLite：

```env
DATABASE_URL="file:./dev.db"
```

后续部署前再切 PostgreSQL。

## MVP Prisma 模型

如果暂时不接 Auth.js Adapter，可先用简化模型：

```prisma
model User {
  id        String     @id @default(cuid())
  email     String     @unique
  name      String?
  notebooks Notebook[]
  createdAt DateTime   @default(now())
}

model Notebook {
  id        String    @id @default(cuid())
  title     String
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  sources   Source[]
  messages  Message[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Source {
  id         String        @id @default(cuid())
  notebookId String
  notebook   Notebook      @relation(fields: [notebookId], references: [id])
  title      String
  type       String
  content    String?
  status     String        @default("pending")
  chunks     SourceChunk[]
  createdAt  DateTime      @default(now())
  updatedAt  DateTime      @updatedAt
}

model SourceChunk {
  id        String   @id @default(cuid())
  sourceId  String
  source    Source   @relation(fields: [sourceId], references: [id])
  content   String
  index     Int
  embedding String?
  createdAt DateTime @default(now())
}

model Message {
  id         String   @id @default(cuid())
  notebookId String
  notebook   Notebook @relation(fields: [notebookId], references: [id])
  role       String
  content    String
  citations  String?
  createdAt  DateTime @default(now())
}
```

如果使用 Auth.js Prisma Adapter，需要改用它要求的 `User`、`Account`、`Session`、`VerificationToken` 结构，不要只保留上面的简化 `User` 表。

## 验收标准

- Prisma schema 可以 migrate
- 本地数据库生成成功
- 有 `lib/prisma.ts` 单例客户端

---

# Day 3：Notebook CRUD

## 目标

完成普通 SaaS 的核心 CRUD。

## 功能

- 创建 Notebook
- 修改 Notebook 标题
- 删除 Notebook
- `/notebooks` 展示 Notebook 列表
- 点击进入 Notebook 详情页

## 实现建议

表单类 mutation 优先用 Server Actions：

```txt
app/notebooks/actions.ts
app/notebooks/[id]/actions.ts
```

每个 mutation 都要形成这个习惯：

```ts
const user = await getCurrentUser()
if (!user) throw new Error("Unauthorized")
```

## 验收标准

```txt
打开 /notebooks
创建 Notebook
进入详情页
修改标题
删除 Notebook
刷新后数据仍然存在
```

---

# Day 4：接入认证

## 目标

让项目能区分公开页面、登录后页面和用户自己的数据。

## 路线选择

建议二选一：

```txt
GitHub OAuth：更接近真实 SaaS，但需要配置 OAuth App
本地账号密码：更容易理解登录流程，但安全细节更多
```

为了尽快推进产品，优先建议 GitHub OAuth + Auth.js。

## 注意

如果使用 Auth.js Prisma Adapter，Prisma schema 必须补全 Auth.js 需要的表。不要在已经使用 Adapter 的情况下只写简化版 `User`。

## 验收标准

- 可以登录
- 可以退出
- 页面能拿到当前用户
- 未登录状态和已登录状态 UI 不同

---

# Day 5：权限保护

## 目标

实现用户数据隔离。

## 任务

- 未登录访问 `/notebooks` 自动跳转登录页
- 未登录访问 `/notebooks/[id]` 自动跳转登录页
- 用户只能看到自己的 Notebook
- 用户不能通过 URL 访问别人的 Notebook
- 所有 Server Actions 检查当前用户
- 所有 Route Handlers 检查当前用户

## 关键查询模式

```ts
const notebook = await prisma.notebook.findFirst({
  where: {
    id,
    userId: currentUser.id,
  },
})
```

## 验收标准

```txt
A 用户创建 Notebook
B 用户看不到
B 用户访问 A 的 notebook URL 会被拒绝或 404
未登录不能进入 /notebooks
```

---

# Day 6：TXT / Markdown 上传

## 目标

先跑通最简单的资料上传，不碰 PDF。

## 功能

- Notebook 详情页有上传入口
- 支持 `.txt` 和 `.md`
- 上传后写入 `Source`
- 页面展示资料列表
- Source 状态从 `pending` 变为 `ready` 或 `failed`

## 实现建议

文件上传用 Route Handler：

```txt
app/api/notebooks/[id]/sources/route.ts
```

## 验收标准

```txt
上传 txt/md
资料出现在 Notebook 页面
刷新后仍然存在
上传失败时显示 failed
```

---

# Day 7：资料解析和切块

## 目标

把资料拆成可检索的 chunk。

## 切块函数

```ts
export function chunkText(text: string, chunkSize = 800, overlap = 100) {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    chunks.push(text.slice(start, end))
    start += chunkSize - overlap
  }

  return chunks
}
```

## 需要注意

- `chunkSize` 必须大于 `overlap`
- 空文件要拒绝
- 超大文件要限制大小
- 每个 chunk 保存 `sourceId` 和 `index`

## 验收标准

```txt
上传一份 md/txt
SourceChunk 被创建
页面能看到 chunk 数量
可以查看某个 source 的 chunks
```

---

# Day 8：上传体验和错误处理

## 目标

先把 TXT/MD 上传做稳，再上 PDF。

## 功能

- 文件类型校验
- 文件大小限制
- pending / processing / ready / failed 状态
- 上传 loading
- 删除 Source
- 重新解析 Source

## 验收标准

```txt
错误文件类型会被拒绝
空文件会被拒绝
解析失败有 failed 状态
删除 Source 会同时删除 chunks
```

---

# Day 9：普通 AI 聊天

## 目标

先做不基于资料的普通 AI chat。

## 文件建议

```txt
app/api/chat/route.ts
app/notebooks/[id]/chat-panel.tsx
```

## 功能

- 用户输入问题
- AI 流式返回
- 保存 user message
- 保存 assistant message
- 刷新后聊天历史仍然存在

## 注意

Vercel AI SDK 的 React hooks 来自：

```ts
@ai-sdk/react
```

模型 provider 单独安装，例如：

```ts
@ai-sdk/openai
```

## 验收标准

```txt
Notebook 页面中可以聊天
AI 流式输出
刷新后历史记录还在
不同 Notebook 有不同聊天历史
```

---

# Day 10：Chat 绑定 Notebook 和权限

## 目标

让聊天接口成为 Notebook 私有能力。

## 任务

- 请求携带 `notebookId`
- 服务端校验 notebook 属于当前用户
- 只保存当前 notebook 的消息
- 不同 notebook 的聊天记录互不影响

## 验收标准

```txt
A 用户不能给 B 用户的 notebook 发消息
Notebook A 和 Notebook B 聊天历史隔离
刷新页面后历史正确
```

---

# Day 11：关键词版 RAG

## 目标

先不用 embedding，理解 RAG 的产品链路。

## 流程

```txt
用户问题
-> 从当前 Notebook 的 SourceChunk 中做关键词检索
-> 取 Top chunks
-> 把 chunks 塞进 prompt
-> 让 AI 只基于 chunks 回答
```

## Prompt 原则

```txt
你是一个资料问答助手。
你只能根据给定资料回答用户问题。
如果资料中没有答案，请回答：“资料中没有找到相关信息”。
不要编造引用。
```

## 验收标准

```txt
上传一份资料
问资料里明确存在的问题
AI 能基于资料回答
问资料外的问题
AI 会说资料中没有找到相关信息
```

---

# Day 12：可靠引用来源

## 目标

让引用尽量由程序保证，而不是完全交给模型自由发挥。

## 关键规则

检索阶段由程序选出候选 chunks，并给每个 chunk 编号：

```ts
type RetrievedChunk = {
  chunkId: string
  sourceTitle: string
  chunkIndex: number
  content: string
}
```

模型只能引用这些候选 chunk。最终保存 citations 时，应该保存 `chunkId`、`sourceTitle`、`chunkIndex` 和短 quote。

## 返回结构

```ts
{
  answer: string,
  citations: [
    {
      chunkId: string,
      sourceTitle: string,
      chunkIndex: number,
      quote: string
    }
  ]
}
```

## 验收标准

```txt
回答下方显示引用
引用能对应到实际 chunk
没有检索到 chunk 时不显示假引用
```

---

# Day 13：Embedding 存储

## 目标

让每个 chunk 拥有 embedding。

## 第一版建议

先把 embedding 存成 JSON 字符串：

```prisma
embedding String?
```

这样可以避免第一版直接处理 pgvector、数据库扩展和部署差异。

## 流程

```txt
上传资料
-> 切块
-> 为每个 chunk 生成 embedding
-> JSON.stringify 后保存
```

## 验收标准

```txt
新上传的 chunks 都有 embedding
embedding 生成失败时 source 标记为 failed
已有无 embedding 的 chunks 可以重新生成
```

---

# Day 14：语义检索

## 目标

用 embedding 做 TopK 检索。

## 流程

```txt
用户问题
-> 生成 question embedding
-> 读取当前 notebook 的 chunk embeddings
-> cosine similarity
-> 取 Top 5
-> 构造 prompt
-> 返回回答和引用
```

## 验收标准

```txt
问“这份文档主要讲什么”
问“实现步骤是什么”
问“作者结论是什么”
AI 能基于语义相关 chunk 回答
引用来源能对应实际 chunk
```

---

# Day 15：PDF 支持

## 目标

在主流程稳定之后增加 PDF。

## 功能

- 上传 PDF
- 提取文本
- 切块
- 生成 embedding
- 保存 SourceChunk

## 风险

PDF 解析可能遇到：

- 文件过大
- 扫描版 PDF 没有文本层
- 中文提取质量差
- 解析时间过长
- 解析失败

第一版遇到扫描版 PDF 可以直接提示“不支持扫描版 PDF”，不要做 OCR。

## 验收标准

```txt
文本型 PDF 可以上传并问答
扫描版或解析失败 PDF 会显示 failed
失败原因对用户可见
```

---

# Day 16：产品体验优化

## 目标

让项目像一个可用产品，而不是功能拼图。

## 任务

- Empty state
- Loading state
- Error state
- Source 状态展示
- Chat pending 状态
- 删除确认
- 基础响应式布局
- README 截图准备

## 验收标准

```txt
没有资料时知道下一步该做什么
上传和聊天时有明确等待状态
失败时知道哪里失败
```

---

# Day 17：部署

## 目标

部署到 Vercel。

## 注意

如果本地使用 SQLite，部署前需要切换到 PostgreSQL。部署环境通常需要：

```txt
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
AI_API_KEY 或具体 provider key
```

## 验收标准

```txt
线上可以访问
线上可以登录
线上可以创建 Notebook
线上可以上传资料
线上可以聊天
线上权限隔离正常
```

---

# Day 18：README 和复盘

## README 结构

```txt
# SourceMind

A mini NotebookLM-style AI research assistant built with Next.js.

## Features

- Notebook management
- Source upload
- TXT / Markdown / PDF parsing
- Source-grounded AI chat
- Citation display
- Streaming responses

## Tech Stack

- Next.js App Router
- TypeScript
- Prisma
- Auth.js
- Vercel AI SDK
- Tailwind CSS

## Screenshots

## Local Development

## Environment Variables

## Roadmap
```

## 复盘文章主题

```txt
我用 Next.js 实现了一个类 NotebookLM 的 AI 资料问答工具
```

复盘内容：

- 为什么选择 Next.js
- App Router 如何组织页面
- Server Components 和 Client Components 如何分工
- Server Actions 和 Route Handlers 如何分工
- 文件上传怎么做
- RAG 流程怎么实现
- 引用来源如何设计
- 认证和权限踩了哪些坑
- 后续如何优化

## 验收标准

```txt
README 能指导别人本地启动
复盘能讲清楚项目架构和关键取舍
项目有线上地址或至少有本地演示截图
```

---

# 每日总表

| 天数 | 主题 | 产出 |
| --- | --- | --- |
| Day 0 | 整理项目基线 | 当前仓库变成 SourceMind 起点 |
| Day 1 | 页面骨架 | 首页、Notebook Library、Notebook Workspace、Settings |
| Day 2 | 数据库 | Prisma schema、dev.db、Prisma client |
| Day 3 | CRUD | Notebook 创建、修改、删除 |
| Day 4 | 认证 | 用户可登录退出 |
| Day 5 | 权限 | 用户数据隔离 |
| Day 6 | 文本上传 | TXT / MD source |
| Day 7 | 切块 | SourceChunk |
| Day 8 | 上传体验 | 状态、错误处理、删除 source |
| Day 9 | 普通聊天 | 流式 AI chat |
| Day 10 | Notebook Chat | 聊天历史绑定 Notebook |
| Day 11 | 关键词 RAG | 基于 chunk 回答 |
| Day 12 | 引用 | citations 对应真实 chunk |
| Day 13 | Embedding | chunk 向量化 |
| Day 14 | 语义检索 | TopK 检索 |
| Day 15 | PDF | 文本型 PDF 解析 |
| Day 16 | 产品化 | loading、empty、error、响应式 |
| Day 17 | 部署 | Vercel 上线 |
| Day 18 | README / 复盘 | 项目文档和技术文章 |

---

# 必须刻意练习的能力

## 1. Server Component 和 Client Component 边界

原则：

```txt
默认 Server Component
需要交互状态、浏览器 API、useChat、上传控件时才 Client Component
```

例子：

```txt
Notebook 页面：Server Component
资料列表：Server Component
聊天输入框：Client Component
上传控件：Client Component
```

## 2. Server Actions 和 Route Handlers 边界

建议：

```txt
表单类 mutation：Server Actions
文件上传 / AI chat / webhook：Route Handlers
```

例子：

```txt
创建 Notebook：Server Action
修改标题：Server Action
删除 Source：Server Action
上传文件：Route Handler
聊天接口：Route Handler
```

## 3. AI 产品链路

需要形成肌肉记忆：

```txt
用户输入
-> 权限校验
-> 读取业务数据
-> 检索资料
-> 构造 prompt / context
-> 调用模型
-> 流式返回
-> 保存结果
-> 前端展示
```

## 4. 可靠性习惯

每个阶段都要问：

```txt
未登录会怎样？
访问别人的数据会怎样？
空数据会怎样？
失败会怎样？
刷新页面后还在吗？
线上环境能跑吗？
```

---

# 最终完成标准

完成这个计划后，你应该能做到：

- 独立启动一个 Next.js 全栈项目
- 判断代码应该放在页面、组件、Server Action 还是 Route Handler
- 做普通 SaaS CRUD
- 做基础认证和用户数据隔离
- 做文件上传和解析
- 做 AI 流式聊天
- 做最小 RAG
- 解释引用来源设计
- 部署并写出项目复盘

这个项目不是为了复制完整 NotebookLM，而是为了把你从“会用 AI 写脚本”推进到“能用 JS 技术栈做完整产品”。
