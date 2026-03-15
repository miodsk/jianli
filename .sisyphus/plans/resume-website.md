# 个人简历网站开发计划

## TL;DR

> **快速概要**：基于 Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui 构建现代化个人简历网站，支持亮暗主题切换，单页滚动布局，JSON数据驱动，流畅动画效果。

> **交付物**：
> - 完整的单页简历网站
> - 亮暗主题切换功能
> - 响应式设计（移动端友好）
> - JSON数据管理系统
> - shadcn/ui 组件库集成
> - 动画效果（滚动进入、交互、平滑滚动、主题切换）
> - Vercel部署配置

> **预估工作量**：Medium
> **并行执行**：YES - 4个波次
> **关键路径**：项目结构 → 数据层 → 组件开发 → 布局集成 → 部署

---

## Context

### 原始需求
用户需要一个个人简历展示网站，包含个人信息、教育背景、工作经历、技能和项目经验等内容，要求简洁清晰、响应式设计、支持亮暗主题、部署在Vercel。

### 访谈总结
**关键决策**：
- 布局风格：单页滚动
- 主题系统：切换按钮 + localStorage持久化
- 设计风格：简约现代
- 技能展示：按技术领域分类（前端框架、后端框架、开发语言、数据库/中间件、LLM框架）
- 数据存储：JSON文件
- 个人照片：需要，使用本地文件
- 项目截图：不需要
- 组件库：shadcn/ui
- 动画效果：滚动进入动画、交互动画、平滑滚动、主题切换动画（使用 Framer Motion / GSAP）
- 测试策略：无自动化测试，使用Agent QA验证（Playwright）
- 可访问性：基本语义HTML

**技术栈**：
- 框架：Next.js 16.1.6 (App Router)
- UI库：React 19.2.3
- 样式：Tailwind CSS v4
- 组件库：shadcn/ui（基于 Radix UI）
- 动画：Framer Motion / GSAP（根据场景选择）
- 语言：TypeScript 5
- 部署：Vercel（静态导出）

### Metis审查
**已解决的差距**：
- 主题切换行为：切换按钮 + localStorage持久化
- 技能分类定义：按技术领域分为5个类别
- 项目字段规范：基本信息 + 技术栈 + GitHub链接 + 演示链接
- 图片需求：个人照片需要，项目截图不需要
- 测试策略：Agent QA验证
- 可访问性标准：基本语义HTML

---

## Work Objectives

### 核心目标
创建一个现代化、简洁的个人简历展示网站，能够清晰展示个人技能和项目经验，支持亮暗主题切换，在移动端和桌面端都能良好展示。

### 具体交付物
- 单页滚动的简历网站（Hero、技能、教育、经历、项目、联系）
- 亮暗主题切换系统（含localStorage持久化和切换动画）
- 响应式设计（375px - 1920px）
- JSON数据管理系统（TypeScript类型定义）
- shadcn/ui 组件库集成（Button、Card、Badge等）
- 动画效果（滚动进入动画、交互动画、平滑滚动、主题切换动画）
- Vercel静态部署配置

### 完成定义
- [ ] 所有6个主要内容区域完整渲染
- [ ] 亮暗主题切换功能正常工作并持久化
- [ ] 移动端（375px）和桌面端（1920px）均无布局问题
- [ ] 简历数据从JSON文件正确加载
- [ ] 成功部署到Vercel

### 必须包含
- 个人信息区域（姓名、照片、职位、联系方式）
- 教育背景区域（学校、专业、学历、GPA、时间）
- 专业技能区域（按5个类别分组展示）
- 实习经历区域（公司、职位、时间、职责描述）
- 项目经验区域（名称、技术栈、GitHub链接、演示链接、简介）
- 联系方式区域（邮箱、电话、地址、网站）

### 必须不包含（AI Slop防护）
- ❌ 联系表单或表单提交功能
- ❌ PDF简历下载/生成功能
- ❌ 多语言/i18n基础设施
- ❌ SEO优化（meta标签、sitemap、structured data）
- ❌ 博客、CMS或内容管理功能
- ❌ 分析/跟踪代码（Google Analytics等）
- ❌ 社交媒体分享按钮
- ❌ 评论或推荐系统
- ❌ 搜索或筛选功能
- ❌ 认证或用户管理
- ❌ 数据库或API路由
- ❌ 项目截图/图片库

---

## Verification Strategy

> **零人工干预** — 所有验证由代理执行。无例外。
> 要求"用户手动测试/确认"的验收标准被禁止。

### 测试决策
- **基础设施存在**：NO（项目刚初始化）
- **自动化测试**：None
- **框架**：N/A
- **Agent QA**：ALWAYS（每个任务强制包含）

### QA政策
每个任务必须包含代理执行的QA场景（见下方TODO模板）。
证据保存到 `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`。

- **前端/UI**：使用Playwright（playwright技能）— 导航、交互、DOM断言、截图
- **响应式**：使用Playwright视口调整 — 测试375px、768px、1024px、1920px
- **主题切换**：使用Playwright — 验证亮/暗模式切换和持久化
- **数据加载**：使用Playwright — 验证JSON数据正确渲染到页面

---

## Execution Strategy

### 并行执行波次

> 最大化吞吐量，将独立任务分组到并行波次。
> 每个波次完成后才开始下一个。
> 目标：每波5-8个任务。少于3个（除最终波）= 拆分不足。

