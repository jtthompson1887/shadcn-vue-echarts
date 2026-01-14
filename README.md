# shadcn-vue-echarts

[![CI](https://github.com/jtthompson1887/shadcn-vue-echarts/actions/workflows/ci.yml/badge.svg)](https://github.com/jtthompson1887/shadcn-vue-echarts/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/shadcn-vue-echarts.svg)](https://www.npmjs.com/package/shadcn-vue-echarts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Vue 3 + ECharts wrapper with automatic shadcn theming support.

## 📚 Documentation & Examples

- **[📖 Documentation](https://jtthompson1887.github.io/shadcn-vue-echarts/)** — Full guides and API reference
- **[🎨 Live Examples](https://jtthompson1887.github.io/shadcn-vue-echarts/examples/)** — Interactive chart gallery with dark mode

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
npm install shadcn-vue-echarts echarts
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

## Chart Types

All ECharts chart types are supported with automatic theming:

| Category | Charts |
|----------|--------|
| **Basic** | Line, Bar, Pie, Scatter |
| **Advanced** | Radar, Funnel, Gauge, Heatmap |
| **Financial** | Candlestick, K-line |
| **Hierarchical** | Treemap, Sunburst |
| **Polar** | Polar Bar, Polar Line |

## Documentation

- [Getting Started](https://jtthompson1887.github.io/shadcn-vue-echarts/guide/getting-started)
- [Theming Guide](https://jtthompson1887.github.io/shadcn-vue-echarts/guide/theming)
- [SSR & Nuxt](https://jtthompson1887.github.io/shadcn-vue-echarts/guide/ssr)
- [Recipes & Examples](https://jtthompson1887.github.io/shadcn-vue-echarts/guide/recipes)

## Packages

| Package | Description |
|---------|-------------|
| `shadcn-vue-echarts` | Main library |
| `playground` | Example application |
| `docs` | VitePress documentation |

## Development

```bash
# Install dependencies
npm install

# Run playground
npm run dev --workspace=playground

# Run tests
npm run test

# Build all
npm run build

# Lint
npm run lint
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © 2026 shadcn-vue-echarts contributors