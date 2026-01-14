# Repository Specification: `shadcn-vue-echarts`

## One-Line Goal

Ship a public npm package that provides a **Vue 3** `<Chart />` wrapper around **Apache ECharts** plus **shadcn-style chart layout helpers** (class-based), with **CSS-variable theming** that matches shadcn tokens and supports light/dark mode.

---

## 1. Target Users & Constraints

### Target Users
- Vue 3 + Vite / Nuxt 3 apps using Tailwind + shadcn-style CSS variables
- Want a drop-in ECharts wrapper that "looks right" with shadcn tokens

### Constraints
- **No runtime dependency on shadcn-vue components**
- `echarts` is a **peer dependency** (consumer decides full vs modular build)
- SSR-safe (Nuxt): no `window/document` usage until `onMounted`
- Default API must be stable and minimal for AI agents to use reliably

---

## 2. Repository Structure

```
.
├─ package.json                    (workspace root)
├─ pnpm-workspace.yaml
├─ tsconfig.json
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ LICENSE                         (MIT)
├─ README.md
├─ CONTRIBUTING.md
├─ CODE_OF_CONDUCT.md
├─ SECURITY.md
├─ SPECIFICATION.md                (this file)
├─ .changeset/
│  └─ config.json
├─ packages/
│  └─ shadcn-vue-echarts/
│     ├─ package.json
│     ├─ tsconfig.json
│     ├─ vite.config.ts
│     ├─ vitest.config.ts
│     ├─ README.md
│     ├─ src/
│     │  ├─ index.ts
│     │  ├─ types.ts
│     │  ├─ components/
│     │  │  ├─ Chart.vue
│     │  │  ├─ ChartCard.vue
│     │  │  ├─ ChartEmpty.vue
│     │  │  └─ ChartSkeleton.vue
│     │  ├─ composables/
│     │  │  ├─ useECharts.ts
│     │  │  ├─ useChartTheme.ts
│     │  │  └─ useResizeObserver.ts
│     │  ├─ theme/
│     │  │  ├─ cssVars.ts
│     │  │  ├─ resolveColor.ts
│     │  │  ├─ shadcnTokens.ts
│     │  │  ├─ createEChartsTheme.ts
│     │  │  └─ withShadcnDefaults.ts
│     │  ├─ utils/
│     │  │  ├─ ssr.ts
│     │  │  ├─ rafThrottle.ts
│     │  │  └─ shallowEqual.ts
│     │  └─ __tests__/
│     │     ├─ theme.spec.ts
│     │     ├─ options.spec.ts
│     │     └─ chart.spec.ts
├─ apps/
│  └─ playground/
│     ├─ package.json
│     ├─ vite.config.ts
│     ├─ tailwind.config.ts
│     ├─ postcss.config.cjs
│     ├─ index.html
│     └─ src/
│        ├─ main.ts
│        ├─ App.vue
│        └─ styles.css
└─ docs/
   ├─ package.json
   └─ vitepress/
      ├─ config.ts
      └─ guide/
         ├─ index.md
         ├─ getting-started.md
         ├─ theming.md
         ├─ ssr.md
         └─ recipes.md
```

---

## 3. Tooling & Versions

### Required
- Node: `>= 18.18` (or 20 LTS)
- Package manager: `pnpm`
- Build: `Vite` library mode
- Vue: `^3.3.0`+
- TypeScript: `^5.x`
- Tests: `vitest` + `@vue/test-utils` + `happy-dom`

### Code Quality
- ESLint + Prettier
- `vue-tsc` for type checking SFCs

---

## 4. NPM Packaging Requirements

### `packages/shadcn-vue-echarts/package.json`

**Essential fields:**
```json
{
  "name": "shadcn-vue-echarts",
  "version": "0.1.0",
  "type": "module",
  "sideEffects": false,
  "peerDependencies": {
    "vue": "^3.3.0",
    "echarts": "^5.4.0 || ^6.0.0"
  },
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./components": {
      "types": "./dist/components/index.d.ts"
    },
    "./composables": {
      "types": "./dist/composables/index.d.ts"
    },
    "./theme": {
      "types": "./dist/theme/index.d.ts"
    }
  }
}
```