```
Wave 1（立即开始 — 项目基础设施）:
├── Task 1: 创建JSON数据文件和TypeScript类型定义 [quick]
├── Task 2: 初始化shadcn/ui组件库 [quick]
├── Task 3: 配置Next.js静态导出和Tailwind主题 [quick]
├── Task 4: 安装和配置动画库（Framer Motion / GSAP）[quick]
├── Task 5: 实现主题切换系统 [quick]
└── Task 6: 创建导航组件（含平滑滚动动画）[visual-engineering]

Wave 2（Wave 1后 — 核心组件开发）:
├── Task 7: Hero区域组件（含滚动进入动画）[visual-engineering]
├── Task 8: 技能区域组件（含滚动进入动画）[visual-engineering]
├── Task 9: 教育背景组件（含滚动进入动画）[visual-engineering]
├── Task 10: 实习经历组件（含滚动进入动画）[visual-engineering]
├── Task 11: 项目经验组件（含滚动进入和交互动画）[visual-engineering]
└── Task 12: 联系方式组件（含滚动进入动画）[visual-engineering]

Wave 3（Wave 2后 — 集成和优化）:
├── Task 13: 主页面集成和布局 [visual-engineering]
├── Task 14: 响应式设计调整 [visual-engineering]
├── Task 15: 可访问性检查和修复 [unspecified-high]
└── Task 16: 性能优化和构建测试 [quick]

Wave 4（Wave 3后 — 部署和验证）:
├── Task 17: Vercel部署配置 [quick]
├── Task 18: E2E QA测试 [unspecified-high]
├── Task 19: 最终审查和清理 [quick]
└── Task 20: 文档和交付 [writing]

关键路径：Task 1-6 → Task 7-12 → Task 13-16 → Task 17-20
并行加速：比顺序执行快约60%
最大并发：6（Wave 1-2）
```

### 依赖矩阵（完整）

- **1-6**: — — 7-16, 1
- **7**: 1, 5 — 13, 2
- **8**: 1, 5 — 13, 2
- **9**: 1, 5 — 13, 2
- **10**: 1, 5 — 13, 2
- **11**: 1, 5 — 13, 2
- **12**: 1, 5 — 13, 2
- **13**: 5-12 — 14-16, 3
- **14**: 13 — 15-20, 4
- **15**: 14 — 16-20, 4
- **16**: 15 — 17-20, 4
- **17**: 16 — 18-20, 4
- **18**: 17 — 19-20, 4
- **19**: 18 — 20, 4
- **20**: 19 — — 5

> 这是完整矩阵，用于参考。

### 代理调度摘要

- **1**: **6** — T1-T4 → `quick`, T5-T6 → `visual-engineering`
- **2**: **6** — T7-T12 → `visual-engineering`
- **3**: **4** — T13-T14 → `visual-engineering`, T15 → `unspecified-high`, T16 → `quick`
- **4**: **4** — T17 → `quick`, T18 → `unspecified-high`, T19 → `quick`, T20 → `writing`

---

## TODOs

- [x] 1. 创建JSON数据文件和TypeScript类型定义

  **做什么**：
  - 在 `src/data/resume.json` 创建简历数据文件，包含个人信息、教育、技能、经历、项目等所有字段
  - **预留5个项目空位**：在projects数组中预留5个空对象 `{}`，方便用户后续添加新项目
  - 在 `src/types/resume.ts` 创建TypeScript接口定义，确保类型安全
  - 验证JSON数据符合TypeScript类型定义

  **必须不做**：
  - 不创建空的或占位符数据 — 使用真实简历内容（除预留项目位外）
  - 不添加超出schema定义的额外字段

  **推荐代理配置**：
  > 选择category + skills基于任务领域。证明每个选择。
  - **Category**: `quick`
    - 原因：数据定义任务，快速完成，不需要复杂决策
  - **Skills**: []
    - 无需特殊技能
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: 数据定义不需要设计技能

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 1 (with Tasks 2, 3, 4, 5, 6)
  - **阻塞**: Tasks 7-12
  - **被阻塞**: None（可立即开始）

  **引用**（关键 — 要详尽）：

  > 执行者没有来自你访谈的上下文。引用是他们唯一的指南。
  > 每个引用必须回答："我应该看什么以及为什么？"

  **模式引用**（现有代码遵循）：
  - `package.json:10-23` — 项目依赖配置，确认技术栈
  - `tsconfig.json:21-23` — TypeScript路径配置，了解路径别名
  - `.sisyphus/drafts/resume-website.md` — 包含完整的简历数据和JSON Schema定义（如果draft仍存在）

  **API/类型引用**（实现契约）：
  - Draft中的JSON Schema定义 — 必须严格遵循此结构
  - 项目数组需要包含现有2个项目 + 5个预留空位

  **外部引用**（库和框架）：
  - TypeScript handbook: 类型定义最佳实践

  **为什么每个引用重要**：
  - Draft中的schema定义了完整的数据结构，必须1:1实现
  - Draft中的简历内容需要完整填入JSON
  - tsconfig路径配置确保正确的import路径

  **验收标准**：

  > **仅代理可执行验证** — 不允许人工操作。
  > 每个标准必须通过运行命令或使用工具验证。

  - [ ] 文件创建：`src/data/resume.json` 存在
  - [ ] 文件创建：`src/types/resume.ts` 存在
  - [ ] TypeScript类型检查：`npx tsc --noEmit` → PASS（无错误）
  - [ ] JSON格式验证：文件包含所有必需字段（personal, education, skills, experience, projects）
  - [ ] 项目预留验证：projects数组包含7个元素（2个真实项目 + 5个预留空位）

  **QA场景（强制 — 没有这些任务不完整）**：

  > **这不是可选的。没有QA场景的任务将被拒绝。**
  >
  > 编写验证你构建内容的实际行为的场景测试。
  > 最少：每个任务1个快乐路径 + 1个失败/边缘情况。
  > 每个场景 = 确切工具 + 确切步骤 + 确切断言 + 证据路径。
  >
  > **执行代理必须在实现后运行这些场景。**
  > **编排器将在标记任务完成前验证证据文件存在。**

  ```
  场景：JSON数据结构正确加载
    工具：Bash
    前置条件：resume.json文件存在
    步骤：
      1. cat src/data/resume.json | python -m json.tool > /dev/null
      2. echo "JSON is valid"
    预期结果：输出"JSON is valid"，无错误
    失败指示：JSON解析错误
    证据：.sisyphus/evidence/task-1-json-valid.txt

  场景：TypeScript类型与JSON匹配
    工具：Bash
    前置条件：resume.ts和resume.json都存在
    步骤：
      1. npx tsc --noEmit
      2. echo "Type check passed"
    预期结果：无TypeScript错误，输出"Type check passed"
    失败指示：类型错误输出
    证据：.sisyphus/evidence/task-1-typecheck.txt
  ```

  **证据捕获**：
  - [ ] 每个证据文件命名：task-{N}-{scenario-slug}.{ext}
  - [ ] UI用截图，CLI用终端输出，API用响应体

  **提交**: NO（与Task 2-6组一起提交）

