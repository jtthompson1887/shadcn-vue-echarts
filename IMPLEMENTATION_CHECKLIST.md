# Implementation Checklist: `shadcn-vue-echarts`

This checklist breaks down the implementation into sequential, verifiable tasks. Each task has acceptance criteria.

---

## Phase 1: Workspace Scaffolding & Tooling (Tasks 1–5)

### Task 1: Root workspace setup
**Goal:** Initialize pnpm workspace, TypeScript, and linting infrastructure.

**Acceptance Criteria:**
- [ ] Root `package.json` with `"pnpm-workspace": { "packages": ["packages/*", "apps/*", "docs"] }`
- [ ] Root `tsconfig.json` (references)
- [ ] Root `.eslintrc` / `eslint.config.js` configured
- [ ] Root `.prettierrc` configured
- [ ] Root `.gitignore` configured
- [ ] Root `pnpm-workspace.yaml`
- [ ] Run `pnpm install` succeeds

**Files to create:**
- `package.json`
- `pnpm-workspace.yaml`
- `tsconfig.json`
- `.eslintrc.cjs` or `eslint.config.js`
- `.prettierrc.json`
- `.gitignore`

---

### Task 2: Create `packages/shadcn-vue-echarts/` structure
**Goal:** Set up the main package directory with config files.

**Acceptance Criteria:**
- [ ] `packages/shadcn-vue-echarts/package.json` with correct exports map and peer dependencies
- [ ] `packages/shadcn-vue-echarts/tsconfig.json`
- [ ] `packages/shadcn-vue-echarts/vite.config.ts` (library mode)
- [ ] `packages/shadcn-vue-echarts/vitest.config.ts`
- [ ] Directory structure created: `src/`, `src/components/`, `src/composables/`, `src/theme/`, `src/utils/`, `src/__tests__/`
- [ ] README.md in package

**Files to create:**
- `packages/shadcn-vue-echarts/package.json`
- `packages/shadcn-vue-echarts/tsconfig.json`
- `packages/shadcn-vue-echarts/vite.config.ts`
- `packages/shadcn-vue-echarts/vitest.config.ts`
- `packages/shadcn-vue-echarts/README.md`

---

### Task 3: Create `apps/playground/` structure
**Goal:** Set up playground app for testing.

**Acceptance Criteria:**
- [ ] `apps/playground/package.json`
- [ ] `apps/playground/vite.config.ts`
- [ ] `apps/playground/tsconfig.json`
- [ ] `apps/playground/tailwind.config.ts`
- [ ] `apps/playground/postcss.config.cjs`
- [ ] `apps/playground/index.html`
- [ ] Directory structure: `src/`, with `main.ts`, `App.vue`, `styles.css`

**Files to create:**
- `apps/playground/package.json`
- `apps/playground/vite.config.ts`
- `apps/playground/tsconfig.json`
- `apps/playground/tailwind.config.ts`
- `apps/playground/postcss.config.cjs`
- `apps/playground/index.html`
- `apps/playground/src/main.ts`
- `apps/playground/src/App.vue`
- `apps/playground/src/styles.css`

---

### Task 4: Create `docs/` structure
**Goal:** Set up VitePress documentation.

**Acceptance Criteria:**
- [ ] `docs/package.json`
- [ ] `docs/.vitepress/config.ts` with nav/sidebar
- [ ] `docs/.vitepress/theme/` structure
- [ ] `docs/guide/index.md`
- [ ] `docs/guide/getting-started.md`
- [ ] `docs/guide/theming.md`
- [ ] `docs/guide/ssr.md`
- [ ] `docs/guide/recipes.md`

**Files to create:**
- `docs/package.json`
- `docs/.vitepress/config.ts`
- `docs/guide/*.md` (all pages listed above)

---

### Task 5: Create root governance files
**Goal:** Add MIT license, contributing guide, CoC, and security policy.

**Acceptance Criteria:**
- [ ] `LICENSE` (MIT)
- [ ] `CONTRIBUTING.md`
- [ ] `CODE_OF_CONDUCT.md`
- [ ] `SECURITY.md`
- [ ] Root `README.md` with overview + quick start

**Files to create:**
- `LICENSE`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- Update `README.md`

---

## Phase 2: Theme & Utility Modules (Tasks 6–11)

### Task 6: Implement `src/types.ts`
**Goal:** Define all TypeScript interfaces and types.