### Root package.json scripts

```json
{
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "typecheck": "pnpm -r typecheck",
    "lint": "pnpm -r lint",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "pnpm build && pnpm test && changeset publish"
  }
}
```

---

## 5. Public API Surface

### Main Exports (`src/index.ts`)

**Components**
- `Chart`
- `ChartCard`
- `ChartEmpty`
- `ChartSkeleton`

**Composables**
- `useECharts`
- `useChartTheme`

**Theme Utilities**
- `readShadcnTokens`
- `createEChartsTheme`
- `withShadcnDefaults`

**Types**
- `EChartsOption` (re-export from echarts)
- `ChartExpose`
- `ChartProps`
- `ShadcnTokens`
- `ChartThemeMode`

---

## 6. `<Chart />` Component Specification

### Purpose
A Vue component that:
- Initializes ECharts on mount
- Updates chart options when `option` changes
- Handles resizing
- Supports loading state
- Supports light/dark "auto" theming (via CSS vars)
- SSR-safe

### Type Definitions

```typescript
export type ChartThemeMode = 'auto' | 'light' | 'dark'

export interface ChartProps {
  /** Required: ECharts option object */
  option: EChartsOption

  /** Provide a custom echarts instance (recommended for modular builds) */
  echarts?: any

  /** ECharts renderer: 'canvas' or 'svg' */
  renderer?: 'canvas' | 'svg' // default 'canvas'

  /** If true, observe size changes and call resize() */
  autoresize?: boolean // default true

  /** If true, delays init until container has non-zero size */
  initOnNonZeroSize?: boolean // default true

  /** Chart theme mode for resolving tokens */
  themeMode?: ChartThemeMode // default 'auto'

  /** Theme strategy: 'option' or 'echartsTheme' */
  themeStrategy?: 'option' | 'echartsTheme' // default 'option'

  /** If themeStrategy='echartsTheme': theme name to register/use */
  themeName?: string // default 'shadcn'

  /** If themeStrategy='echartsTheme': pass a theme object */
  themeObject?: object

  /** Option update behavior: 'replace' or 'merge' */
  updateMode?: 'replace' | 'merge' // default 'merge'

  /** ECharts setOption options */
  notMerge?: boolean // default false
  lazyUpdate?: boolean // default true

  /** Watch behavior for `option`: 'shallow' or 'deep' */
  watch?: 'shallow' | 'deep' // default 'shallow'

  /** Loading state */
  loading?: boolean | {
    text?: string
    color?: string
    maskColor?: string
  }

  /** Group for echarts.connect */
  group?: string
  connectGroup?: boolean // default false

  /** Forward echarts events */
  events?: Record<string, (params: any) => void>

  /** Min height if user didn't style container */
  minHeight?: number | string // default 240

  /** Debug logs (dev only) */
  debug?: boolean // default false
}

export interface ChartExpose {
  getInstance(): any | null
  setOption(option: EChartsOption, opts?: {
    notMerge?: boolean
    lazyUpdate?: boolean
  }): void
  resize(opts?: { width?: number; height?: number }): void
  dispose(): void
}
```

### Emits
- `ready(instance)` - Chart instance ready
- `error(error)` - Initialization error
- `rendered` - Chart finished rendering (optional)

### Initialization Behavior

1. On `onMounted`:
   - Resolve echarts: use `props.echarts` or dynamic import from `echarts` (client-side only)
   - Create instance: `echarts.init(el, theme?, { renderer })`
   - Apply `group` and optionally `connectGroup`
   - Apply initial `option` (with theming defaults if `themeStrategy='option'`)
   - Emit `ready(instance)`
   - Attach event listeners from `events` prop

2. Watch behavior:
   - If `watch='shallow'`: update when `option` reference changes
   - If `watch='deep'`: deep-watch `option`