- [ ] 2. 初始化shadcn/ui组件库

  **做什么**：
  - 运行 `npx shadcn@latest init` 初始化shadcn/ui
  - 选择默认配置：Default style、CSS variables、Tailwind CSS
  - 安装常用组件：Button、Card、Badge、Avatar、Separator
  - 配置 `components.json` 确保与Next.js 16兼容
  - 更新 `src/app/globals.css` 包含shadcn的CSS变量

  **必须不做**：
  - 不安装所有组件（只安装需要的）
  - 不自定义主题颜色（使用默认）
  - 不修改shadcn组件源码

  **推荐代理配置**：
  - **Category**: `quick`
    - 原因：shadcn初始化是标准CLI流程
  - **Skills**: []
    - 无需特殊技能

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 1 (with Tasks 1, 3, 4, 5, 6)
  - **阻塞**: Tasks 7-12
  - **被阻塞**: None

  **引用**：
  **外部引用**：
  - shadcn/ui installation: https://ui.shadcn.com/docs/installation/next
  - shadcn/ui components: https://ui.shadcn.com/docs/components

  **验收标准**：
  - [ ] `components.json` 文件存在
  - [ ] `src/components/ui/button.tsx` 存在
  - [ ] `src/components/ui/card.tsx` 存在
  - [ ] `src/components/ui/badge.tsx` 存在
  - [ ] `src/lib/utils.ts` 存在
  - [ ] globals.css 包含shadcn CSS变量

  **QA场景**：
  ```
  场景：shadcn组件可正常导入使用
    工具：Bash
    前置条件：shadcn已初始化
    步骤：
      1. ls src/components/ui/
    预期结果：看到button.tsx, card.tsx, badge.tsx等文件
    失败指示：组件文件不存在
    证据：.sisyphus/evidence/task-2-shadcn-init.txt
  ```

  **提交**: NO（与Task 1, 3-6组一起提交）

- [ ] 3. 配置Next.js静态导出和Tailwind主题

  **做什么**：
  - 在 `next.config.ts` 添加 `output: 'export'` 配置用于静态导出
  - 在 `tailwind.config.ts` 配置亮暗主题色彩变量
  - 更新 `src/app/globals.css` 添加CSS变量定义
  - 确保Next.js 16兼容性

  **必须不做**：
  - 不添加server-side rendering配置
  - 不配置API routes
  - 不添加超出主题所需的额外Tailwind插件

  **推荐代理配置**：
  - **Category**: `quick`
    - 原因：配置任务，标准Next.js模式
  - **Skills**: []
    - 无需特殊技能

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 1 (with Tasks 1, 2, 4, 5, 6)
  - **阻塞**: None
  - **被阻塞**: None

  **引用**：
  **模式引用**：
  - `next.config.ts` — 当前配置文件，需要添加output选项
  - `src/app/globals.css` — 当前全局样式，需要添加CSS变量

  **外部引用**：
  - Next.js 16 static export docs: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  - Tailwind CSS v4 theming: https://tailwindcss.com/docs/theming

  **验收标准**：
  - [ ] `next.config.ts` 包含 `output: 'export'`
  - [ ] `tailwind.config.ts` 包含亮暗主题配置
  - [ ] `src/app/globals.css` 包含CSS变量定义
  - [ ] 构建成功：`npm run build` → PASS

  **QA场景**：
  ```
  场景：静态导出配置正确
    工具：Bash
    前置条件：next.config.ts已更新
    步骤：
      1. npm run build
      2. ls -la out/index.html
    预期结果：out目录存在且包含index.html
    失败指示：构建失败或out目录不存在
    证据：.sisyphus/evidence/task-3-static-export.txt
  ```

  **提交**: NO（与Task 1-2, 4-6组一起提交）

- [ ] 4. 安装和配置动画库

  **做什么**：
  - 安装 `framer-motion` 和 `gsap` 包
  - 创建 `src/lib/animations.ts` 动画配置文件，定义常用动画变体
  - 创建 `src/hooks/useScrollAnimation.ts` 自定义hook，处理滚动进入动画
  - 测试动画库是否正常工作

  **必须不做**：
  - 不创建过于复杂的动画配置
  - 不在配置文件中引入副作用
  - 不配置全局动画状态管理

  **推荐代理配置**：
  - **Category**: `quick`
    - 原因：库安装和基础配置是标准流程
  - **Skills**: []
    - 无需特殊技能

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 1 (with Tasks 1, 2, 4, 5, 6)
  - **阻塞**: Tasks 7-12
  - **被阻塞**: None

  **引用**：
  **外部引用**：
  - Framer Motion docs: https://www.framer.com/motion/
  - GSAP docs: https://greensock.com/docs/
  - Framer Motion scroll animations: https://www.framer.com/motion/scroll-animations/

  **验收标准**：
  - [ ] `framer-motion` 包已安装
  - [ ] `gsap` 包已安装
  - [ ] `src/lib/animations.ts` 存在
  - [ ] `src/hooks/useScrollAnimation.ts` 存在

  **QA场景**：
  ```
  场景：动画库安装成功
    工具：Bash
    前置条件：package.json已更新
    步骤：
      1. npm list framer-motion gsap
    预期结果：两个包都显示已安装
    失败指示：包未安装
    证据：.sisyphus/evidence/task-4-animation-libs.txt
  ```

  **提交**: NO（与Task 1-3, 5-6组一起提交）