**Acceptance Criteria:**
- [ ] `ChartThemeMode` type exported
- [ ] `ChartProps` interface exported
- [ ] `ChartExpose` interface exported
- [ ] `ShadcnTokens` interface exported
- [ ] All types are correctly typed (no `any` except where intentional for echarts)
- [ ] Types match specification exactly

**Files to create:**
- `packages/shadcn-vue-echarts/src/types.ts`

---

### Task 7: Implement `src/theme/cssVars.ts`
**Goal:** CSS variable reading utilities.

**Acceptance Criteria:**
- [ ] `readCssVar(el: Element, varName: string): string | null` function works
- [ ] Reads from element first, falls back to documentElement
- [ ] Returns raw value (e.g., `"222.2 84% 4.9%"`)
- [ ] Handles `null` element gracefully

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/theme/cssVars.ts`

---

### Task 8: Implement `src/theme/resolveColor.ts`
**Goal:** Convert CSS var values to color strings.

**Acceptance Criteria:**
- [ ] `resolveColor(value: string, alpha?: number): string` function works
- [ ] Detects HSL component pattern: `"<num> <num>% <num>%"` → returns `hsl(${value} / ${alpha})`
- [ ] Detects existing `hsl(...)` format and optionally adds alpha
- [ ] Detects `rgb(...)` and `#xxx` formats; returns as-is or with alpha
- [ ] Edge cases handled (empty string, invalid input)

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/theme/resolveColor.ts`

---

### Task 9: Implement `src/theme/shadcnTokens.ts`
**Goal:** Read shadcn tokens from CSS variables.

**Acceptance Criteria:**
- [ ] `readShadcnTokens(el?: Element): ShadcnTokens` function exported
- [ ] Reads all required CSS vars: `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--border`, `--ring`
- [ ] Reads `--chart-1` through `--chart-8`; falls back to default palette if missing
- [ ] All returned colors are resolved via `resolveColor()`
- [ ] Returns `ShadcnTokens` type

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/theme/shadcnTokens.ts`

---

### Task 10: Implement `src/theme/withShadcnDefaults.ts`
**Goal:** Merge shadcn tokens into ECharts option.

**Acceptance Criteria:**
- [ ] `withShadcnDefaults(option: EChartsOption, tokens: ShadcnTokens): EChartsOption`
- [ ] Returns new object (does not mutate input)
- [ ] Sets `color` to `tokens.chart`
- [ ] Sets `textStyle.color = tokens.foreground`, `fontFamily = 'inherit'`
- [ ] Sets title, legend, axis, tooltip defaults as per spec
- [ ] Does **not** overwrite user-supplied values (deep merge logic)
- [ ] Handles alpha on borders: `border(0.6)` means `resolveColor(tokens.border, 0.6)`

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/theme/withShadcnDefaults.ts`

---

### Task 11: Implement `src/theme/createEChartsTheme.ts`
**Goal:** Create ECharts theme object from tokens.

**Acceptance Criteria:**
- [ ] `createEChartsTheme(tokens: ShadcnTokens): object`
- [ ] Returns ECharts-compatible theme object with same color/style defaults as `withShadcnDefaults`
- [ ] Can be registered via `echarts.registerTheme(name, theme)` or passed to `echarts.init(el, name, opts)`

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/theme/createEChartsTheme.ts`

---

## Phase 3: Utility Functions (Tasks 12–14)

### Task 12: Implement `src/utils/ssr.ts`
**Goal:** SSR safety helpers.

**Acceptance Criteria:**
- [ ] `isSSR(): boolean` — returns true if `typeof window === 'undefined'`
- [ ] `isDOMAvailable(): boolean` — returns true if window and document exist
- [ ] Used throughout composables/components to prevent runtime errors

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/utils/ssr.ts`

---

### Task 13: Implement `src/utils/rafThrottle.ts`
**Goal:** Throttle function calls via requestAnimationFrame.

**Acceptance Criteria:**
- [ ] `rafThrottle(fn: () => void): () => void` exported
- [ ] Returns throttled function that batches calls
- [ ] Used for resize events
- [ ] Works in SSR context (no RAF → execute immediately)

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/utils/rafThrottle.ts`

---

### Task 14: Implement `src/utils/shallowEqual.ts`
**Goal:** Shallow equality check for objects.

