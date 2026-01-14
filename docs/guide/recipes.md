# Recipes

Common patterns and solutions.

## External Legend

Place the ECharts legend outside the chart:

```vue
<script setup>
import { ref } from 'vue'
import type { EChartsOption } from 'shadcn-vue-echarts'

const option = ref<EChartsOption>({
  legend: {
    orient: 'vertical',
    left: 'right'
  },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [
    { name: 'Series 1', data: [120, 132, 101], type: 'line' },
    { name: 'Series 2', data: [90, 110, 140], type: 'line' }
  ]
})
</script>

<template>
  <Chart :option="option" />
</template>
```

## Conditional Rendering

Show/hide charts based on conditions:

```vue
<script setup>
import { ref } from 'vue'
import { ChartEmpty, ChartSkeleton } from 'shadcn-vue-echarts'

const loading = ref(true)
const hasData = ref(false)
</script>

<template>
  <div v-if="loading" class="w-full">
    <ChartSkeleton />
  </div>

  <div v-else-if="hasData" class="w-full">
    <Chart :option="option" />
  </div>

  <div v-else>
    <ChartEmpty
      title="No data available"
      description="Check back soon"
    />
  </div>
</template>
```

## Chart Synchronization

Synchronize multiple charts via `group` and `connectGroup`:

```vue
<script setup>
const option1 = ref<EChartsOption>({...})
const option2 = ref<EChartsOption>({...})
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <Chart
      :option="option1"
      group="sync"
      connectGroup
    />
    <Chart
      :option="option2"
      group="sync"
      connectGroup
    />
  </div>
</template>
```

Hovering or selecting in one chart will highlight related data in the other.

## Tabs Integration

Charts in different tabs:

```vue
<script setup>
import { ref } from 'vue'
import type { EChartsOption } from 'shadcn-vue-echarts'

const activeTab = ref<'revenue' | 'users'>('revenue')

const revenueOption = ref<EChartsOption>({
  xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 132, 101], type: 'line' }]
})

const usersOption = ref<EChartsOption>({
  xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar'] },
  yAxis: { type: 'value' },
  series: [{ data: [10000, 12000, 15000], type: 'bar' }]
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <button
        @click="activeTab = 'revenue'"
        :class="{ 'bg-primary text-white': activeTab === 'revenue' }"
      >
        Revenue
      </button>
      <button
        @click="activeTab = 'users'"
        :class="{ 'bg-primary text-white': activeTab === 'users' }"
      >
        Users
      </button>
    </div>

    <Chart
      v-if="activeTab === 'revenue'"
      :option="revenueOption"
      key="revenue"
    />
    <Chart
      v-if="activeTab === 'users'"
      :option="usersOption"
      key="users"
    />
  </div>
</template>
```

## Responsive Charts

Charts adapt to container width:

```vue
<template>
  <div class="w-full h-96">
    <Chart
      :option="option"
      autoresize
      class="w-full h-full"
    />
  </div>
</template>
```

The `autoresize` prop (enabled by default) automatically calls `resize()` when the container changes size.

## Custom Events

Listen to ECharts events:

```vue
<script setup>
import { ref } from 'vue'

const events = {
  click: (params) => {
    console.log('Clicked:', params)
  },
  mouseover: (params) => {
    console.log('Hovered:', params)
  }
}
</script>

<template>
  <Chart :option="option" :events="events" />
</template>
```

## Loading States

Show loading indicator:

```vue
<script setup>
import { ref } from 'vue'

const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 2000)
</script>

<template>
  <Chart
    :option="option"
    :loading="isLoading"
  />
</template>
```

Or with custom loading text/color:

```vue
<Chart
  :option="option"
  :loading="{
    text: 'Loading data...',
    color: 'hsl(var(--ring))',
    maskColor: 'rgba(0,0,0,0.1)'
  }"
/>
```