- [ ] 5. 实现主题切换系统

  **做什么**：
  - 安装 `next-themes` 包
  - 创建 `src/components/ThemeProvider.tsx` 组件
  - 创建 `src/components/ThemeToggle.tsx` 切换按钮组件
  - 在 `src/app/layout.tsx` 集成ThemeProvider
  - 实现localStorage持久化和系统主题fallback

  **必须不做**：
  - 不使用其他主题库（仅next-themes）
  - 不添加复杂动画（仅Tailwind过渡）
  - 不创建多个主题（仅亮/暗两种）

  **推荐代理配置**：
  - **Category**: `quick`
    - 原因：标准模式，next-themes是推荐方案
  - **Skills**: []
    - 无需特殊技能

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 1 (with Tasks 1, 2, 3, 4, 6)
  - **阻塞**: Tasks 7-12
  - **被阻塞**: None

  **引用**：
  **外部引用**：
  - next-themes docs: https://github.com/pacocoursey/next-themes
  - Next.js App Router integration: https://github.com/pacocoursey/next-themes#with-app

  **验收标准**：
  - [ ] `next-themes` 包已安装
  - [ ] `src/components/ThemeProvider.tsx` 存在
  - [ ] `src/components/ThemeToggle.tsx` 存在
  - [ ] 主题切换按钮可点击并切换主题
  - [ ] 主题偏好持久化到localStorage

  **QA场景**：
  ```
  场景：主题切换工作正常
    工具：Playwright
    前置条件：页面已加载，主题为light
    步骤：
      1. page.goto('http://localhost:3000')
      2. expect(page.locator('html')).toHaveAttribute('class', /light/)
      3. page.click('[data-testid="theme-toggle"]')
      4. expect(page.locator('html')).toHaveAttribute('class', /dark/)
      5. page.reload()
      6. expect(page.locator('html')).toHaveAttribute('class', /dark/)
    预期结果：主题切换并持久化
    失败指示：主题未切换或未持久化
    证据：.sisyphus/evidence/task-5-theme-toggle.png
  ```

  **提交**: NO（与Task 1-4, 6组一起提交）

- [ ] 6. 创建导航组件（含平滑滚动动画）

  **做什么**：
  - 创建 `src/components/Navigation.tsx` 固定导航组件
  - 使用GSAP或Framer Motion实现平滑滚动导航
  - 在导航中集成ThemeToggle按钮（含切换动画）
  - 使用shadcn/ui的Button组件
  - 添加移动端响应式菜单（汉堡菜单）
  - 实现滚动时导航栏背景变化效果（使用动画）

  **必须不做**：
  - 不创建多级导航（单层即可）
  - 不添加搜索功能

  **推荐代理配置**：
  - **Category**: `visual-engineering`
    - 原因：导航是关键UI组件，需要良好的交互设计
  - **Skills**: [`frontend-design`]
    - `frontend-design`: 导航需要简洁现代的设计和良好的UX

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 1 (with Tasks 1, 2, 3, 4, 5)
  - **阻塞**: Tasks 13
  - **被阻塞**: None

  **引用**：
  **模式引用**：
  - `src/components/ui/button.tsx` — shadcn Button组件
  - `src/lib/animations.ts` — 动画配置

  **外部引用**：
  - shadcn/ui Button: https://ui.shadcn.com/docs/components/button
  - GSAP ScrollTo: https://greensock.com/docs/v3/Plugins/ScrollToPlugin

  **验收标准**：
  - [ ] `src/components/Navigation.tsx` 存在
  - [ ] 导航包含所有主要区域链接
  - [ ] 点击导航链接平滑滚动到对应区域
  - [ ] 导航栏在滚动时有背景变化
  - [ ] 移动端有汉堡菜单

  **QA场景**：
  ```
  场景：导航平滑滚动工作正常
    工具：Playwright
    前置条件：页面已加载
    步骤：
      1. page.goto('http://localhost:3000')
      2. page.click('a[href="#skills"]')
      3. page.waitForTimeout(1000)
      4. const skillsSection = page.locator('#skills')
      5. expect(skillsSection).toBeInViewport()
    预期结果：平滑滚动到技能区域
    失败指示：未滚动或瞬间跳转
    证据：.sisyphus/evidence/task-5-navigation-scroll.png
  ```

  **提交**: YES（Wave 1完成）
  - Message: `feat: setup project infrastructure with shadcn/ui and animations`
  - Files: `src/data/resume.json`, `src/types/resume.ts`, `components.json`, `src/components/ui/*`, `src/lib/utils.ts`, `next.config.ts`, `tailwind.config.ts`, `src/app/globals.css`, `src/lib/animations.ts`, `src/hooks/useScrollAnimation.ts`, `src/components/ThemeProvider.tsx`, `src/components/ThemeToggle.tsx`, `src/components/Navigation.tsx`
  - Pre-commit: `npm run build`

- [ ] 7. Hero区域组件（含滚动进入动画）

  **做什么**：
  - 创建 `src/components/Hero.tsx` 个人介绍区域
  - 显示个人照片、姓名、职位、简介
  - 添加联系方式快速链接（邮箱、电话、网站）
  - 实现响应式布局（移动端垂直，桌面端水平）
  - 个人照片使用 `public/avatar.jpg`（用户需准备此文件）

  **必须不做**：
  - 不添加复杂的动画效果
  - 不使用过度装饰的背景
  - 不创建滑块或轮播

  **推荐代理配置**：
  - **Category**: `visual-engineering`
    - 原因：Hero是首屏关键区域，需要强烈的视觉吸引力
  - **Skills**: [`frontend-design`]
    - `frontend-design`: 需要现代简洁的设计，突出个人信息

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 2 (with Tasks 8, 9, 10, 11, 12)
  - **阻塞**: Task 13
  - **被阻塞**: Tasks 1, 5

  **引用**：
  **数据引用**：
  - `src/data/resume.json:personal` — 个人信息数据
  - `public/avatar.jpg` — 个人照片（需要用户准备）

  **验收标准**：
  - [ ] `src/components/Hero.tsx` 存在
  - [ ] 显示个人照片、姓名、职位
  - [ ] 联系方式链接可点击
  - [ ] 响应式布局正确

  **QA场景**：
  ```
  场景：Hero区域正确渲染
    工具：Playwright
    前置条件：页面已加载
    步骤：
      1. page.goto('http://localhost:3000')
      2. const hero = page.locator('[data-testid="hero"]')
      3. expect(hero).toBeVisible()
      4. expect(hero.locator('h1')).toContainText('孙燚峰')
      5. expect(hero.locator('img')).toBeVisible()
    预期结果：Hero区域完整渲染
    失败指示：信息缺失或布局错乱
    证据：.sisyphus/evidence/task-7-hero.png
  ```

  **提交**: NO（与Wave 2组一起提交）