**Acceptance Criteria:**
- [ ] `shallowEqual(a: any, b: any): boolean`
- [ ] Compares top-level keys only
- [ ] Used to detect when ECharts options change

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/utils/shallowEqual.ts`

---

## Phase 4: Composables (Tasks 15–17)

### Task 15: Implement `src/composables/useResizeObserver.ts`
**Goal:** Observe container size changes.

**Acceptance Criteria:**
- [ ] `useResizeObserver(elRef, onResize, options?): () => void` exported
- [ ] Returns cleanup function
- [ ] Throttles resize calls via `rafThrottle`
- [ ] SSR-safe (no-op if ResizeObserver unavailable)
- [ ] Can be toggled on/off

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/composables/useResizeObserver.ts`

---

### Task 16: Implement `src/composables/useChartTheme.ts`
**Goal:** Track theme changes and tokens.

**Acceptance Criteria:**
- [ ] `useChartTheme(elRef: Ref<Element | null>, themeMode?: Ref<ChartThemeMode>)`
- [ ] Returns `{ tokens: ShallowRef<ShadcnTokens>, isDark: Ref<boolean>, refresh: () => void }`
- [ ] Detects dark mode: checks `documentElement.classList.contains('dark')` first, then `matchMedia('(prefers-color-scheme: dark)')`
- [ ] Watches theme changes via MutationObserver (class changes) + matchMedia listener
- [ ] Refresh updates tokens + isDark
- [ ] SSR-safe

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/composables/useChartTheme.ts`

---

### Task 17: Implement `src/composables/useECharts.ts`
**Goal:** Core ECharts instance management.

**Acceptance Criteria:**
- [ ] `useECharts(elRef, optionRef, config)` composable exported
- [ ] Returns `{ instance, init, setOption, resize, dispose, tokens, isDark }`
- [ ] `init()` resolves echarts (custom or dynamic import) and calls `echarts.init(el, theme, { renderer })`
- [ ] Handles `initOnNonZeroSize` by polling via RAF
- [ ] `setOption()` calls instance method with correct `notMerge`/`lazyUpdate` logic
- [ ] `resize()` calls instance.resize()
- [ ] Watches `optionRef` (shallow or deep per config)
- [ ] Watches theme changes and recomputes defaults (option strategy) or reinits (theme strategy)
- [ ] Manages event listeners from `events` config
- [ ] Handles loading state
- [ ] SSR-safe: does not call init until mounted
- [ ] Cleanup on unmount

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/composables/useECharts.ts`

---

## Phase 5: Components (Tasks 18–21)

### Task 18: Implement `src/components/Chart.vue`
**Goal:** Main ECharts wrapper component.

**Acceptance Criteria:**
- [ ] Props match `ChartProps` interface exactly
- [ ] Emits `ready(instance)`, `error(error)`, `rendered`
- [ ] Exposes methods via `defineExpose`: `getInstance()`, `setOption()`, `resize()`, `dispose()`
- [ ] Uses `useECharts` composable internally
- [ ] Renders a single `<div>` with `ref="el"`, `min-height` style, and class/style passthrough
- [ ] SSR-safe (renders only container)
- [ ] Light and dark mode work via `themeMode='auto'`

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/components/Chart.vue`

---

### Task 19: Implement `src/components/ChartCard.vue`
**Goal:** Card wrapper with title/description.

**Acceptance Criteria:**
- [ ] Props: `title?: string`, `description?: string`, `contentClass?: string`, `headerClass?: string`
- [ ] Slots: `title`, `description`, `actions`, `default`, `footer`
- [ ] Classes: outer `rounded-xl border bg-card text-card-foreground shadow-sm`, header `flex items-start justify-between p-6 pb-2`, content `p-6 pt-4`, footer `p-6 pt-0`
- [ ] No imports from shadcn-vue

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/components/ChartCard.vue`

---

### Task 20: Implement `src/components/ChartSkeleton.vue`
**Goal:** Skeleton placeholder for charts.

**Acceptance Criteria:**
- [ ] Renders a `<div>` with class `h-[240px] w-full rounded-md bg-muted animate-pulse`
- [ ] Accepts optional `height` prop to override

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/components/ChartSkeleton.vue`

---

### Task 21: Implement `src/components/ChartEmpty.vue`
**Goal:** Empty state component.

**Acceptance Criteria:**
- [ ] Props: `title?: string` (default "No data"), `description?: string` (default "Try adjusting filters.")
- [ ] Slot for custom icon/content
- [ ] Shows title + description + slot
- [ ] Centered, uses muted text colors

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/components/ChartEmpty.vue`

---

