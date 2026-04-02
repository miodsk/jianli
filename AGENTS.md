# Agent Instructions for jianli

This is a Next.js 16 portfolio/resume website project. Agents should follow these guidelines when working in this codebase.

## Project Overview

- **Type**: Next.js 16 with App Router (React 19)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-first configuration, CSS variables for theming)
- **Path Alias**: `@/*` maps to `./src/*`
- **Output**: Static site export (`output: "export"` in next.config.ts)

## Build Commands

```bash
# Development
npm run dev        # Start dev server at http://localhost:3000

# Production
npm run build      # Build static site to /out directory
npm run start      # Start production server (after build)

# No test or lint scripts configured
```

**Note**: There are no test scripts (`vitest`, `jest`, `playwright`, etc.) configured. Any testing implementation would need to be added.

## Code Style Guidelines

### TypeScript

- **Strict mode enabled**: No implicit any, strict null checks, etc.
- **Use explicit types**: Always annotate function parameters and return types
- **Import types explicitly**: `import type { Metadata } from "next"` for type-only imports
- **Avoid `as any`**: Never suppress type errors with type assertions

### Imports

**Order (recommended)**:
1. External packages (next, react, framer-motion, etc.)
2. Radix UI primitives (`@radix-ui/react-*`)
3. Internal aliases (`@/components/*`, `@/lib/*`, `@/hooks/*`, `@/types/*`)
4. Relative imports (`./`, `../`)
5. Type imports separate: `import { type SomeType } from "..."`

**Example**:
```typescript
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Resume } from "@/types/resume";
import "./globals.css";
```

### Component Patterns

- **Named exports**: Use `export function ComponentName()` not default exports for components
- **"use client" directive**: Required for components using client-side hooks (useState, useEffect, useTheme, etc.)
- **forwardRef for DOM manipulation**: Use `React.forwardRef` when component needs to expose DOM ref
- **Display names**: Set `Component.displayName = "ComponentName"` for forwardRef components

**Client Component Example**:
```typescript
"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button aria-label="Toggle theme">...</button>;
  }

  return <button onClick={...}>...</button>;
}
```

### ClassName Utilities

Use `cn()` from `@/lib/utils` for merging Tailwind classes (clsx + tailwind-merge):

```typescript
import { cn } from "@/lib/utils";

// Good
<button className={cn("base-class", condition && "conditional-class", className)} />

// Bad - avoid template literals for complex merging
<button className={`base-class ${condition ? "conditional" : ""}`} />
```

### Variant Components (CVA)

Use `class-variance-authority` (cva) for component variants:

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base-class", {
  variants: {
    variant: { default: "...", outline: "...", ghost: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
```

### File Structure

```
src/
├── app/                    # App Router pages and layouts
│   ├── layout.tsx         # Root layout with ThemeProvider
│   ├── page.tsx           # Home page (composes sections)
│   └── globals.css        # Global styles + CSS variables + @theme
├── components/
│   ├── ui/               # Reusable UI primitives (Button, Avatar, Badge, etc.)
│   ├── sections/          # Page sections (HeroSection, SkillsSection, etc.)
│   ├── Navigation.tsx     # Navigation component
│   ├── ThemeProvider.tsx  # Theme provider wrapper
│   └── ThemeToggle.tsx    # Theme toggle button
├── hooks/                 # Custom React hooks
│   └── useScrollAnimation.ts
├── lib/                   # Utilities and animation presets
│   ├── utils.ts          # cn() utility
│   └── animations.ts     # Framer Motion variants
├── types/                 # TypeScript type definitions
│   └── resume.ts
└── data/                  # Static data (JSON)
    └── resume.json
```

### Naming Conventions

- **Components**: PascalCase (`HeroSection.tsx`, `ThemeToggle.tsx`)
- **Hooks**: camelCase with `use` prefix (`useScrollAnimation.ts`)
- **Utilities**: camelCase (`cn`, `fadeInUp`)
- **Types/Interfaces**: PascalCase (`PersonalInfo`, `Resume`, `ButtonProps`)
- **CSS Variables**: kebab-case (`--background`, `--primary-foreground`)

### Theming (Dark Mode)

- Uses CSS variables defined in `globals.css`
- Dark mode via `class` strategy (adds `.dark` class to `<html>`)
- CSS variables prefixed by category: `--color-*`, `--font-*`, `--radius`
- Access theme values in Tailwind via arbitrary values or CSS variable references

### Animation Patterns

Uses `framer-motion` for scroll-triggered animations:

```typescript
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// In component
const { ref, isInView } = useScrollAnimation({ once: true });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
>
  Content
</motion.div>
```

### React Compiler

This project has **React Compiler (babel-plugin-react-compiler)** enabled. The compiler automatically optimizes components, but:

- Components must follow React rules of hooks (no conditional hook calls)
- "use client" directive still required for client-side interactivity
- The compiler handles memoization and other optimizations automatically

### Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` 16.1.6 | Framework |
| `react` 19.2.3 | UI library |
| `tailwindcss` v4 | Styling |
| `framer-motion` | Animations |
| `@radix-ui/react-*` | Headless UI primitives |
| `class-variance-authority` | Variant handling |
| `lucide-react` | Icons |
| `next-themes` | Dark mode |

## Common Patterns

### Using JSON Data
```typescript
import resumeData from "@/data/resume.json";
const { personal } = resumeData;
```

### Theme-aware Components
```typescript
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Always handle mount state to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Placeholder />;
  return <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>...</button>;
}
```

### Smooth Scroll to Section
```typescript
const scrollToSection = () => {
  const element = document.getElementById("section-id");
  element?.scrollIntoView({ behavior: "smooth" });
};
```

## What NOT to Do

- Do not add ESLint/Prettier configs unless explicitly requested (not currently configured)
- Do not change the path alias `@/*` mapping
- Do not remove `"use client"` directives from interactive components
- Do not use JavaScript `var`, prefer `const` or `let`
- Do not commit directly to main branch (use feature branches)
- Do not use `as any` or `@ts-ignore` to suppress type errors