- [ ] 8. 技能区域组件（含滚动进入动画）

  **做什么**：
  - 创建 `src/components/Skills.tsx` 技能展示区域
  - 按5个类别分组展示（前端框架、后端框架、开发语言、数据库/中间件、LLM框架）
  - 每个技能显示名称和熟练度标签（熟悉/了解）
  - 实现标签式布局，支持换行

  **必须不做**：
  - 不添加技能进度条或百分比
  - 不实现技能筛选或搜索
  - 不使用图标库（文字标签即可）

  **推荐代理配置**：
  - **Category**: `visual-engineering`
    - 原因：技能展示需要清晰的视觉层次
  - **Skills**: [`frontend-design`]
    - `frontend-design`: 需要简洁的标签设计

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 2 (with Tasks 7, 9, 10, 11, 12)
  - **阻塞**: Task 13
  - **被阻塞**: Tasks 1, 5

  **引用**：
  **数据引用**：
  - `src/data/resume.json:skills` — 技能数据，按类别分组

  **验收标准**：
  - [ ] `src/components/Skills.tsx` 存在
  - [ ] 5个技能类别都正确显示
  - [ ] 技能标签布局正确（移动端换行）
  - [ ] 熟练度标签正确显示

  **QA场景**：
  ```
  场景：技能分类正确显示
    工具：Playwright
    前置条件：页面已加载
    步骤：
      1. page.goto('http://localhost:3000')
      2. page.click('a[href="#skills"]')
      3. const skills = page.locator('#skills')
      4. expect(skills.locator('text=前端框架')).toBeVisible()
      5. expect(skills.locator('text=Vue')).toBeVisible()
    预期结果：技能按类别正确分组
    失败指示：分类缺失或技能错位
    证据：.sisyphus/evidence/task-8-skills.png
  ```

  **提交**: NO（与Wave 2组一起提交）

- [ ] 9. 教育背景组件（含滚动进入动画）

  **做什么**：
  - 创建 `src/components/Education.tsx` 教育经历区域
  - 显示学校名称、专业、学历、时间、GPA
  - 使用时间线样式布局
  - 支持多段教育经历（数组渲染）

  **必须不做**：
  - 不添加教育成就或奖项字段
  - 不创建复杂的时间线图形
  - 不实现教育经历筛选

  **推荐代理配置**：
  - **Category**: `visual-engineering`
    - 原因：时间线布局需要清晰的设计
  - **Skills**: [`frontend-design`]
    - `frontend-design`: 需要简洁的时间线设计

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 2 (with Tasks 7, 8, 10, 11, 12)
  - **阻塞**: Task 13
  - **被阻塞**: Tasks 1, 5

  **引用**：
  **数据引用**：
  - `src/data/resume.json:education` — 教育数据

  **验收标准**：
  - [ ] `src/components/Education.tsx` 存在
  - [ ] 学校、专业、学历、时间正确显示
  - [ ] GPA正确显示
  - [ ] 时间线布局清晰

  **QA场景**：
  ```
  场景：教育信息正确显示
    工具：Playwright
    前置条件：页面已加载
    步骤：
      1. page.goto('http://localhost:3000')
      2. page.click('a[href="#education"]')
      3. const edu = page.locator('#education')
      4. expect(edu.locator('text=河南理工大学')).toBeVisible()
      5. expect(edu.locator('text=数据科学与大数据技术')).toBeVisible()
    预期结果：教育信息完整显示
    失败指示：信息缺失
    证据：.sisyphus/evidence/task-9-education.png
  ```

  **提交**: NO（与Wave 2组一起提交）

- [ ] 10. 实习经历组件（含滚动进入动画）

  **做什么**：
  - 创建 `src/components/Experience.tsx` 工作经历区域
  - 显示公司名称、职位、时间、职责描述
  - 使用卡片式布局
  - 支持多段经历（数组渲染）

  **必须不做**：
  - 不添加公司logo或图片
  - 不实现经历筛选或排序
  - 不添加推荐信或评价字段

  **推荐代理配置**：
  - **Category**: `visual-engineering`
    - 原因：经历展示需要专业的设计
  - **Skills**: [`frontend-design`]
    - `frontend-design`: 需要清晰的卡片布局

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 2 (with Tasks 7, 8, 9, 11, 12)
  - **阻塞**: Task 13
  - **被阻塞**: Tasks 1, 5

  **引用**：
  **数据引用**：
  - `src/data/resume.json:experience` — 工作经历数据

  **验收标准**：
  - [ ] `src/components/Experience.tsx` 存在
  - [ ] 公司、职位、时间正确显示
  - [ ] 职责描述正确显示
  - [ ] 卡片布局清晰

  **QA场景**：
  ```
  场景：实习经历正确显示
    工具：Playwright
    前置条件：页面已加载
    步骤：
      1. page.goto('http://localhost:3000')
      2. page.click('a[href="#experience"]')
      3. const exp = page.locator('#experience')
      4. expect(exp.locator('text=河南省爱普尔信息科技有限公司')).toBeVisible()
      5. expect(exp.locator('text=前端开发')).toBeVisible()
    预期结果：实习经历完整显示
    失败指示：信息缺失
    证据：.sisyphus/evidence/task-10-experience.png
  ```

  **提交**: NO（与Wave 2组一起提交）

- [ ] 11. 项目经验组件（含滚动进入和交互动画）

  **做什么**：
  - 创建 `src/components/Projects.tsx` 项目展示区域
  - 显示项目名称、时间、简介、技术栈、GitHub链接、演示链接
  - 使用卡片式布局，支持多项目（数组渲染）
  - 技术栈使用标签展示
  - **过滤空项目**：只渲染有title的项目，跳过预留的空对象
  - 预留的空项目不会在界面上显示，用户填入数据后自动显示

  **必须不做**：
  - 不添加项目截图或图片
  - 不实现项目筛选或排序
  - 不添加项目详情页（卡片信息即可）
  - 不显示空项目占位符（直接过滤掉）

  **推荐代理配置**：
  - **Category**: `visual-engineering`
    - 原因：项目展示是核心区域，需要突出技术栈
  - **Skills**: [`frontend-design`]
    - `frontend-design`: 需要现代的卡片设计和清晰的层次

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 2 (with Tasks 7, 8, 9, 10, 12)
  - **阻塞**: Task 13
  - **被阻塞**: Tasks 1, 5

  **引用**：
  **数据引用**：
  - `src/data/resume.json:projects` — 项目数据（含预留空位）

  **验收标准**：
  - [ ] `src/components/Projects.tsx` 存在
  - [ ] 有内容的项目正确显示（名称、时间、简介、技术栈）
  - [ ] 技术栈标签正确显示
  - [ ] GitHub和演示链接可点击
  - [ ] 空项目对象被过滤，不显示占位符

  **QA场景**：
  ```
  场景：项目信息正确显示，空项目被过滤
    工具：Playwright
    前置条件：页面已加载
    步骤：
      1. page.goto('http://localhost:3000')
      2. page.click('a[href="#projects"]')
      3. const projects = page.locator('#projects')
      4. expect(projects.locator('text=英语学习')).toBeVisible()
      5. expect(projects.locator('a[href*="github.com"]')).toBeVisible()
      6. const cards = projects.locator('[data-testid="project-card"]')
      7. expect(await cards.count()).toBe(2)
    预期结果：只显示2个有内容的项目，空项目被过滤
    失败指示：显示空项目卡片或项目数量不对
    证据：.sisyphus/evidence/task-11-projects.png
  ```

  **提交**: NO（与Wave 2组一起提交）

