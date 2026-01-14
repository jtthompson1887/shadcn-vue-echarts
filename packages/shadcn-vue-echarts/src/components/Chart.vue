<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { EChartsOption } from 'echarts'
import { useECharts } from '../composables/useECharts'
import type { ChartProps, ChartExpose } from '../types'

const props = withDefaults(defineProps<Omit<ChartProps, 'option'> & { option?: EChartsOption }>(), {
  option: () => ({}),
  renderer: 'canvas',
  autoresize: true,
  initOnNonZeroSize: true,
  themeMode: 'auto',
  themeStrategy: 'option',
  themeName: 'shadcn',
  updateMode: 'merge',
  lazyUpdate: true,
  watch: 'shallow',
  connectGroup: false,
  minHeight: 240,
  debug: false
})

const emit = defineEmits<{
  ready: [instance: unknown]
  error: [error: Error]
  rendered: []
}>()

const el = ref<HTMLElement | null>(null)

const { instance, setOption: setChartOption, resize, dispose } = useECharts(
  el,
  computed(() => props.option),
  {
    echarts: props.echarts,
    renderer: props.renderer,
    autoresize: props.autoresize,
    initOnNonZeroSize: props.initOnNonZeroSize,
    themeMode: props.themeMode,
    themeStrategy: props.themeStrategy,
    themeName: props.themeName,
    themeObject: props.themeObject,
    updateMode: props.updateMode,
    notMerge: props.notMerge,
    lazyUpdate: props.lazyUpdate,
    watch: props.watch,
    loading: props.loading,
    group: props.group,
    connectGroup: props.connectGroup,
    events: props.events,
    debug: props.debug
  }
)

const containerStyle = computed(() => {
  const minHeightValue = typeof props.minHeight === 'number'
    ? `${props.minHeight}px`
    : props.minHeight
  return {
    minHeight: minHeightValue
  }
})

// Expose component methods
const getInstance = (): unknown => instance.value

const setOption = (option: EChartsOption | undefined): void => {
  if (option) {
    setChartOption(option)
  }
}

defineExpose<ChartExpose>({
  getInstance,
  setOption,
  resize,
  dispose
})

// Watch for prop changes and emit ready event
watch(instance, (newInstance) => {
  if (newInstance) {
    emit('ready', newInstance)
  }
})
</script>

<template>
  <div ref="el" :style="containerStyle" class="w-full" />
</template>

<style scoped>
:deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
