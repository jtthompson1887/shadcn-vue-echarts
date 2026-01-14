# SSR & Nuxt

## Server-Side Rendering

`shadcn-vue-echarts` is SSR-safe by design.

### How It Works

- **Server:** Renders only the container `<div>`, no ECharts initialization
- **Client:** ECharts initializes on `onMounted`, when DOM is available

This means:

```vue
<template>
  <!-- Server renders this -->
  <div class="..."></div>
  
  <!-- Client mounts ECharts here after hydration -->
</template>
```

### No Configuration Needed

SSR works out of the box. The component automatically detects server vs client and acts accordingly.

## Nuxt 3 Integration

### 1. Install Dependencies

```bash
pnpm add shadcn-vue-echarts echarts
```

### 2. Create a Plugin (optional)

If you want to auto-import the components globally:

```typescript
// nuxt/plugins/shadcn-vue-echarts.ts
import { defineNuxtPlugin } from '#app'
import {
  Chart,
  ChartCard,
  ChartEmpty,
  ChartSkeleton
} from 'shadcn-vue-echarts'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Chart', Chart)
  nuxtApp.vueApp.component('ChartCard', ChartCard)
  nuxtApp.vueApp.component('ChartEmpty', ChartEmpty)
  nuxtApp.vueApp.component('ChartSkeleton', ChartSkeleton)
})
```

### 3. Setup CSS Variables

In your app layout or main CSS:

```vue
<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtPage />
  </div>
</template>

<style>
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other variables ... */
}

html.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... other variables ... */
}
</style>
```

### 4. Use in Pages

```vue
<!-- pages/dashboard.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import type { EChartsOption } from 'shadcn-vue-echarts'

const option = ref<EChartsOption>({
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 132, 101], type: 'line' }]
})
</script>

<template>
  <div class="p-6">
    <h1>Dashboard</h1>
    <Chart :option="option" />
  </div>
</template>
```

## Modular ECharts Build

For smaller bundles, use ECharts modular build:

```typescript
// composables/useCharts.ts
import * as echarts from 'echarts/core'
import {
  BarChart,
  LineChart,
  PieChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
])

export const useEChartsCore = () => echarts
```

Then pass it to the component:

```vue
<script setup>
import { useEChartsCore } from '~/composables/useCharts'

const echarts = useEChartsCore()
</script>

<template>
  <Chart :option="option" :echarts="echarts" />
</template>
```

## Hydration Mismatch

If you see hydration warnings, ensure your CSS variables are identical on server and client. The component outputs the same empty div on both, so mismatches typically come from CSS or parent elements.

## Performance Notes

- **No runtime rendering on server** — Just a container div
- **Lazy initialization** — ECharts only init on client mount
- **Automatic cleanup** — Properly disposes on unmount/hydration switch

This ensures optimal performance for SSR applications.