- [ ] 12. 联系方式组件（含滚动进入动画）

  **做什么**：
  - 创建 `src/components/Contact.tsx` 联系区域
  - 显示邮箱、电话、地址、个人网站
  - 添加可点击的链接（mailto:, tel:）
  - 简洁的图标+文字布局

  **必须不做**：
  - 不添加联系表单
  - 不添加社交媒体图标（除非用户主动提供）
  - 不添加地图或位置服务

  **推荐代理配置**：
  - **Category**: `visual-engineering`
    - 原因：联系区域需要清晰的视觉层次
  - **Skills**: [`frontend-design`]
    - `frontend-design`: 需要简洁的联系信息展示

  **并行化**：
  - **可并行运行**: YES
  - **并行组**: Wave 2 (with Tasks 7, 8, 9, 10, 11)
  - **阻塞**: Task 13
  - **被阻塞**: Tasks 1, 5

  **引用**：
  **数据引用**：
  - `src/data/resume.json:personal` — 联系方式数据

  **验收标准**：
  - [ ] `src/components/Contact.tsx` 存在
  - [ ] 邮箱、电话、地址、网站正确显示
  - [ ] 邮箱链接可点击（mailto:）
  - [ ] 电话链接可点击（tel:）

  **QA场景**：
  ```
  场景：联系方式正确显示
    工具：Playwright
    前置条件：页面已加载
    步骤：
      1. page.goto('http://localhost:3000')
      2. page.click('a[href="#contact"]')
      3. const contact = page.locator('#contact')
      4. expect(contact.locator('a[href^="mailto:"]')).toBeVisible()
      5. expect(contact.locator('a[href^="tel:"]')).toBeVisible()
    预期结果：联系方式完整显示，链接可点击
    失败指示：信息缺失或链接无效
    证据：.sisyphus/evidence/task-12-contact.png
  ```

  **提交**: YES（Wave 2完成）
  - Message: `feat: add resume sections`
  - Files: `src/components/Hero.tsx`, `src/components/Skills.tsx`, `src/components/Education.tsx`, `src/components/Experience.tsx`, `src/components/Projects.tsx`, `src/components/Contact.tsx`, `src/app/page.tsx`
  - Pre-commit: `npm run build`

- [ ] 13. 主页面集成和布局

  **做什么**：
  - 更新 `src/app/page.tsx` 集成所有组件
  - 按顺序排列：Hero → Skills → Education → Experience → Projects → Contact
  - 确保所有区域有正确的id用于锚点导航
  - 添加平滑滚动行为

  **必须不做**：
  - 不添加额外的装饰元素
  - 不改变组件顺序
  - 不添加未计划的区域

  **推荐代理配置**：
  - **Category**: `visual-engineering`
    - 原因：整体布局需要协调各组件
  - **Skills**: [`frontend-design`]
    - `frontend-design`: 需要整体的视觉协调

  **并行化**：
  - **可并行运行**: NO
  - **并行组**: Sequential (Wave 3 first task)
  - **阻塞**: Tasks 14-16
  - **被阻塞**: Tasks 5-12

  **引用**：
  **模式引用**：
  - `src/components/*.tsx` — 所有已创建的组件

  **验收标准**：
  - [ ] 所有6个区域正确渲染
  - [ ] 区域顺序正确
  - [ ] 锚点导航工作正常
  - [ ] 平滑滚动生效

  **QA场景**：
  ```
  场景：所有区域正确渲染
    工具：Playwright
    前置条件：页面已加载
    步骤：
      1. page.goto('http://localhost:3000')
      2. expect(page.locator('#hero')).toBeVisible()
      3. expect(page.locator('#skills')).toBeVisible()
      4. expect(page.locator('#education')).toBeVisible()
      5. expect(page.locator('#experience')).toBeVisible()
      6. expect(page.locator('#projects')).toBeVisible()
      7. expect(page.locator('#contact')).toBeVisible()
    预期结果：所有6个区域都可见
    失败指示：区域缺失
    证据：.sisyphus/evidence/task-13-all-sections.png
  ```

  **提交**: NO（与Wave 3组一起提交）

- [ ] 14. 响应式设计调整

  **做什么**：
  - 测试所有组件在移动端（375px）、平板（768px）、桌面（1024px、1920px）的显示
  - 调整布局问题：换行、间距、字体大小
  - 确保导航在移动端显示汉堡菜单
  - 验证所有内容无横向滚动

  **必须不做**：
  - 不添加新的响应式断点（使用Tailwind默认）
  - 不为每个断点单独设计（保持一致性）
  - 不使用媒体查询覆盖Tailwind

  **推荐代理配置**：
  - **Category**: `visual-engineering`
    - 原因：响应式调整需要细致的视觉测试
  - **Skills**: [`frontend-design`]
    - `frontend-design`: 需要跨设备的视觉优化

  **并行化**：
  - **可并行运行**: NO
  - **并行组**: Sequential (Wave 3)
  - **阻塞**: Tasks 14-15
  - **被阻塞**: Task 12

  **引用**：
  **外部引用**：
  - Tailwind CSS responsive design: https://tailwindcss.com/docs/responsive-design

  **验收标准**：
  - [ ] 375px无横向滚动
  - [ ] 768px布局正常
  - [ ] 1024px布局正常
  - [ ] 1920px布局正常
  - [ ] 移动端汉堡菜单工作正常

  **QA场景**：
  ```
  场景：移动端无横向滚动
    工具：Playwright
    前置条件：页面已加载
    步骤：
      1. page.setViewportSize({ width: 375, height: 667 })
      2. page.goto('http://localhost:3000')
      3. const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      4. const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      5. expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
    预期结果：无横向滚动
    失败指示：scrollWidth > clientWidth
    证据：.sisyphus/evidence/task-14-mobile-no-scroll.png
  ```

  **提交**: NO（与Wave 3组一起提交）

