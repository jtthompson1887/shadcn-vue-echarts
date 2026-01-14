<script setup lang="ts">
import { ref, shallowRef, computed, defineExpose } from 'vue'
import type { EChartsOption } from 'echarts'
import { useECharts } from '../composables/useECharts'
import type { ChartProps, ChartExpose } from '../types'

const props = withDefaults(defineProps<ChartProps>(), {
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
  ready: [instance: any]
  error: [error: Error]
  rendered: []
}>()

const el = ref<HTMLElement | null>(null)
const optionRef = shallowRef(props.option)
const themeModeRef = ref(props.themeMode)

const { instance, init, setOption: setChartOption, resize, dispose } = useECharts(
  el,
  optionRef,
  {
    echarts: props.echarts,
    renderer: props.renderer,
    autoresize: props.autoresize,
    initOnNonZeroSize: props.initOnNonZeroSize,
    themeMode: themeModeRef,
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

// Watch for prop changes
const stopWatchOption = () => {
  optionRef.value = props.option
}

const stopWatchThemeMode = () => {
  themeModeRef.value = props.themeMode
}

const containerStyle = computed(() => {
  const minHeightValue = typeof props.minHeight === 'number'
    ? `${props.minHeight}px`
    : props.minHeight
  return {
    minHeight: minHeightValue
  }
})

// Expose component methods
const getInstance = (): any | null => instance.value
const setOption = (option: EChartsOption, opts?: { notMerge?: boolean; lazyUpdate?: boolean }) => {
  optionRef.value = option
  setChartOption(option)
}

defineExpose<ChartExpose>({
  getInstance,
  setOption,
  resize,
  dispose
})

// Emit ready when instance is available
const unsubscribeReady = () => {
  if (instance.value) {
    emit('ready', instance.value)
  }
}

// Update watchers
watch([() => props.option, () => props.themeMode], ([newOption, newThemeMode]) => {
  if (newOption !== optionRef.value) {
    optionRef.value = newOption
  }
  if (newThemeMode !== themeModeRef.value) {
    themeModeRef.value = newThemeMode
  }
}, { deep: false })

import { watch } from 'vue'

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
