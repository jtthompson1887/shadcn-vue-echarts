# Theming

## Overview

`shadcn-vue-echarts` uses CSS variables for theming, just like shadcn/ui. This enables:

- **Automatic light/dark mode** switching
- **Scoped theming** per container
- **Full customization** via CSS
- **Zero runtime theme switching** overhead

## CSS Variables

### Required Variables

The component expects these CSS variables to be defined:

```css
/* Colors */
--background        /* Page background */
--foreground        /* Default text color */
--muted             /* Muted background (legends, labels) */
--muted-foreground  /* Muted text color */
--card              /* Card backgrounds */
--card-foreground   /* Card text */
--popover           /* Tooltip background */
--popover-foreground/* Tooltip text */
--border            /* Border colors */
--ring              /* Focus ring */

/* Chart colors (8-color palette) */
--chart-1 to --chart-8
```

### Shadcn Format

Shadcn stores colors as HSL components:

```css
--foreground: 222.2 84% 4.9%;  /* h s% l% */
```

This is resolved to: `hsl(222.2 84% 4.9%)`

## Theme Strategies

### Option Strategy (Default)

The library merges shadcn tokens into your ECharts option on every render:

```vue
<Chart :option="option" themeStrategy="option" />
```

**Pros:**
- Simple, no ECharts theme registration
- Token changes reflected immediately
- Works with dynamic theme switching

**Cons:**
- Merges on every update

### ECharts Theme Strategy

Register a theme with ECharts:

```vue
<script setup>
import { createEChartsTheme } from 'shadcn-vue-echarts'
import { readShadcnTokens } from 'shadcn-vue-echarts'

const tokens = readShadcnTokens()
const themeObject = createEChartsTheme(tokens)
</script>

<template>
  <Chart
    :option="option"
    themeStrategy="echartsTheme"
    themeName="shadcn"
    :themeObject="themeObject"
  />
</template>
```

**Pros:**
- Native ECharts theme system
- Better performance with many charts

**Cons:**
- Must update theme when colors change

## Light/Dark Mode

### Auto Mode (Default)

Automatically detects dark mode:

```vue
<Chart :option="option" themeMode="auto" />
```

Detects dark mode via:
1. `dark` class on `<html>`
2. System preference `prefers-color-scheme: dark`

### Manual Mode

Force light or dark:

```vue
<Chart :option="option" themeMode="light" />
<Chart :option="option" themeMode="dark" />
```

### Toggle Example

```vue
<script setup>
const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <button @click="toggleDarkMode">
    {{ isDark ? '☀️ Light' : '🌙 Dark' }}
  </button>
  <Chart :option="option" themeMode="auto" />
</template>
```

## Customizing Colors

### Modify CSS Variables

Override variables in your CSS:

```css
:root {
  --foreground: 0 0% 0%;      /* Black */
  --chart-1: 0 100% 50%;      /* Red */
  --chart-2: 120 100% 50%;    /* Green */
}

html.dark {
  --foreground: 0 0% 100%;    /* White */
  --chart-1: 0 100% 60%;      /* Lighter red */
  --chart-2: 120 100% 60%;    /* Lighter green */
}
```

### Scoped Theming

Style per-chart with CSS classes:

```vue
<template>
  <div class="chart-1">
    <Chart :option="option" />
  </div>
  <div class="chart-2">
    <Chart :option="option" />
  </div>
</template>

<style scoped>
.chart-1 {
  --foreground: 0 0% 50%;
  --chart-1: 0 100% 50%;
}

.chart-2 {
  --foreground: 120 60% 50%;
  --chart-1: 120 100% 50%;
}
</style>
```

## Chart Palette

The `--chart-1` through `--chart-8` variables define your chart series colors:

```css
--chart-1: 12 76% 61%;     /* Orange-red */
--chart-2: 160 84% 39%;    /* Teal */
--chart-3: 197 37% 24%;    /* Navy */
--chart-4: 43 74% 66%;     /* Yellow */
--chart-5: 27 87% 67%;     /* Orange */
--chart-6: 282 91% 60%;    /* Purple */
--chart-7: 0 100% 67%;     /* Red */
--chart-8: 280 85% 40%;    /* Indigo */
```

Series automatically cycle through this palette:

```typescript
const option: EChartsOption = {
  series: [
    { data: [...], type: 'line' },    // uses --chart-1
    { data: [...], type: 'line' },    // uses --chart-2
    { data: [...], type: 'line' }     // uses --chart-3
  ]
}
```

## API Reference

### `readShadcnTokens(el?)`

Read tokens from an element (or `document.documentElement`):

```typescript
import { readShadcnTokens } from 'shadcn-vue-echarts'

const tokens = readShadcnTokens()
// → ShadcnTokens with all color values
```

### `withShadcnDefaults(option, tokens)`

Merge tokens into an ECharts option:

```typescript
import { withShadcnDefaults, readShadcnTokens } from 'shadcn-vue-echarts'

const option = { ... }
const tokens = readShadcnTokens()
const merged = withShadcnDefaults(option, tokens)
```

### `createEChartsTheme(tokens)`

Create an ECharts theme object:

```typescript
import { createEChartsTheme, readShadcnTokens } from 'shadcn-vue-echarts'

const tokens = readShadcnTokens()
const theme = createEChartsTheme(tokens)
echarts.registerTheme('shadcn', theme)
```