- [ ] 15. 可访问性检查和修复

  **做什么**：
  - 使用语义化HTML标签（header, main, section, footer, nav, article）
  - 添加必要的alt属性
  - 确保键盘导航可用（Tab键）
  - 检查颜色对比度
  - 添加适当的ARIA标签（如需要）

  **必须不做**：
  - 不追求完整的WCAG AA合规（基本语义即可）
  - 不添加复杂的ARIA属性
  - 不使用accessibility库

  **推荐代理配置**：
  - **Category**: `unspecified-high`
    - 原因：可访问性检查需要细致的工作
  - **Skills**: []
    - 无需特殊技能

  **并行化**：
  - **可并行运行**: NO
  - **并行组**: Sequential (Wave 3)
  - **阻塞**: Task 15
  - **被阻塞**: Task 13

  **引用**：
  **外部引用**：
  - MDN Accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility

  **验收标准**：
  - [ ] 使用语义化HTML标签
  - [ ] 图片有alt属性
  - [ ] 链接可键盘访问
  - [ ] 颜色对比度足够

  **QA场景**：
  ```
  场景：键盘导航可用
    工具：Playwright
    前置条件：页面已加载
    步骤：
      1. page.goto('http://localhost:3000')
      2. await page.keyboard.press('Tab')
      3. const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
      4. expect(['A', 'BUTTON']).toContain(focusedElement)
    预期结果：Tab键可聚焦到交互元素
    失败指示：无法聚焦
    证据：.sisyphus/evidence/task-15-keyboard-nav.png
  ```

  **提交**: NO（与Wave 3组一起提交）

- [ ] 16. 性能优化和构建测试

  **做什么**：
  - 运行 `npm run build` 确保构建成功
  - 检查构建输出大小
  - 验证静态导出生成正确（out目录）
  - 优化图片大小（如有需要）

  **必须不做**：
  - 不添加复杂的性能优化策略
  - 不配置CDN
  - 不使用图片优化库（保持简单）

  **推荐代理配置**：
  - **Category**: `quick`
    - 原因：构建测试是标准流程
  - **Skills**: []
    - 无需特殊技能

  **并行化**：
  - **可并行运行**: NO
  - **并行组**: Sequential (Wave 3)
  - **阻塞**: Tasks 16-19
  - **被阻塞**: Task 14

  **引用**：
  **模式引用**：
  - `package.json:6-8` — 构建脚本

  **验收标准**：
  - [ ] `npm run build` 成功
  - [ ] out目录存在且包含所有文件
  - [ ] 无构建警告或错误

  **QA场景**：
  ```
  场景：构建成功
    工具：Bash
    前置条件：所有代码已就绪
    步骤：
      1. npm run build
      2. ls -la out/
    预期结果：构建成功，out目录包含index.html等文件
    失败指示：构建失败或out目录不存在
    证据：.sisyphus/evidence/task-16-build-success.txt
  ```

  **提交**: YES（Wave 3完成）
  - Message: `feat: integrate and optimize layout`
  - Files: 所有修改的文件
  - Pre-commit: `npm run build`

- [ ] 17. Vercel部署配置

  **做什么**：
  - 创建 `vercel.json` 配置文件（如需要）
  - 确保静态导出配置正确
  - 准备部署指南文档
  - 提供手动部署步骤

  **必须不做**：
  - 不自动部署（提供手动步骤）
  - 不配置自定义域名（除非用户要求）
  - 不添加环境变量

  **推荐代理配置**：
  - **Category**: `quick`
    - 原因：部署配置是标准流程
  - **Skills**: []
    - 无需特殊技能

  **并行化**：
  - **可并行运行**: NO
  - **并行组**: Sequential (Wave 4)
  - **阻塞**: Tasks 17-19
  - **被阻塞**: Task 15

  **引用**：
  **外部引用**：
  - Vercel deployment docs: https://vercel.com/docs/deployments/overview

  **验收标准**：
  - [ ] 部署配置正确
  - [ ] 部署指南清晰

  **QA场景**：
  ```
  场景：部署配置正确
    工具：Bash
    前置条件：vercel.json已创建（如需要）
    步骤：
      1. cat vercel.json 2>/dev/null || echo "No vercel.json needed for static export"
    预期结果：配置正确或不需要配置
    失败指示：配置错误
    证据：.sisyphus/evidence/task-17-deploy-config.txt
  ```

  **提交**: NO（与Wave 4组一起提交）

- [ ] 18. E2E QA测试

  **做什么**：
  - 执行所有QA场景并捕获证据
  - 测试完整用户流程：导航 → 查看各区域 → 主题切换
  - 测试边缘情况：空数据处理
  - 截图记录最终效果

  **必须不做**：
  - 不编写自动化测试代码（手动执行QA）
  - 不使用测试框架（Playwright仅用于验证）
  - 不创建测试套件

  **推荐代理配置**：
  - **Category**: `unspecified-high`
    - 原因：QA测试需要细致的验证
  - **Skills**: []
    - 无需特殊技能

  **并行化**：
  - **可并行运行**: NO
  - **并行组**: Sequential (Wave 4)
  - **阻塞**: Tasks 18-19
  - **被阻塞**: Task 16

  **引用**：
  **模式引用**：
  - 所有任务的QA场景

  **验收标准**：
  - [ ] 所有QA场景通过
  - [ ] 证据文件完整
  - [ ] 无严重问题

  **QA场景**：
  ```
  场景：完整用户流程测试
    工具：Playwright
    前置条件：开发服务器运行
    步骤：
      1. page.goto('http://localhost:3000')
      2. 验证Hero区域显示
      3. 点击导航到Skills区域
      4. 切换主题
      5. 验证主题持久化
      6. 检查所有区域可见
    预期结果：所有流程正常
    失败指示：任何步骤失败
    证据：.sisyphus/evidence/task-18-e2e-test.png
  ```

  **提交**: NO（与Wave 4组一起提交）

