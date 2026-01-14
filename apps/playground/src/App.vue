<script setup lang="ts">
import { ref } from 'vue'
import { Chart, ChartCard, ChartEmpty, ChartSkeleton } from 'shadcn-vue-echarts'
import type { EChartsOption } from 'shadcn-vue-echarts'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Line Chart - Basic
const lineChartOption = ref<EChartsOption>({
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: { type: 'value' },
  series: [{
    data: [120, 132, 101, 134, 90, 230, 210],
    type: 'line',
    smooth: true
  }]
})

// Line Chart - Multi Series with Area
const multiLineOption = ref<EChartsOption>({
  tooltip: { trigger: 'axis' },
  legend: { data: ['Revenue', 'Expenses', 'Profit'] },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yAxis: { type: 'value' },
  series: [
    { name: 'Revenue', type: 'line', areaStyle: {}, data: [820, 932, 901, 934, 1290, 1330] },
    { name: 'Expenses', type: 'line', areaStyle: {}, data: [620, 732, 701, 734, 890, 930] },
    { name: 'Profit', type: 'line', areaStyle: {}, data: [200, 200, 200, 200, 400, 400] }
  ]
})

// Bar Chart - Basic
const barChartOption = ref<EChartsOption>({
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: { type: 'value' },
  series: [
    { data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' },
    { data: [100, 150, 120, 100, 90, 140, 110], type: 'bar' }
  ]
})

// Bar Chart - Horizontal
const horizontalBarOption = ref<EChartsOption>({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  yAxis: {
    type: 'category',
    data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
  },
  xAxis: { type: 'value' },
  series: [{
    type: 'bar',
    data: [18203, 23489, 29034, 104970, 131744, 630230]
  }]
})

// Bar Chart - Stacked
const stackedBarOption = ref<EChartsOption>({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: { data: ['Direct', 'Mail', 'Affiliate', 'Video', 'Search'] },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [
    { name: 'Direct', type: 'bar', stack: 'total', data: [320, 302, 301, 334, 390, 330, 320] },
    { name: 'Mail', type: 'bar', stack: 'total', data: [120, 132, 101, 134, 90, 230, 210] },
    { name: 'Affiliate', type: 'bar', stack: 'total', data: [220, 182, 191, 234, 290, 330, 310] },
    { name: 'Video', type: 'bar', stack: 'total', data: [150, 212, 201, 154, 190, 330, 410] },
    { name: 'Search', type: 'bar', stack: 'total', data: [820, 832, 901, 934, 1290, 1330, 1320] }
  ]
})

// Pie Chart - Basic
const pieChartOption = ref<EChartsOption>({
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [{
    name: 'Access From',
    type: 'pie',
    radius: '50%',
    data: [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }
    ],
    emphasis: {
      itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
    }
  }]
})

// Pie Chart - Donut
const donutChartOption = ref<EChartsOption>({
  tooltip: { trigger: 'item' },
  legend: { top: '5%', left: 'center' },
  series: [{
    name: 'Traffic Sources',
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
    label: { show: false, position: 'center' },
    emphasis: {
      label: { show: true, fontSize: 20, fontWeight: 'bold' }
    },
    labelLine: { show: false },
    data: [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }
    ]
  }]
})

// Scatter Chart
const scatterOption = ref<EChartsOption>({
  tooltip: { trigger: 'item' },
  xAxis: {},
  yAxis: {},
  series: [{
    symbolSize: 20,
    data: [
      [10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81], [11.0, 8.33],
      [14.0, 7.66], [13.4, 6.81], [10.0, 6.33], [14.0, 8.96], [12.5, 6.82],
      [9.15, 7.2], [11.5, 7.2], [3.03, 4.23], [12.2, 7.83], [2.02, 4.47]
    ],
    type: 'scatter'
  }]
})

