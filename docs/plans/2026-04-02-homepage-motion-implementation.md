# Homepage Motion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the homepage motion system so the portfolio feels more polished and layered while preserving readability, performance, and reduced-motion accessibility.

**Architecture:** Consolidate motion into shared utilities and a root motion provider, then enhance the highest-impact homepage sections in a controlled order: navigation, hero, cards, and contact interactions. Keep the implementation focused on transform/opacity-based motion and reuse common patterns instead of scattering new inline variants.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`) patterns, existing UI components

---

## Pre-Implementation Notes

- This repo currently has **no automated test runner** for UI behavior.
- Do **not** add Jest/Vitest/Playwright in this task.
- Verification for each task should use targeted diagnostics plus `npm run build`, then final manual QA in `npm run dev`.
- Prefer the smallest visually meaningful change set that delivers the approved “balanced richness” direction.

### Task 1: Create the shared motion foundation

**Files:**
- Create: `src/components/MotionProvider.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/lib/animations.ts`

**Step 1: Add root reduced-motion support**

Create a client `MotionProvider` wrapping children with Motion config for user reduced-motion preference.

**Step 2: Wire provider into layout**

Wrap the existing app content in `src/app/layout.tsx` without changing theme behavior.

**Step 3: Consolidate animation presets**

Extend `src/lib/animations.ts` with reusable presets for:
- section heading reveal
- stagger container/item variants
- card hover lift
- subtle floating loop
- transition constants shared across sections

**Step 4: Verify foundation**

Run diagnostics on modified files and confirm build still succeeds.

---

### Task 2: Upgrade navigation motion

**Files:**
- Modify: `src/components/Navigation.tsx`
- Modify: `src/lib/animations.ts` (if shared presets are needed)

**Step 1: Improve active state motion**

Add a smooth active indicator (pill or underline) that tracks the active section with layout animation.

**Step 2: Add scroll progress feedback**

Add a subtle top-edge progress bar linked to page scroll.

**Step 3: Keep mobile menu behavior stable**

Preserve the current mobile menu interaction and make sure the added motion does not interfere with tap targets.

**Step 4: Verify navigation changes**

Check diagnostics and build. In dev, verify scrolling updates the active state correctly.

---

### Task 3: Enrich the hero section

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/lib/animations.ts`

**Step 1: Add ambient background motion**

Introduce lightweight decorative background layers for the hero, using subtle opacity/transform motion only.

**Step 2: Add avatar float**

Apply a slow, low-amplitude floating animation to the avatar that disables or softens under reduced motion.

**Step 3: Refine hero stagger orchestration**

Replace inline one-off variants with the shared presets where possible and improve the sequencing of title, badges, meta info, and CTA buttons.

**Step 4: Upgrade CTA interactions**

Add springy hover/tap feedback that feels tactile but not playful.

**Step 5: Verify hero motion**

Check diagnostics and build. In dev, verify the hero remains readable and mobile-safe.

---

### Task 4: Improve skills, education, and experience rhythm

**Files:**
- Modify: `src/components/sections/SkillsSection.tsx`
- Modify: `src/components/sections/EducationSection.tsx`
- Modify: `src/components/sections/ExperienceSection.tsx`
- Create or Modify: `src/components/ui/SectionHeader.tsx` (optional, if worthwhile)

**Step 1: Normalize section heading reveal**

Use one shared section-heading animation pattern across these sections.

**Step 2: Add layered reveal inside skills**

Animate skills badges with a light stagger so the section feels more alive.

**Step 3: Add hover polish to education/experience cards**

Apply consistent hover lift/shadow treatment to reduce the “static middle page” feel.

**Step 4: Verify section consistency**

Check diagnostics and build. In dev, scroll through the page and confirm the motion cadence feels unified.

---

### Task 5: Make projects the interaction highlight

**Files:**
- Modify: `src/components/sections/ProjectsSection.tsx`
- Modify: `src/lib/animations.ts`

**Step 1: Upgrade project card hover behavior**

Add subtle scale, shadow elevation, and icon response on hover/tap.

**Step 2: Layer project content reveal**

Improve the reveal of title, description, badges, and links so the card content feels progressively presented.

**Step 3: Improve link affordances**

Strengthen the hover/tap feedback for GitHub/Demo links without introducing noisy animation.

**Step 4: Verify project interactions**

Check diagnostics and build. In dev, validate the cards remain stable in both mobile and desktop layouts.

---

### Task 6: Refine contact and theme-toggle micro-interactions

**Files:**
- Modify: `src/components/sections/ContactSection.tsx`
- Modify: `src/components/ThemeToggle.tsx`

**Step 1: Improve contact card hover motion**

Add a light lift/glow interaction to contact method rows and align CTA button feel with the hero.

**Step 2: Add theme-toggle animated state change**

Animate icon rotation/transition during theme change while keeping the mounted/hydration-safe pattern.

**Step 3: Verify interaction polish**

Check diagnostics and build. In dev, validate that theme switching feels smoother in both light and dark modes.

---

### Task 7: Final verification and cleanup

**Files:**
- Modify only if verification reveals issues caused by this work

**Step 1: Run diagnostics on all changed files**

Use LSP diagnostics to ensure the final changed TS/TSX files are clean.

**Step 2: Run production build**

Run: `npm run build`

Expected: successful static build with no type errors.

**Step 3: Run manual homepage QA**

Run: `npm run dev`

Manually verify:
- hero loads cleanly
- scroll progress indicator works
- section reveals feel cohesive
- project/contact hover interactions feel polished
- theme toggle animation is correct
- mobile menu still works
- reduced-motion behavior remains reasonable

**Step 4: Do not commit automatically**

Only create a commit if the user explicitly asks for one.

---

## Recommended Execution Strategy

This plan is best executed as **subagent-driven visual implementation** in the current session, because the work is concentrated in a known set of UI files and benefits from tight review after each visual cluster rather than long autonomous execution.
