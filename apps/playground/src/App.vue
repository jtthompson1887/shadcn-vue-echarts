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

const lineChartOption = ref<EChartsOption>({
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

const barChartOption = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    },
    {
      data: [100, 150, 120, 100, 90, 140, 110],
      type: 'bar'
    }
  ]
})

const showLoading = ref(false)
const hasData = ref(true)
</script>

<template>
  <div class="min-h-screen bg-background text-foreground transition-colors">
    <!-- Header -->
    <header class="border-b border-border bg-card shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold">shadcn-vue-echarts</h1>
            <p class="text-muted-foreground">Vue 3 ECharts with shadcn theming</p>
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
      <!-- Line Chart with Card -->
      <section class="mb-8">
        <ChartCard
          title="Revenue Trend"
          description="7-day revenue data with smooth line chart"
        >
          <Chart :option="lineChartOption" class="h-80" />
        </ChartCard>
      </section>

      <!-- Bar Chart with Card -->
      <section class="mb-8">
        <ChartCard
          title="Sales Comparison"
          description="Monthly sales data"
        >
          <Chart :option="barChartOption" class="h-80" />
        </ChartCard>
      </section>

      <!-- Loading State Demo -->
      <section class="mb-8">
        <ChartCard title="Loading State Demo">
          <template #actions>
            <button
              @click="showLoading = !showLoading"
              class="rounded bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
            >
              {{ showLoading ? 'Stop Loading' : 'Start Loading' }}
            </button>
          </template>
          <Chart
            :option="lineChartOption"
            :loading="showLoading"
            class="h-80"
          />
        </ChartCard>
      </section>

      <!-- Empty State Demo -->
      <section class="mb-8">
        <ChartCard title="Empty State Demo">
          <template #actions>
            <button
              @click="hasData = !hasData"
              class="rounded bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
            >
              {{ hasData ? 'Clear Data' : 'Show Data' }}
            </button>
          </template>
          <ChartEmpty
            v-if="!hasData"
            title="No data available"
            description="Click 'Show Data' to display the chart"
          />
          <Chart v-else :option="lineChartOption" class="h-80" />
        </ChartCard>
      </section>

      <!-- Skeleton Loading -->
      <section class="mb-8">
        <ChartCard title="Skeleton Placeholder">
          <ChartSkeleton />
        </ChartCard>
      </section>
    </main>
  </div>
</template>

<style scoped>
:deep(.echarts-container) {
  width: 100%;
  height: 100%;
}
</style>
