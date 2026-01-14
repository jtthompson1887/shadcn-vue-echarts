# AGENT-READY PROMPT: Implement `shadcn-vue-echarts`

This prompt is designed for a coding agent to implement the entire repository end-to-end without requiring clarifications or improvisation.

---

## Overview

You are implementing a **Vue 3 + Apache ECharts** npm package called `shadcn-vue-echarts` that integrates shadcn CSS variables for theming and supports light/dark mode.

**Deliverable:** A production-ready, publicly-publishable npm package with:
- Monorepo structure (pnpm)
- Type-safe Vue components
- SSR-safe composables
- Shadcn-compatible theming
- Full test coverage
- VitePress documentation
- GitHub Actions CI

---

## 1. Implementation Order

Follow this sequence strictly:

1. **Phase 1:** Workspace scaffolding (root config, pnpm, TS, eslint)
2. **Phase 2:** Theme utilities (CSS var reading, token merging)
3. **Phase 3:** Utility functions (SSR helpers, RAF throttle)
4. **Phase 4:** Composables (useChartTheme, useECharts)
5. **Phase 5:** Components (Chart, ChartCard, ChartEmpty, ChartSkeleton)
6. **Phase 6:** Exports & build config
7. **Phase 7:** Tests
8. **Phase 8:** Playground app
9. **Phase 9:** Documentation
10. **Phase 10:** CI & changesets

---

## 2. Root Package Configuration

### `package.json`

```json
{
  "name": "shadcn-vue-echarts-workspace",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@8.0.0",
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "typecheck": "pnpm -r typecheck",
    "lint": "pnpm -r lint",
    "format": "prettier --write \"**/*.{ts,tsx,vue,json,md}\"",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "pnpm build && pnpm test && changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.26.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "eslint-plugin-vue": "^9.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0",
    "vue-tsc": "^1.8.0"
  }
}
```

### `pnpm-workspace.yaml`

```yaml
packages:
  - "packages/*"
  - "apps/*"
  - "docs"
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "bundler"
  }
}
```

### `.eslintrc.cjs`

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
```

### `.prettierrc.json`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "arrowParens": "always"
}
```

### `.gitignore`

```
node_modules/
dist/
.DS_Store
*.log
.env.local
.vite/
.nuxt/
out/
coverage/
```

---

## 3. Package: `packages/shadcn-vue-echarts`

### `packages/shadcn-vue-echarts/package.json`

```json
{
  "name": "shadcn-vue-echarts",
  "version": "0.1.0",
  "description": "Vue 3 ECharts wrapper with shadcn theming",
  "type": "module",
  "sideEffects": false,
  "license": "MIT",
  "author": "Your Name <you@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/jtthompson1887/shadcn-vue-echarts.git"
  },
  "bugs": {
    "url": "https://github.com/jtthompson1887/shadcn-vue-echarts/issues"
  },
  "keywords": [
    "vue",
    "echarts",
    "shadcn",
    "chart",
    "theming",
    "tailwind"
  ],
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./components": {
      "import": "./dist/components/index.mjs",
      "require": "./dist/components/index.cjs",
      "types": "./dist/components/index.d.ts"
    },
    "./composables": {
      "import": "./dist/composables/index.mjs",
      "require": "./dist/composables/index.cjs",
      "types": "./dist/composables/index.d.ts"
    },
    "./theme": {
      "import": "./dist/theme/index.mjs",
      "require": "./dist/theme/index.cjs",
      "types": "./dist/theme/index.d.ts"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "vite build && vue-tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "typecheck": "vue-tsc --noEmit",
    "lint": "eslint src --ext .vue,.ts",
    "lint:fix": "eslint src --ext .vue,.ts --fix"
  },
  "peerDependencies": {
    "vue": "^3.3.0",
    "echarts": "^5.4.0 || ^6.0.0"
  },
  "devDependencies": {
    "@testing-library/vue": "^8.0.0",
    "@types/node": "^20.0.0",
    "@vitejs/plugin-vue": "^4.0.0",
    "@vue/test-utils": "^2.4.0",
    "happy-dom": "^12.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0",
    "vitest": "^0.34.0",
    "vue": "^3.3.0",
    "vue-tsc": "^1.8.0"
  }
}
```