## Phase 6: Exports & Build (Tasks 22–24)

### Task 22: Implement `src/index.ts`
**Goal:** Public API entry point.

**Acceptance Criteria:**
- [ ] Exports all components: `Chart`, `ChartCard`, `ChartEmpty`, `ChartSkeleton`
- [ ] Exports composables: `useECharts`, `useChartTheme`
- [ ] Exports theme utilities: `readShadcnTokens`, `createEChartsTheme`, `withShadcnDefaults`
- [ ] Exports types: `EChartsOption` (re-export), `ChartExpose`, `ChartProps`, `ShadcnTokens`, `ChartThemeMode`
- [ ] Exports are stable and tested

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/index.ts`

---

### Task 23: Create subpath exports
**Goal:** Enable tree-shaking and modular imports.

**Acceptance Criteria:**
- [ ] `packages/shadcn-vue-echarts/src/components/index.ts` exports all components
- [ ] `packages/shadcn-vue-echarts/src/composables/index.ts` exports all composables
- [ ] `packages/shadcn-vue-echarts/src/theme/index.ts` exports all theme utilities
- [ ] Root `package.json` `exports` map includes these paths

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/components/index.ts`
- `packages/shadcn-vue-echarts/src/composables/index.ts`
- `packages/shadcn-vue-echarts/src/theme/index.ts`
- Update `packages/shadcn-vue-echarts/package.json` exports map

---

### Task 24: Verify Vite build config
**Goal:** Ensure library builds correctly.

**Acceptance Criteria:**
- [ ] `packages/shadcn-vue-echarts/vite.config.ts` is configured for library mode
- [ ] `pnpm -r build` produces `dist/index.mjs`, `dist/index.cjs`, `dist/index.d.ts`
- [ ] No `echarts` bundled (peer dependency)
- [ ] Type declarations generated correctly

**Files to verify/edit:**
- `packages/shadcn-vue-echarts/vite.config.ts`

---

## Phase 7: Tests (Tasks 25–27)

### Task 25: Implement `src/__tests__/theme.spec.ts`
**Goal:** Test theming utilities.

**Acceptance Criteria:**
- [ ] Test: HSL component reading and conversion
- [ ] Test: Alpha application on colors
- [ ] Test: `readShadcnTokens` returns all required keys
- [ ] Test: `withShadcnDefaults` does not overwrite user values
- [ ] All tests pass: `pnpm -r test`

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/__tests__/theme.spec.ts`

---

### Task 26: Implement `src/__tests__/options.spec.ts`
**Goal:** Test options merging.

**Acceptance Criteria:**
- [ ] Test: `withShadcnDefaults` sets palette color array
- [ ] Test: `withShadcnDefaults` merges without clobbering user config
- [ ] Test: `createEChartsTheme` returns valid theme object
- [ ] All tests pass: `pnpm -r test`

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/__tests__/options.spec.ts`

---

### Task 27: Implement `src/__tests__/chart.spec.ts`
**Goal:** Test Chart component and useECharts composable.

**Acceptance Criteria:**
- [ ] Mock echarts instance with `init()`, `setOption()`, `resize()`, `dispose()`, `on()`, `off()`, `showLoading()`, `hideLoading()`
- [ ] Test: Chart mounts and initializes
- [ ] Test: Chart updates on option change
- [ ] Test: Chart calls dispose on unmount
- [ ] Test: autoresize triggers resize (mock ResizeObserver)
- [ ] Test: loading prop shows/hides loading
- [ ] All tests pass: `pnpm -r test`

**Files to create/edit:**
- `packages/shadcn-vue-echarts/src/__tests__/chart.spec.ts`

---

## Phase 8: Playground (Tasks 28–29)

### Task 28: Implement `apps/playground/src/App.vue`
**Goal:** Showcase all features.

**Acceptance Criteria:**
- [ ] Dark mode toggle (adds/removes `dark` class on `html`)
- [ ] Line chart example (with shadcn defaults)
- [ ] Bar chart example
- [ ] ChartCard example with title + description
- [ ] Loading state example
- [ ] Empty state example
- [ ] Demonstrates both echarts patterns: dynamic import + modular import
- [ ] Uses shadcn CSS variables correctly

**Files to create/edit:**
- `apps/playground/src/App.vue`
- `apps/playground/src/main.ts`

---

### Task 29: Implement `apps/playground/src/styles.css`
**Goal:** Shadcn-like CSS variables and Tailwind setup.

