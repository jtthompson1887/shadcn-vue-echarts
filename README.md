# shadcn-vue-echarts

Vue 3 + ECharts wrapper with shadcn theming support.

## Features

- **Headless Core** — Lightweight wrapper with zero shadcn-vue runtime dependency
- **Shadcn Theming** — Automatic CSS variable integration for light/dark mode
- **SSR Safe** — Works seamlessly with Nuxt 3 and other SSR frameworks
- **Type Safe** — Full TypeScript support with exact types
- **Peer Dependency** — You control the echarts version
- **Responsive** — Built-in ResizeObserver support
- **Tree-Shakeable** — Modular exports for optimal bundle size

## Quick Start

```bash
pnpm add shadcn-vue-echarts echarts
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Chart } from 'shadcn-vue-echarts'
import type { EChartsOption } from 'shadcn-vue-echarts'

const option = ref<EChartsOption>({
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 132, 101], type: 'line' }]
})
</script>

<template>
  <Chart :option="option" />
</template>
```

## Documentation

- [Getting Started](./docs/guide/getting-started.md)
- [Theming Guide](./docs/guide/theming.md)
- [SSR & Nuxt](./docs/guide/ssr.md)
- [Recipes & Examples](./docs/guide/recipes.md)

## Packages

- `shadcn-vue-echarts` — Main library
- `playground` — Example application
- `docs` — VitePress documentation

## Development

```bash
# Install dependencies
pnpm install

# Run playground
cd apps/playground && pnpm dev

# Run tests
pnpm -r test

# Build
pnpm -r build

# Lint & format
pnpm -r lint
pnpm format
```

## License

MIT © 2026 shadcn-vue-echarts contributors