// Radar Chart
const radarOption = ref<EChartsOption>({
  tooltip: {},
  legend: { data: ['Allocated Budget', 'Actual Spending'] },
  radar: {
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Admin', max: 16000 },
      { name: 'IT', max: 30000 },
      { name: 'Support', max: 38000 },
      { name: 'Dev', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [{
    name: 'Budget vs Spending',
    type: 'radar',
    data: [
      { value: [4200, 3000, 20000, 35000, 50000, 18000], name: 'Allocated Budget' },
      { value: [5000, 14000, 28000, 26000, 42000, 21000], name: 'Actual Spending' }
    ]
  }]
})

// Gauge Chart
const gaugeOption = ref<EChartsOption>({
  tooltip: { formatter: '{a} <br/>{b} : {c}%' },
  series: [{
    name: 'Performance',
    type: 'gauge',
    progress: { show: true },
    detail: { valueAnimation: true, formatter: '{value}%' },
    data: [{ value: 70, name: 'Score' }]
  }]
})

// Funnel Chart
const funnelOption = ref<EChartsOption>({
  tooltip: { trigger: 'item', formatter: '{b} : {c}%' },
  legend: { data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order'], top: 'bottom' },
  series: [{
    name: 'Funnel',
    type: 'funnel',
    left: '10%',
    top: 20,
    bottom: 60,
    width: '80%',
    min: 0,
    max: 100,
    minSize: '0%',
    maxSize: '100%',
    sort: 'descending',
    gap: 2,
    label: { 
      show: true, 
      position: 'right',
      formatter: '{b}'
    },
    labelLine: { show: true },
    emphasis: { label: { fontSize: 16 } },
    data: [
      { value: 100, name: 'Show' },
      { value: 80, name: 'Click' },
      { value: 60, name: 'Visit' },
      { value: 40, name: 'Inquiry' },
      { value: 20, name: 'Order' }
    ]
  }]
})

// Heatmap-like Candlestick
const candlestickOption = ref<EChartsOption>({
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
  xAxis: {
    type: 'category',
    data: ['2024/1/1', '2024/1/2', '2024/1/3', '2024/1/4', '2024/1/5']
  },
  yAxis: { scale: true },
  series: [{
    type: 'candlestick',
    data: [
      [20, 34, 10, 38],
      [40, 35, 30, 50],
      [31, 38, 33, 44],
      [38, 15, 5, 42],
      [25, 35, 23, 39]
    ]
  }]
})

// Treemap
const treemapOption = ref<EChartsOption>({
  tooltip: { formatter: '{b}: {c}' },
  series: [{
    type: 'treemap',
    roam: false,
    breadcrumb: { show: true },
    label: {
      show: true,
      formatter: '{b}',
      fontSize: 12
    },
    upperLabel: {
      show: true,
      height: 30
    },
    levels: [
      {
        itemStyle: {
          borderWidth: 3,
          gapWidth: 3
        }
      },
      {
        itemStyle: {
          borderWidth: 2,
          gapWidth: 2
        }
      },
      {
        itemStyle: {
          borderWidth: 1,
          gapWidth: 1
        }
      }
    ],
    data: [
      { 
        name: 'Analytics', 
        value: 40,
        children: [
          { name: 'Data Processing', value: 20 },
          { name: 'Visualization', value: 15 },
          { name: 'Reporting', value: 5 }
        ]
      },
      { 
        name: 'Development', 
        value: 35,
        children: [
          { name: 'Frontend', value: 15 },
          { name: 'Backend', value: 12 },
          { name: 'DevOps', value: 8 }
        ]
      },
      { 
        name: 'Design', 
        value: 25,
        children: [
          { name: 'UI Design', value: 12 },
          { name: 'UX Research', value: 8 },
          { name: 'Branding', value: 5 }
        ]
      }
    ]
  }]
})

// Mixed Chart
const mixedChartOption = ref<EChartsOption>({
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
  legend: { data: ['Rainfall', 'Temperature'] },
  xAxis: [{ type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }],
  yAxis: [
    { type: 'value', name: 'Rainfall', position: 'left' },
    { type: 'value', name: 'Temperature', position: 'right' }
  ],
  series: [
    { name: 'Rainfall', type: 'bar', data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7] },
    { name: 'Temperature', type: 'line', yAxisIndex: 1, data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2] }
  ]
})

// Polar Bar
const polarBarOption = ref<EChartsOption>({
  angleAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  radiusAxis: {},
  polar: {},
  series: [{
    type: 'bar',
    data: [1, 2, 3, 4, 3, 5, 1],
    coordinateSystem: 'polar',
    name: 'A'
  }],
  legend: { show: true, data: ['A'] }
})

// Sunburst Chart
const sunburstOption = ref<EChartsOption>({
  series: [{
    type: 'sunburst',
    data: [
      { name: 'Grandpa', children: [
        { name: 'Uncle Leo', value: 15, children: [
          { name: 'Cousin Jack', value: 2 },
          { name: 'Cousin Mary', value: 5 }
        ]},
        { name: 'Father', value: 10, children: [
          { name: 'Me', value: 5 },
          { name: 'Brother Peter', value: 1 }
        ]}
      ]},
      { name: 'Nancy', children: [
        { name: 'Uncle Nike', children: [
          { name: 'Cousin Betty', value: 1 },
          { name: 'Cousin Jenny', value: 2 }
        ]}
      ]}
    ],
    radius: [0, '90%'],
    label: { rotate: 'radial' }
  }]
})

const showLoading = ref(false)
const hasData = ref(true)
</script>

<template>
  <div class="min-h-screen bg-background text-foreground transition-colors">
    <!-- Header -->
    <header class="border-b border-border bg-card shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold">shadcn-vue-echarts</h1>
            <p class="text-muted-foreground">Vue 3 ECharts wrapper with automatic shadcn theming</p>
          </div>
          <button
            @click="toggleDarkMode"
            class="rounded-lg bg-muted px-4 py-2 transition-colors hover:bg-muted/80"
          >
            {{ isDark ? '☀️ Light' : '🌙 Dark' }}
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Section: Line Charts -->
      <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Line Charts</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <ChartCard title="Basic Line Chart" description="Smooth line with tooltips">
          <Chart :option="lineChartOption" class="h-72" />
        </ChartCard>
        <ChartCard title="Multi-Series Area Chart" description="Revenue, expenses and profit trends">
          <Chart :option="multiLineOption" class="h-72" />
        </ChartCard>
      </div>

      <!-- Section: Bar Charts -->
      <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Bar Charts</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <ChartCard title="Grouped Bar Chart" description="Weekly comparison data">
          <Chart :option="barChartOption" class="h-72" />
        </ChartCard>
        <ChartCard title="Horizontal Bar Chart" description="Population by country">
          <Chart :option="horizontalBarOption" class="h-72" />
        </ChartCard>
        <ChartCard title="Stacked Bar Chart" description="Traffic sources breakdown">
          <Chart :option="stackedBarOption" class="h-72" />
        </ChartCard>
        <ChartCard title="Mixed Bar & Line" description="Rainfall vs temperature">
          <Chart :option="mixedChartOption" class="h-72" />
        </ChartCard>
      </div>

      <!-- Section: Pie Charts -->
      <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Pie & Donut Charts</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <ChartCard title="Basic Pie Chart" description="Traffic source distribution">
          <Chart :option="pieChartOption" class="h-72" />
        </ChartCard>
        <ChartCard title="Donut Chart" description="With emphasis animation">
          <Chart :option="donutChartOption" class="h-72" />
        </ChartCard>
      </div>

      <!-- Section: Scatter & Radar -->
      <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Scatter & Radar Charts</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <ChartCard title="Scatter Plot" description="Correlation visualization">
          <Chart :option="scatterOption" class="h-72" />
        </ChartCard>
        <ChartCard title="Radar Chart" description="Budget vs actual spending">
          <Chart :option="radarOption" class="h-72" />
        </ChartCard>
      </div>

      <!-- Section: Specialized Charts -->
      <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Specialized Charts</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <ChartCard title="Gauge Chart" description="Performance indicator">
          <Chart :option="gaugeOption" class="h-72" />
        </ChartCard>
        <ChartCard title="Funnel Chart" description="Conversion funnel">
          <Chart :option="funnelOption" class="h-72" />
        </ChartCard>
        <ChartCard title="Candlestick Chart" description="Stock price movements">
          <Chart :option="candlestickOption" class="h-72" />
        </ChartCard>
        <ChartCard title="Polar Bar Chart" description="Weekly activity in polar coordinates">
          <Chart :option="polarBarOption" class="h-72" />
        </ChartCard>
      </div>

      <!-- Section: Hierarchical Charts -->
      <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Hierarchical Charts</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <ChartCard title="Treemap" description="Hierarchical data visualization">
          <Chart :option="treemapOption" class="h-72" />
        </ChartCard>
        <ChartCard title="Sunburst Chart" description="Family tree visualization">
          <Chart :option="sunburstOption" class="h-72" />
        </ChartCard>
      </div>

      <!-- Section: Component States -->
      <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Component States</h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <ChartCard title="Loading State">
          <template #actions>
            <button
              @click="showLoading = !showLoading"
              class="rounded bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
            >
              {{ showLoading ? 'Stop' : 'Start' }}
            </button>
          </template>
          <Chart :option="lineChartOption" :loading="showLoading" class="h-60" />
        </ChartCard>
        <ChartCard title="Empty State">
          <template #actions>
            <button
              @click="hasData = !hasData"
              class="rounded bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
            >
              {{ hasData ? 'Clear' : 'Show' }}
            </button>
          </template>
          <ChartEmpty v-if="!hasData" title="No data" description="Click Show to display" />
          <Chart v-else :option="barChartOption" class="h-60" />
        </ChartCard>
        <ChartCard title="Skeleton Placeholder">
          <ChartSkeleton />
        </ChartCard>
      </div>

      <!-- Footer -->
      <footer class="text-center text-muted-foreground py-8 border-t">
        <p>Built with Vue 3 + ECharts + shadcn theming</p>
        <p class="text-sm mt-2">MIT License - © 2026</p>
      </footer>
    </main>
  </div>
</template>

<style scoped>
:deep(.echarts-container) {
  width: 100%;
  height: 100%;
}
</style>