**Acceptance Criteria:**
- [ ] Defines shadcn CSS variables for light mode (`:root`)
- [ ] Defines shadcn CSS variables for dark mode (`html.dark`)
- [ ] Defines `--chart-1` through `--chart-8`
- [ ] Tailwind directives: `@tailwind base`, `components`, `utilities`
- [ ] App can toggle dark mode and colors adjust

**Files to create/edit:**
- `apps/playground/src/styles.css`

---

## Phase 9: Documentation (Tasks 30–32)

### Task 30: Implement `docs/guide/getting-started.md`
**Goal:** Quick start for new users.

**Acceptance Criteria:**
- [ ] Installation instructions (pnpm/npm)
- [ ] Basic usage example with `<Chart />`
- [ ] Peer dependency note
- [ ] Links to other docs

**Files to create/edit:**
- `docs/guide/getting-started.md`

---

### Task 31: Implement `docs/guide/theming.md`
**Goal:** Explain CSS variables and theming.

**Acceptance Criteria:**
- [ ] Explains shadcn token mapping
- [ ] Shows how to set `--background`, `--foreground`, etc.
- [ ] Explains `--chart-1..8` palette
- [ ] Shows `themeMode='auto'` behavior
- [ ] Shows `themeStrategy` options
- [ ] Includes copy-pastable examples

**Files to create/edit:**
- `docs/guide/theming.md`

---

### Task 32: Implement remaining docs
**Goal:** Complete VitePress documentation.

**Acceptance Criteria:**
- [ ] `docs/guide/ssr.md` explains Nuxt/SSR usage, no-op until mounted
- [ ] `docs/guide/recipes.md` includes: external legend, resize troubleshooting, tabs integration
- [ ] `docs/.vitepress/config.ts` configured with nav/sidebar
- [ ] All docs render correctly: `pnpm -r dev` in docs

**Files to create/edit:**
- `docs/guide/ssr.md`
- `docs/guide/recipes.md`
- `docs/.vitepress/config.ts`

---

## Phase 10: CI & Release (Tasks 33–34)

### Task 33: Create GitHub Actions CI workflow
**Goal:** Automate testing and build checks.

**Acceptance Criteria:**
- [ ] `.github/workflows/ci.yml` created
- [ ] Workflow runs on PRs + push to main
- [ ] Steps: install pnpm, `pnpm -r lint`, `pnpm -r typecheck`, `pnpm -r test`, `pnpm -r build`
- [ ] All steps pass

**Files to create/edit:**
- `.github/workflows/ci.yml`

---

### Task 34: Set up Changesets for releases
**Goal:** Enable semantic versioning and release automation.

**Acceptance Criteria:**
- [ ] `.changeset/config.json` created and configured
- [ ] Root `package.json` has `changeset` and `release` scripts
- [ ] Documentation on creating changesets in CONTRIBUTING.md
- [ ] Ready for `pnpm changeset` and `pnpm release` workflow

**Files to create/edit:**
- `.changeset/config.json`
- Update root `package.json` scripts
- Update `CONTRIBUTING.md` with release workflow

---

## Final Verification (Task 35)

### Task 35: End-to-end verification
**Goal:** Confirm all acceptance criteria are met.

**Acceptance Criteria:**
- [ ] `pnpm install` succeeds
- [ ] `pnpm -r lint` passes
- [ ] `pnpm -r typecheck` passes
- [ ] `pnpm -r test` passes and all tests pass
- [ ] `pnpm -r build` produces correct dist files
- [ ] Playground app runs: `pnpm -r dev`
- [ ] Docs build: `pnpm -r build` in docs
- [ ] All exports work: `import { Chart, useECharts, withShadcnDefaults } from 'shadcn-vue-echarts'`
- [ ] No bundled echarts in dist
- [ ] TypeScript types generated in dist
- [ ] README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, LICENSE all present
- [ ] GitHub Actions CI passes
- [ ] Package ready for npm publish

---

## Summary

**Total Tasks:** 35

**Estimated Phases:**
1. Workspace & tooling: 5 tasks
2. Theme utilities: 6 tasks
3. Utility functions: 3 tasks
4. Composables: 3 tasks
5. Components: 4 tasks
6. Exports & build: 3 tasks
7. Tests: 3 tasks
8. Playground: 2 tasks
9. Documentation: 3 tasks
10. CI & release: 2 tasks
11. Final verification: 1 task

All tasks completed = **Production-ready npm package**.
