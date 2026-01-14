# Getting Started

## Installation

Install via your package manager:

```bash
pnpm add shadcn-vue-echarts echarts
```

Or with npm/yarn:

```bash
npm install shadcn-vue-echarts echarts
yarn add shadcn-vue-echarts echarts
```

## Setup

### 1. Ensure Tailwind CSS is configured

`shadcn-vue-echarts` uses CSS variables for theming. Set up Tailwind with a configuration that supports CSS variables:

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... other colors
      }
    }
  }
}
```

### 2. Add CSS variables to your app

In your main CSS file, define the shadcn color tokens:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --chart-1: 12 76% 61%;
    --chart-2: 160 84% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --chart-6: 282 91% 60%;
    --chart-7: 0 100% 67%;
    --chart-8: 280 85% 40%;
  }

  html.dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;

    --chart-1: 12 76% 61%;
    --chart-2: 160 84% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --chart-6: 282 91% 60%;
    --chart-7: 0 100% 67%;
    --chart-8: 280 85% 40%;
  }
}
```

## Basic Usage

### Simple Line Chart

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
      type: 'line',
      smooth: true
    }
  ]
})
</script>

<template>
  <Chart :option="option" />
</template>

<style scoped>
:deep(.echarts-container) {
  width: 100%;
  height: 400px;
}
</style>
```

### With ChartCard

Wrap your chart in a styled card:

```vue
<template>
  <ChartCard
    title="Revenue"
    description="Last 7 days"
  >
    <Chart :option="option" />
  </ChartCard>
</template>
```

## Key Concepts

### Peer Dependency

`echarts` is a peer dependency. This means you control the version installed and can use either the full build or a modular bundle.

### Theme Mode

By default, `themeMode="auto"` detects dark mode via:
1. `dark` class on `<html>`
2. System preference via `prefers-color-scheme` media query

### SSR Safety

The component is SSR-safe out of the box. ECharts initialization is delayed until `onMounted`, so server rendering just outputs the container div.

---

## Next Steps

- [Learn about theming](./theming)
- [SSR & Nuxt setup](./ssr)
- [Recipes & examples](./recipes)