3. Theme changes (if `themeMode='auto'`):
   - **Option strategy**: recompute tokens and call `setOption(mergedOption, { notMerge: true })`
   - **EChartsTheme strategy**: dispose + re-init with new theme + setOption

### Resize Behavior

- If `autoresize=true`, use `ResizeObserver` on container
- Throttle resize calls with `requestAnimationFrame`
- Handle zero-size containers:
  - If `initOnNonZeroSize=true`, poll via RAF until width/height > 0, then init

### Loading Behavior

- If `loading=true`: `instance.showLoading(...)`
- If `loading=false`: `instance.hideLoading()`
- If loading object: merge with token defaults

### SSR Safety

- Server render outputs only the container `<div>`
- No `window/document/getComputedStyle` until mounted

### DOM Contract

```vue
<div
  ref="el"
  :class="[...]"
  :style="{ minHeight: `${minHeight}px`, ...style }"
>
  <!-- ECharts renders here -->
</div>
```

---

## 7. Theming System Specification

### `ShadcnTokens` Type

```typescript
export interface ShadcnTokens {
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  border: string
  ring: string
  chart: string[] // [chart-1, chart-2, ..., chart-8]
}
```

### CSS Variable Reading Rules

shadcn stores HSL components: `--foreground: 222.2 84% 4.9%`

**Functions:**
- `readCssVar(el: Element, varName: string): string | null` - reads raw value
- `resolveColor(value: string, alpha?: number): string` - produces CSS color:
  - If `"<num> <num>% <num>%"` → return `hsl(${value} / ${alpha})`
  - If already `hsl(...)`, `rgb(...)`, `#...` → return as-is (add alpha if possible)

**Token reading order:**
1. Chart container element (for scoped themes)
2. Fallback to `document.documentElement`

### Token Mapping (must support)

- `--background`
- `--foreground`
- `--muted`
- `--muted-foreground`
- `--card`
- `--card-foreground`
- `--popover`
- `--popover-foreground`
- `--border`
- `--ring`
- `--chart-1` through `--chart-8` (fallback to default palette if missing)

### `withShadcnDefaults(option, tokens)`

Returns a new `EChartsOption` that:

- Sets top-level `color` to `tokens.chart`
- Adds/merges sensible defaults **without overwriting user fields**
- Defaults:
  - `textStyle.color = tokens.foreground`, `textStyle.fontFamily = 'inherit'`
  - `title.textStyle.color = tokens.foreground`
  - `legend.textStyle.color = tokens.mutedForeground`
  - Axis:
    - `axisLine.lineStyle.color = border(0.6)`
    - `axisLabel.color = mutedForeground`
    - `splitLine.lineStyle.color = border(0.35)`
  - `tooltip`:
    - `backgroundColor = tokens.popover`
    - `borderColor = border(0.6)`
    - `textStyle.color = tokens.popoverForeground`
  - `grid.containLabel = true`

### `createEChartsTheme(tokens)`

Return an ECharts theme object matching the same defaults for users who want `themeStrategy='echartsTheme'`.

### Theme Mode Resolution (`themeMode='auto'`)

**Dark mode detection:**
1. Check `document.documentElement.classList.contains('dark')`
2. Fallback to `matchMedia('(prefers-color-scheme: dark)')`

**Watch changes:**
- MutationObserver on `documentElement` class attribute
- matchMedia listener as fallback

---

## 8. Composables Specification

### `useECharts(elRef, optionRef, config)`

A lower-level API used internally by `<Chart />` but also exported.

**Inputs:**
- `elRef: Ref<HTMLElement | null>`
- `optionRef: Ref<EChartsOption>`
- `config`: mirrors key Chart props

**Outputs:**
```typescript
{
  instance: ShallowRef<any | null>
  init(): Promise<void>
  setOption(opt?: EChartsOption): void
  resize(): void
  dispose(): void
  tokens: ShallowRef<ShadcnTokens | null>
  isDark: Ref<boolean>
}
```

### `useChartTheme(elRef, themeMode)`

