# shadcn-vue-echarts

Vue 3 ECharts wrapper with shadcn theming support.

## Features

- 🎨 Shadcn-compatible theming via CSS variables
- 🌓 Automatic light/dark mode detection
- 📱 Responsive resizing with ResizeObserver
- ⚡ SSR-safe (Nuxt 3 compatible)
- 📦 Zero runtime dependencies (echarts is peer dep)
- 🧪 Full TypeScript support

## Installation

```bash
pnpm add shadcn-vue-echarts echarts
```

## Quick Start

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Chart } from 'shadcn-vue-echarts'
import type { EChartsOption } from 'shadcn-vue-echarts'

const option = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 132, 101, 134, 90, 230, 210],
      type: 'line'
    }
  ]
})
</script>

<template>
  <Chart :option="option" />
</template>
```

## Documentation

See [docs](../../docs) for complete guides on theming, SSR, and recipes.