### `packages/shadcn-vue-echarts/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "declaration": true,
    "declarationDir": "dist",
    "emitDeclarationOnly": false
  },
  "include": ["src/**/*.ts", "src/**/*.vue"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

### `packages/shadcn-vue-echarts/vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ShadcnVueEcharts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: ['vue', 'echarts'],
      output: {
        globals: {
          vue: 'Vue',
          echarts: 'echarts'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
```

### `packages/shadcn-vue-echarts/vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/']
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
```

---

## 4. Theme System Implementation Details

### Type Definitions (`src/types.ts`)

```typescript
import type { EChartsOption } from 'echarts'

export type ChartThemeMode = 'auto' | 'light' | 'dark'

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
  chart: string[]
}

export interface ChartProps {
  option: EChartsOption
  echarts?: any
  renderer?: 'canvas' | 'svg'
  autoresize?: boolean
  initOnNonZeroSize?: boolean
  themeMode?: ChartThemeMode
  themeStrategy?: 'option' | 'echartsTheme'
  themeName?: string
  themeObject?: object
  updateMode?: 'replace' | 'merge'
  notMerge?: boolean
  lazyUpdate?: boolean
  watch?: 'shallow' | 'deep'
  loading?: boolean | {
    text?: string
    color?: string
    maskColor?: string
  }
  group?: string
  connectGroup?: boolean
  events?: Record<string, (params: any) => void>
  minHeight?: number | string
  debug?: boolean
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

### CSS Variables (`src/theme/cssVars.ts`)

```typescript
export function readCssVar(el: Element | null, varName: string): string | null {
  if (!el) return null
  try {
    return getComputedStyle(el).getPropertyValue(varName).trim() || null
  } catch {
    return null
  }
}

export function readRootCssVar(varName: string): string | null {
  if (typeof document === 'undefined') return null
  return readCssVar(document.documentElement, varName)
}
```

### Color Resolution (`src/theme/resolveColor.ts`)

```typescript
export function isHslComponent(value: string): boolean {
  return /^\d+\.?\d*\s+\d+\.?\d*%\s+\d+\.?\d*%$/.test(value.trim())
}

export function resolveColor(value: string, alpha?: number): string {
  if (!value) return ''

  const trimmed = value.trim()

  if (isHslComponent(trimmed)) {
    const alphaStr = alpha !== undefined ? ` / ${alpha}` : ''
    return `hsl(${trimmed}${alphaStr})`
  }

  if (trimmed.startsWith('hsl(') || trimmed.startsWith('rgb(') || trimmed.startsWith('#')) {
    if (alpha !== undefined && (trimmed.startsWith('hsl(') || trimmed.startsWith('rgb('))) {
      const withoutParen = trimmed.slice(0, -1)
      const alphaStr = trimmed.includes('/') ? `` : ` / ${alpha}`
      return `${withoutParen}${alphaStr})`
    }
    return trimmed
  }

  return trimmed
}
```

### Shadcn Tokens (`src/theme/shadcnTokens.ts`)

```typescript
import type { ShadcnTokens } from '../types'
import { readCssVar, readRootCssVar } from './cssVars'
import { resolveColor } from './resolveColor'

const DEFAULT_CHART_COLORS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899'
]

export function readShadcnTokens(el?: Element): ShadcnTokens {
  const source = el || (typeof document !== 'undefined' ? document.documentElement : null)

  if (!source) {
    return {
      background: '#ffffff',
      foreground: '#000000',
      muted: '#f5f5f5',
      mutedForeground: '#666666',
      card: '#ffffff',
      cardForeground: '#000000',
      popover: '#ffffff',
      popoverForeground: '#000000',
      border: '#e5e5e5',
      ring: '#3b82f6',
      chart: DEFAULT_CHART_COLORS
    }
  }

  const background = resolveColor(readCssVar(source, '--background') || '')
  const foreground = resolveColor(readCssVar(source, '--foreground') || '')
  const muted = resolveColor(readCssVar(source, '--muted') || '')
  const mutedForeground = resolveColor(readCssVar(source, '--muted-foreground') || '')
  const card = resolveColor(readCssVar(source, '--card') || '')
  const cardForeground = resolveColor(readCssVar(source, '--card-foreground') || '')
  const popover = resolveColor(readCssVar(source, '--popover') || '')
  const popoverForeground = resolveColor(readCssVar(source, '--popover-foreground') || '')
  const border = resolveColor(readCssVar(source, '--border') || '')
  const ring = resolveColor(readCssVar(source, '--ring') || '')

  const chart = Array.from({ length: 8 }, (_, i) => {
    const varName = `--chart-${i + 1}`
    const value = readCssVar(source, varName)
    return value ? resolveColor(value) : DEFAULT_CHART_COLORS[i]
  })

  return {
    background,
    foreground,
    muted,
    mutedForeground,
    card,
    cardForeground,
    popover,
    popoverForeground,
    border,
    ring,
    chart
  }
}
```

### Shadcn Defaults (`src/theme/withShadcnDefaults.ts`)

```typescript
import type { EChartsOption } from 'echarts'
import type { ShadcnTokens } from '../types'
import { resolveColor } from './resolveColor'

export function withShadcnDefaults(option: EChartsOption, tokens: ShadcnTokens): EChartsOption {
  const merged = JSON.parse(JSON.stringify(option)) as EChartsOption

  // Color palette
  if (!merged.color) {
    merged.color = tokens.chart
  }

  // Text style
  if (!merged.textStyle) {
    merged.textStyle = {}
  }
  if (!merged.textStyle.color) {
    merged.textStyle.color = tokens.foreground
  }
  if (!merged.textStyle.fontFamily) {
    merged.textStyle.fontFamily = 'inherit'
  }

  // Title
  if (!merged.title) {
    merged.title = {}
  }
  if (Array.isArray(merged.title)) {
    merged.title = merged.title.map((t) => ({
      ...t,
      textStyle: {
        color: tokens.foreground,
        ...t.textStyle
      }
    }))
  } else {
    merged.title.textStyle = {
      color: tokens.foreground,
      ...(merged.title.textStyle || {})
    }
  }

  // Legend
  if (!merged.legend) {
    merged.legend = {}
  }
  if (Array.isArray(merged.legend)) {
    merged.legend = merged.legend.map((l) => ({
      ...l,
      textStyle: {
        color: tokens.mutedForeground,
        ...l.textStyle
      }
    }))
  } else {
    merged.legend.textStyle = {
      color: tokens.mutedForeground,
      ...(merged.legend.textStyle || {})
    }
  }

  // Axis
  if (!merged.xAxis) merged.xAxis = {}
  if (!merged.yAxis) merged.yAxis = {}

  const borderColor = resolveColor(tokens.border, 0.6)
  const splitLineColor = resolveColor(tokens.border, 0.35)

  for (const axis of [merged.xAxis, merged.yAxis]) {
    if (Array.isArray(axis)) {
      axis.forEach((a) => applyAxisDefaults(a, borderColor, splitLineColor, tokens.mutedForeground))
    } else {
      applyAxisDefaults(axis, borderColor, splitLineColor, tokens.mutedForeground)
    }
  }

  // Tooltip
  if (!merged.tooltip) {
    merged.tooltip = {}
  }
  merged.tooltip.backgroundColor = tokens.popover
  merged.tooltip.borderColor = resolveColor(tokens.border, 0.6)
  merged.tooltip.textStyle = {
    color: tokens.popoverForeground,
    ...merged.tooltip.textStyle
  }

  // Grid
  if (!merged.grid) {
    merged.grid = {}
  }
  if (Array.isArray(merged.grid)) {
    merged.grid.forEach((g) => {
      g.containLabel = true
    })
  } else {
    merged.grid.containLabel = true
  }

  return merged
}

function applyAxisDefaults(
  axis: any,
  borderColor: string,
  splitLineColor: string,
  labelColor: string
) {
  if (!axis) return

  if (!axis.axisLine) axis.axisLine = {}
  if (!axis.axisLine.lineStyle) axis.axisLine.lineStyle = {}
  if (!axis.axisLine.lineStyle.color) axis.axisLine.lineStyle.color = borderColor

  if (!axis.axisLabel) axis.axisLabel = {}
  if (!axis.axisLabel.color) axis.axisLabel.color = labelColor

  if (!axis.splitLine) axis.splitLine = {}
  if (!axis.splitLine.lineStyle) axis.splitLine.lineStyle = {}
  if (!axis.splitLine.lineStyle.color) axis.splitLine.lineStyle.color = splitLineColor
}
```

### Create ECharts Theme (`src/theme/createEChartsTheme.ts`)

```typescript
import type { ShadcnTokens } from '../types'
import { resolveColor } from './resolveColor'

export function createEChartsTheme(tokens: ShadcnTokens): object {
  const borderColor = resolveColor(tokens.border, 0.6)
  const splitLineColor = resolveColor(tokens.border, 0.35)

  return {
    color: tokens.chart,
    backgroundColor: tokens.background,
    textStyle: {
      color: tokens.foreground,
      fontFamily: 'inherit'
    },
    title: {
      textStyle: {
        color: tokens.foreground
      }
    },
    line: {
      itemStyle: {
        borderWidth: 1
      },
      lineStyle: {
        width: 2
      },
      symbolSize: 4
    },
    radar: {
      itemStyle: {
        borderWidth: 1
      },
      lineStyle: {
        width: 2
      },
      symbolSize: 4
    },
    bar: {
      itemStyle: {
        barBorderWidth: 0,
        barBorderColor: borderColor
      }
    },
    pie: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      }
    },
    scatter: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      }
    },
    boxplot: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      }
    },
    parallel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      }
    },
    sankey: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      }
    },
    funnel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      }
    },
    gauge: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      }
    },
    candlestick: {
      itemStyle: {
        color: tokens.chart[0],
        color0: tokens.chart[1],
        borderColor: tokens.chart[0],
        borderColor0: tokens.chart[1],
        borderWidth: 1
      }
    },
    graph: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      },
      lineStyle: {
        width: 1,
        color: borderColor
      },
      symbolSize: 4,
      smooth: false
    },
    map: {
      itemStyle: {
        areaColor: tokens.muted,
        borderColor: borderColor,
        borderWidth: 0.5
      },
      emphasis: {
        itemStyle: {
          areaColor: resolveColor(tokens.border, 0.5)
        }
      }
    },
    geo: {
      itemStyle: {
        areaColor: tokens.muted,
        borderColor: borderColor,
        borderWidth: 0.5
      },
      emphasis: {
        itemStyle: {
          areaColor: resolveColor(tokens.border, 0.5)
        }
      }
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: tokens.mutedForeground
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: splitLineColor
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [resolveColor(tokens.border, 0.1)]
        }
      }
    },
    valueAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: tokens.mutedForeground
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [resolveColor(tokens.border, 0.1)]
        }
      }
    },
    logAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: tokens.mutedForeground
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [resolveColor(tokens.border, 0.1)]
        }
      }
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: tokens.mutedForeground
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: splitLineColor
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [resolveColor(tokens.border, 0.1)]
        }
      }
    },
    toolbox: {
      iconStyle: {
        borderColor: tokens.foreground
      },
      emphasis: {
        iconStyle: {
          borderColor: tokens.foreground
        }
      }
    },
    legend: {
      textStyle: {
        color: tokens.mutedForeground
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: borderColor,
          width: 1
        },
        crossStyle: {
          color: borderColor,
          width: 1
        }
      }
    },
    timeline: {
      lineStyle: {
        color: borderColor,
        width: 1
      },
      itemStyle: {
        color: tokens.chart[0],
        borderWidth: 1
      },
      controlStyle: {
        color: tokens.foreground,
        borderColor: borderColor,
        borderWidth: 0.5
      },
      checkpointStyle: {
        color: tokens.chart[0],
        borderColor: tokens.chart[0]
      },
      label: {
        color: tokens.foreground
      },
      emphasis: {
        itemStyle: {
          color: tokens.chart[0]
        },
        controlStyle: {
          color: tokens.foreground,
          borderColor: borderColor,
          borderWidth: 0.5
        },
        label: {
          color: tokens.foreground
        }
      }
    },
    visualMap: {
      textStyle: {
        color: tokens.foreground
      }
    },
    dataZoom: {
      backgroundColor: 'rgba(0,0,0,0)',
      dataBackgroundColor: resolveColor(tokens.border, 0.1),
      fillerColor: resolveColor(tokens.border, 0.2),
      handleColor: tokens.foreground,
      handleSize: '100%',
      textStyle: {
        color: tokens.foreground
      }
    },
    markPoint: {
      label: {
        color: tokens.popoverForeground
      }
    }
  }
}
```

### Theme Index (`src/theme/index.ts`)

```typescript
export { readCssVar, readRootCssVar } from './cssVars'
export { resolveColor, isHslComponent } from './resolveColor'
export { readShadcnTokens } from './shadcnTokens'
export { withShadcnDefaults } from './withShadcnDefaults'
export { createEChartsTheme } from './createEChartsTheme'
export type { ShadcnTokens } from '../types'
```

---

## 5. Utility Functions

### SSR Safety (`src/utils/ssr.ts`)

```typescript
export function isSSR(): boolean {
  return typeof window === 'undefined'
}

export function isDOMAvailable(): boolean {
  return typeof document !== 'undefined' && typeof window !== 'undefined'
}
```

### RAF Throttle (`src/utils/rafThrottle.ts`)

```typescript
export function rafThrottle(fn: () => void): () => void {
  let rafId: number | null = null

  return () => {
    if (rafId === null) {
      rafId = typeof requestAnimationFrame !== 'undefined'
        ? requestAnimationFrame(() => {
          fn()
          rafId = null
        })
        : (setTimeout(() => {
          fn()
          rafId = null
        }, 16) as unknown as number)
    }
  }
}
```

### Shallow Equal (`src/utils/shallowEqual.ts`)

```typescript
export function shallowEqual(a: any, b: any): boolean {
  if (a === b) return true
  if (a == null || b == null) return false
  if (typeof a !== 'object' || typeof b !== 'object') return false

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!keysB.includes(key) || a[key] !== b[key]) {
      return false
    }
  }

  return true
}
```

### Utils Index (`src/utils/index.ts`)

```typescript
export { isSSR, isDOMAvailable } from './ssr'
export { rafThrottle } from './rafThrottle'
export { shallowEqual } from './shallowEqual'
```

---

## 6. Composables

### useChartTheme (`src/composables/useChartTheme.ts`)

```typescript
import { ref, shallowRef, watch, onMounted, onUnmounted, type Ref, type ShallowRef } from 'vue'
import { readShadcnTokens } from '../theme/shadcnTokens'
import { isDOMAvailable } from '../utils/ssr'
import type { ShadcnTokens, ChartThemeMode } from '../types'

export function useChartTheme(
  elRef: Ref<Element | null>,
  themeMode: Ref<ChartThemeMode> = ref('auto')
) {
  const tokens = shallowRef<ShadcnTokens | null>(null)
  const isDark = ref(false)

  let mutationObserver: MutationObserver | null = null
  let mediaQueryList: MediaQueryList | null = null

  const refresh = () => {
    if (!isDOMAvailable() || !elRef.value) return

    tokens.value = readShadcnTokens(elRef.value)

    const html = document.documentElement
    const darkClass = html.classList.contains('dark')
    const prefersDark = mediaQueryList?.matches ?? false
    isDark.value = darkClass || prefersDark
  }

  const setupDarkModeObserver = () => {
    if (!isDOMAvailable()) return

    const html = document.documentElement

    // Watch class changes
    mutationObserver = new MutationObserver(() => {
      refresh()
    })
    mutationObserver.observe(html, { attributes: true, attributeFilter: ['class'] })

    // Watch media query
    mediaQueryList = matchMedia('(prefers-color-scheme: dark)')
    const handler = () => refresh()
    mediaQueryList.addEventListener('change', handler)
  }

  const cleanup = () => {
    mutationObserver?.disconnect()
    mutationObserver = null

    if (mediaQueryList) {
      mediaQueryList.removeEventListener('change', () => {})
    }
  }

  onMounted(() => {
    refresh()
    setupDarkModeObserver()
  })

  onUnmounted(() => {
    cleanup()
  })

  watch(() => themeMode.value, () => {
    refresh()
  })

  return {
    tokens,
    isDark,
    refresh
  }
}
```

### useResizeObserver (`src/composables/useResizeObserver.ts`)

```typescript
import { isDOMAvailable } from '../utils/ssr'
import { rafThrottle } from '../utils/rafThrottle'
import type { Ref } from 'vue'

export function useResizeObserver(
  elRef: Ref<Element | null>,
  onResize: () => void,
  options?: { debounce?: number }
) {
  const throttledResize = rafThrottle(onResize)
  let observer: ResizeObserver | null = null

  const start = () => {
    if (!isDOMAvailable() || !elRef.value || !ResizeObserver) return

    observer = new ResizeObserver(() => {
      throttledResize()
    })
    observer.observe(elRef.value)
  }

  const stop = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  return {
    start,
    stop,
    isActive: () => observer !== null
  }
}
```

### useECharts (`src/composables/useECharts.ts`)

See implementation checklist task for detailed implementation. Key features:
- Instance management (init, setOption, resize, dispose)
- Theme strategy support (option vs echartsTheme)
- Watch behavior (shallow vs deep)
- Loading state
- Event listener management
- SSR safety
- Cleanup on unmount

### Composables Index (`src/composables/index.ts`)

```typescript
export { useChartTheme } from './useChartTheme'
export { useResizeObserver } from './useResizeObserver'
export { useECharts } from './useECharts'
```

---

## 7. Components

### Chart.vue (`src/components/Chart.vue`)

Template must render:
```vue
<div ref="el" :class="[classes]" :style="containerStyle">
  <!-- ECharts renders here -->
</div>
```

Component must:
- Use `useECharts` composable
- Implement all props from `ChartProps`
- Implement all emits: `ready`, `error`, `rendered`
- Expose `ChartExpose` interface methods
- Handle SSR safely

### ChartCard.vue (`src/components/ChartCard.vue`)

```vue
<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
    <div v-if="title || $slots.title || $slots.actions" class="flex items-start justify-between p-6 pb-2" :class="headerClass">
      <div>
        <h3 v-if="title" class="font-semibold">{{ title }}</h3>
        <slot name="title" v-if="!title" />
        <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
        <slot name="description" v-if="!description" />
      </div>
      <slot name="actions" />
    </div>
    <div class="p-6 pt-4" :class="contentClass">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-6 pt-0">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  contentClass?: string
  headerClass?: string
}>()
</script>
```

### ChartSkeleton.vue (`src/components/ChartSkeleton.vue`)

```vue
<template>
  <div class="h-[240px] w-full rounded-md bg-muted animate-pulse" />
</template>

<script setup lang="ts">
defineProps<{
  height?: number | string
}>()
</script>
```

### ChartEmpty.vue (`src/components/ChartEmpty.vue`)

```vue
<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <slot />
    <h3 class="mt-4 font-semibold">{{ title }}</h3>
    <p class="text-sm text-muted-foreground">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()

withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: 'No data',
  description: 'Try adjusting filters.'
})
</script>
```

### Components Index (`src/components/index.ts`)

```typescript
export { default as Chart } from './Chart.vue'
export { default as ChartCard } from './ChartCard.vue'
export { default as ChartEmpty } from './ChartEmpty.vue'
export { default as ChartSkeleton } from './ChartSkeleton.vue'
```

---

## 8. Main Export (`src/index.ts`)

```typescript
export { default as Chart } from './components/Chart.vue'
export { default as ChartCard } from './components/ChartCard.vue'
export { default as ChartEmpty } from './components/ChartEmpty.vue'
export { default as ChartSkeleton } from './components/ChartSkeleton.vue'

export { useECharts, useChartTheme } from './composables'

export {
  readShadcnTokens,
  createEChartsTheme,
  withShadcnDefaults,
  readCssVar,
  resolveColor
} from './theme'

export type {
  ChartProps,
  ChartExpose,
  ShadcnTokens,
  ChartThemeMode
} from './types'

export type { EChartsOption } from 'echarts'
```

---

## 9. Tests

### Testing Setup Notes

- Use `vitest` with `happy-dom` environment
- Mock ECharts with a fake instance object
- Test theme utilities independently
- Test component mounting/unmounting
- Mock ResizeObserver for resize tests

### Test File: `src/__tests__/theme.spec.ts`

Key tests:
- HSL component detection and conversion
- Color resolution with alpha
- Token reading from CSS vars
- Fallback to defaults
- `withShadcnDefaults` merging logic
- `createEChartsTheme` structure

### Test File: `src/__tests__/options.spec.ts`

Key tests:
- `withShadcnDefaults` sets color palette
- Does not overwrite user values
- Merges axis/tooltip/legend configs
- `createEChartsTheme` returns valid object

### Test File: `src/__tests__/chart.spec.ts`

Key tests:
- Chart component mounts correctly
- Calls `echarts.init()` on mount
- Updates option when prop changes
- Calls `dispose()` on unmount
- `autoresize` triggers `resize()`
- Loading state calls `showLoading()`/`hideLoading()`

---

## 10. Build, Test, Lint Commands

All must work:
```bash
pnpm install
pnpm -r lint
pnpm -r typecheck
pnpm -r test
pnpm -r build
```

Result: `packages/shadcn-vue-echarts/dist/` contains:
- `index.mjs`
- `index.cjs`
- `index.d.ts`
- Chunk files as needed

---

## 11. Playground App

### Key Features

- Dark mode toggle (adds/removes `dark` class on `html`)
- Line chart + bar chart examples
- ChartCard wrapper example
- Loading and empty state examples
- CSS variables defined for light/dark mode
- Shows both echarts patterns: dynamic import + modular

### Apps/playground Files

- `package.json` (includes `shadcn-vue-echarts` as local workspace dependency)
- `vite.config.ts`
- `tailwind.config.ts`
- `postcss.config.cjs`
- `index.html`
- `src/main.ts`
- `src/App.vue`
- `src/styles.css`

---

## 12. Documentation

### Minimum Pages

1. **Getting started** — npm install, basic usage
2. **Theming** — CSS variables, `--chart-1..8`, light/dark mode
3. **SSR** — Nuxt usage, no-op until mounted
4. **Recipes** — external legend, resize issues, tabs integration

All with copy-pastable examples.

---

## 13. CI Workflow

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm -r lint
      - run: pnpm -r typecheck
      - run: pnpm -r test
      - run: pnpm -r build
```

---

## 14. Release Setup

### `.changeset/config.json`

```json
{
  "$schema": "https://unpkg.com/@changesets/config@2.9.1/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@shadcn-vue-echarts/playground", "docs"]
}
```

---

## Success Criteria Checklist

- [ ] All files created per specification
- [ ] `pnpm install` succeeds
- [ ] `pnpm -r lint` passes
- [ ] `pnpm -r typecheck` passes (no TypeScript errors)
- [ ] `pnpm -r test` passes (all tests pass)
- [ ] `pnpm -r build` succeeds
- [ ] `dist/` contains `.mjs`, `.cjs`, `.d.ts`
- [ ] No `echarts` bundled (peer dependency honored)
- [ ] Playground app runs: `cd apps/playground && pnpm dev`
- [ ] Docs build: `cd docs && pnpm dev`
- [ ] All exports work: `import { Chart, useECharts, withShadcnDefaults } from 'shadcn-vue-echarts'`
- [ ] GitHub Actions CI workflow passes
- [ ] License, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY files present
- [ ] README files at root and package level

---

## Implementation Notes

1. **SSR Safety:** Never call `document`, `window`, or `getComputedStyle` until `onMounted`
2. **No shadcn-vue dependency:** Only use Tailwind classes, no component imports
3. **Peer dependency:** Consumer must install `echarts` themselves
4. **Types:** Use exact interface definitions from spec (no improvisation)
5. **Composables:** Export both for internal use and public consumption
6. **Testing:** Mock echarts completely; use happy-dom (lightweight)
7. **Build:** Ensure dist files have no echarts bundled
8. **Theme:** Always fall back to reasonable defaults if CSS vars missing

---

End of agent-ready prompt. Start with Phase 1 (workspace scaffolding) and proceed sequentially.