- [ ] 19. 最终审查和清理

  **做什么**：
  - 审查代码质量：无console.log、无注释代码、无未使用导入
  - 检查类型安全：无any类型、无@ts-ignore
  - 清理临时文件
  - 验证git状态干净

  **必须不做**：
  - 不重构已完成的功能
  - 不添加新功能
  - 不改变设计

  **推荐代理配置**：
  - **Category**: `quick`
    - 原因：代码审查是标准流程
  - **Skills**: []
    - 无需特殊技能

  **并行化**：
  - **可并行运行**: NO
  - **并行组**: Sequential (Wave 4)
  - **阻塞**: Task 19
  - **被阻塞**: Task 17

  **引用**：
  **模式引用**：
  - 所有源代码文件

  **验收标准**：
  - [ ] 无console.log
  - [ ] 无any类型
  - [ ] 无注释代码
  - [ ] 无未使用导入

  **QA场景**：
  ```
  场景：代码质量检查
    工具：Bash
    前置条件：所有代码已就绪
    步骤：
      1. npx tsc --noEmit
      2. grep -r "console.log" src/ || echo "No console.log found"
      3. grep -r "@ts-ignore" src/ || echo "No @ts-ignore found"
    预期结果：无问题
    失败指示：发现问题
    证据：.sisyphus/evidence/task-19-code-quality.txt
  ```

  **提交**: NO（与Wave 4组一起提交）

- [ ] 20. 文档和交付

  **做什么**：
  - 创建 README.md 更新部署说明
  - 创建 `DATA_GUIDE.md` 说明如何更新简历数据
  - 记录项目结构
  - 提供使用指南

  **必须不做**：
  - 不创建过长的文档
  - 不添加技术细节（保持用户友好）
  - 不创建API文档

  **推荐代理配置**：
  - **Category**: `writing`
    - 原因：文档编写需要清晰的写作
  - **Skills**: []
    - 无需特殊技能

  **并行化**：
  - **可并行运行**: NO
  - **并行组**: Sequential (Wave 4)
  - **阻塞**: None
  - **被阻塞**: Task 18

  **引用**：
  **模式引用**：
  - `README.md` — 现有README
  - `src/data/resume.json` — 数据文件结构

  **验收标准**：
  - [ ] README.md 更新完成
  - [ ] DATA_GUIDE.md 创建完成
  - [ ] 部署步骤清晰
  - [ ] 数据更新指南清晰

  **QA场景**：
  ```
  场景：文档完整
    工具：Bash
    前置条件：文档已创建
    步骤：
      1. cat README.md
      2. cat DATA_GUIDE.md
    预期结果：文档内容清晰完整
    失败指示：文档缺失或不清楚
    证据：.sisyphus/evidence/task-20-documentation.txt
  ```

  **提交**: YES（Wave 4完成）
  - Message: `chore: deploy configuration and final review`
  - Files: `README.md`, `DATA_GUIDE.md`, `vercel.json`（如需要）
  - Pre-commit: `npm run build`

## Final Verification Wave（强制 — 所有实现任务后）

> 4个审查代理并行运行。全部必须APPROVE。拒绝 → 修复 → 重新运行。

- [ ] F1. **计划合规审计** — `oracle`
  通读计划。对于每个"必须包含"：验证实现存在（读取文件、curl端点、运行命令）。对于每个"必须不包含"：搜索代码库中的禁止模式 — 如果发现则拒绝并附file:line。检查.sisyphus/evidence/中的证据文件。将交付物与计划对比。
  输出：`必须包含 [N/N] | 必须不包含 [N/N] | 任务 [N/N] | 判决：APPROVE/REJECT`

- [ ] F2. **代码质量审查** — `unspecified-high`
  运行 `tsc --noEmit` + linter + `bun test`。审查所有变更文件：`as any`/`@ts-ignore`、空catch、生产环境console.log、注释代码、未使用导入。检查AI slop：过度注释、过度抽象、通用名称（data/result/item/temp）。
  输出：`构建 [PASS/FAIL] | Lint [PASS/FAIL] | 测试 [N pass/N fail] | 文件 [N clean/N issues] | 判决`

- [ ] F3. **真实手动QA** — `unspecified-high`（+ UI使用`playwright`技能）
  从干净状态开始。执行每个任务的每个QA场景 — 遵循确切步骤、捕获证据。测试跨任务集成（功能协同工作，非隔离）。测试边缘情况：空状态、无效输入、快速操作。保存到 `.sisyphus/evidence/final-qa/`。
  输出：`场景 [N/N pass] | 集成 [N/N] | 边缘情况 [N tested] | 判决`

- [ ] F4. **范围保真度检查** — `deep`
  对于每个任务：读取"做什么"，读取实际diff（git log/diff）。验证1:1 — 规格中的所有内容都已构建（无遗漏），没有构建超出规格的内容（无蔓延）。检查"必须不做"合规性。检测跨任务污染：任务N触碰任务M的文件。标记未说明的变更。
  输出：`任务 [N/N compliant] | 污染 [CLEAN/N issues] | 未说明 [CLEAN/N files] | 判决`

---

## Commit Strategy

- **Wave 1**: `feat: setup project infrastructure with shadcn/ui and animations` — 多文件, npm run build
- **Wave 2**: `feat: add resume sections with scroll animations` — 多文件, npm run build
- **Wave 3**: `feat: integrate and optimize layout` — 多文件, npm run build
- **Wave 4**: `chore: deploy configuration and final review` — 多文件, npm run build

---

## Success Criteria

### 验证命令
```bash
npm run build  # 预期：构建成功，无错误
npm run dev    # 预期：开发服务器启动成功
```

### 最终检查清单
- [ ] 所有"必须包含"存在
- [ ] 所有"必须不包含"缺失
- [ ] 亮暗主题切换工作正常（含动画）
- [ ] shadcn/ui组件正确集成
- [ ] 动画效果流畅（滚动进入、交互、平滑滚动）
- [ ] 响应式设计在所有断点正常
- [ ] JSON数据正确加载
- [ ] 项目预留位可用
- [ ] 成功部署到Vercel