**Returns:**
```typescript
{
  tokens: ShallowRef<ShadcnTokens | null>
  isDark: Ref<boolean>
  refresh(): void
}
```

---

## 9. Layout Components (Headless)

These use **only Tailwind/shadcn class names**, no imports from shadcn-vue.

### `<ChartCard />`

**Props:**
- `title?: string`
- `description?: string`
- `contentClass?: string`
- `headerClass?: string`

**Slots:**
- `title`
- `description`
- `actions`
- `default` (chart content)
- `footer`

**Base classes:**
- Outer: `rounded-xl border bg-card text-card-foreground shadow-sm`
- Header: `flex items-start justify-between p-6 pb-2`
- Content: `p-6 pt-4`
- Footer: `p-6 pt-0`

### `<ChartSkeleton />`

A chart-sized skeleton placeholder:
```html
<div class="h-[240px] w-full rounded-md bg-muted animate-pulse" />
```

### `<ChartEmpty />`

**Props:**
- `title?: string` (default: "No data")
- `description?: string` (default: "Try adjusting filters.")

**Slot:** custom icon/content

---

## 10. Playground App

### Requirements
- Uses Tailwind + shadcn-like CSS variables
- Demonstrates:
  - Line chart + tooltip
  - Bar chart
  - Dark mode toggle (adds/removes `dark` class on `html`)
  - ChartCard usage
  - Loading and empty state examples
- Shows **both** ECharts patterns:
  1. Simple: dynamic import full echarts
  2. Modular: custom core passed via `:echarts` prop

---

## 11. Documentation Requirements (VitePress)

### Minimum Pages
- Getting started
- Theming (CSS vars + `--chart-1..8`)
- SSR / Nuxt guidance
- Recipes (external legend, resize issues, tabs)

All docs must include copy-pastable snippets.

---

## 12. Tests (Minimum Viable)

### `theme.spec.ts`
- Reading HSL-component vars returns `hsl(...)`
- Alpha application works
- Token defaults are applied correctly

### `options.spec.ts`
- `withShadcnDefaults` does not overwrite user values
- Sets palette color array
- Merges without clobbering

### `chart.spec.ts`
- Mounts `<Chart />` with mocked echarts
- Calls `init`, `setOption`, `dispose`
- Autoresize triggers `resize` (mock ResizeObserver)

**Mocking approach:**
- Provide a fake `echarts` object with:
  - `init()` returning fake instance
  - Instance has: `setOption`, `resize`, `dispose`, `on`, `off`, `showLoading`, `hideLoading`

---

## 13. CI/CD (GitHub Actions)

### `.github/workflows/ci.yml`

Runs on PRs + main:
- Install pnpm
- `pnpm -r lint`
- `pnpm -r typecheck`
- `pnpm -r test`
- `pnpm -r build`

Optional: cache pnpm store

---

## 14. Release Flow (Changesets)

### `.changeset/config.json`

Root config with semantic versioning.

**Commands:**
- `pnpm changeset` - create a release note
- `pnpm version-packages` - bump versions
- `pnpm release` - publish to npm (agent can implement script but not run)

---

## 15. Acceptance Criteria

### Package Functionality
- ✅ `<Chart />` renders and updates charts
- ✅ Works in light and dark mode (auto)
- ✅ SSR-safe (no crashes on server import)
- ✅ Resizes correctly with container
- ✅ Loading prop shows/hides loading
- ✅ Events prop attaches and updates handlers
- ✅ `withShadcnDefaults` merges without clobbering
- ✅ Playground demonstrates all key features

### Build & Types
- ✅ `pnpm -r build` produces dist with types
- ✅ Consumer can `import { Chart } from 'shadcn-vue-echarts'`
- ✅ No bundled echarts (peer dependency honored)

### Public Readiness
- ✅ MIT license
- ✅ CONTRIBUTING.md
- ✅ CODE_OF_CONDUCT.md
- ✅ SECURITY.md
- ✅ CI passes
- ✅ Docs present and correct

---

## 16. Implementation Checklist

See [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) for step-by-step tasks with acceptance criteria.
