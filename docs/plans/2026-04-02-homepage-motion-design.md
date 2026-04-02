# Homepage Motion Design

**Project:** `jianli`
**Date:** 2026-04-02
**Direction:** 方案 2（平衡丰富）

## Goal

在不削弱简历可读性的前提下，为首页建立一套统一、层次更丰富的动效系统。目标不是“到处都会动”，而是让首页在首屏印象、滚动节奏、卡片交互和主题切换上明显更精致、更像作品，而不是模板站。

## Design Principles

1. **内容优先**：动效服务于阅读顺序，不遮挡信息，不制造理解成本。
2. **统一语言**：用一套共享的 reveal、hover、layout、ambient motion 模式替代当前散落的局部写法。
3. **克制但有层次**：首屏更有氛围，滚动更顺，交互更“有手感”，但避免炫技式动画。
4. **移动端安全**：所有核心动效在移动端仍然自然，不依赖 hover 才成立。
5. **尊重 reduced motion**：为系统偏好“减少动态效果”的用户自动降级为更轻的 opacity-only / low-motion 方案。

## Current State

- 首页各 section 已使用 `framer-motion`，但实现比较分散。
- `src/lib/animations.ts` 与 `src/hooks/useScrollAnimation.ts` 基本没有形成真正的统一动画层。
- `HeroSection`、`ProjectsSection`、`ContactSection`、`Navigation` 是最适合提升感知质量的热点位置。
- 仓库中存在 `motion` 包和本地 `src/motion` stub，但当前真正运行的动画仍来自 `framer-motion`。

## Motion System

### 1. Shared Motion Foundation

建立统一的动效基础层，减少 section 内的内联 variants：

- 标准 section reveal（fade + translate）
- stagger 容器与子项 reveal
- 卡片 hover lift / glow / scale
- 导航 active indicator 的 layout 动画
- Hero 的 ambient float / parallax transform

实现上优先迁移到 `motion/react`，并为根部引入 `MotionConfig reducedMotion="user"`。

### 2. Homepage Experience by Section

#### Navigation

- 保留顶部进入动画。
- 增加当前 section 的滑动式 active pill / underline indicator。
- 增加细滚动进度条，作为页面节奏提示。
- 保持移动端菜单开关自然，不引入额外复杂转场。

#### HeroSection

- 新增柔和背景光晕 / radial blur 层，制造首屏氛围。
- 头像增加低频浮动动画，保持“活着”的感觉，但不抢戏。
- 标题、状态 badge、联系信息、CTA 按钮做更统一的 stagger reveal。
- CTA 按钮在 hover / tap 时增加 lift 和轻微 spring 回弹。
- 对背景层使用极轻的 scroll-linked transform，增强层次感。

#### SkillsSection

- 保留 section 级 reveal。
- 技能 badge 从“同时出现”升级为小范围 stagger reveal。
- 卡片 hover 仅做轻量抬升和边框/阴影变化，不做夸张变形。

#### Education / Experience

- 统一 section 标题 reveal 风格。
- 卡片的出现方向统一到共享动画体系里。
- hover 交互轻量补强，让中间内容区不至于过静。

#### ProjectsSection

- 这是重点交互区。
- 项目卡片 hover 增加轻微 scale、shadow 提升、图标位移/着色。
- tech badges 可做轻微延迟进入，形成“内容逐层显现”的感觉。
- GitHub / Demo 链接 hover 增加更明确的触感反馈。

#### ContactSection

- 联系方式卡片增加 hover lift + subtle glow。
- Footer 的 reveal 更晚一点进入，形成页面收束感。
- 联系按钮 hover 动效与 Hero CTA 保持一致。

#### ThemeToggle

- 主题切换按钮加入图标旋转/切换过渡。
- 按钮背景和图标状态变化更有“切换感”，而不是瞬时替换。

## Accessibility & Performance

### Reduced Motion

- 根层统一配置 `MotionConfig reducedMotion="user"`。
- 对会持续运动的元素（如 Hero avatar float、背景视差）在 reduced motion 下关闭或显著弱化。
- 对 scroll-linked 装饰效果降级为静态或 opacity-only。

### Performance Guardrails

- 优先只动画 `transform` 和 `opacity`。
- 避免大面积 blur / filter 的持续高频变化。
- 避免页面加载时的大延迟动画链，保证信息尽快可见。
- 避免影响布局的动画（如 width/height/top/left）。

## Files Likely Affected

- `src/app/layout.tsx`
- `src/components/Navigation.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/SkillsSection.tsx`
- `src/components/sections/EducationSection.tsx`
- `src/components/sections/ExperienceSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/ContactSection.tsx`
- `src/lib/animations.ts`
- `src/hooks/useScrollAnimation.ts` (if retained and upgraded)
- `src/components/MotionProvider.tsx` (new, likely)
- `src/components/ui/SectionHeader.tsx` (new, optional but recommended)

## Verification Plan

Because this repo currently has no dedicated test runner for UI behavior, verification will rely on:

1. `lsp_diagnostics` on all changed TS/TSX files
2. `npm run build`
3. `npm run dev` manual homepage verification
4. Check desktop + mobile layout behavior
5. Check dark/light theme transitions
6. Check reduced motion fallback path

## Non-Goals

- 不做夸张的 typewriter、翻转卡片、重视差、全页切场动画
- 不引入新的大型动画库
- 不为了动效重写页面结构
- 不新增测试框架，仅为这轮视觉升级做必要验证
