import {
  ref,
  shallowRef,
  watch,
  onMounted,
  onUnmounted,
  type Ref
} from 'vue'
import type { EChartsOption } from 'echarts'
import type { ChartProps } from '../types'
import { withShadcnDefaults } from '../theme/withShadcnDefaults'
import { createEChartsTheme } from '../theme/createEChartsTheme'
import { isDOMAvailable } from '../utils/ssr'
import { shallowEqual } from '../utils/shallowEqual'
import { useChartTheme } from './useChartTheme'
import { useResizeObserver } from './useResizeObserver'

interface UseEChartsConfig extends Partial<Omit<ChartProps, 'option'>> {
  echarts?: any
  renderer?: 'canvas' | 'svg'
  autoresize?: boolean
  initOnNonZeroSize?: boolean
  themeMode?: 'auto' | 'light' | 'dark'
  themeStrategy?: 'option' | 'echartsTheme'
  themeName?: string
  themeObject?: object
  updateMode?: 'replace' | 'merge'
  notMerge?: boolean
  lazyUpdate?: boolean
  watch?: 'shallow' | 'deep'
  loading?: boolean | { text?: string; color?: string; maskColor?: string }
  group?: string
  connectGroup?: boolean
  events?: Record<string, (params: any) => void>
  debug?: boolean
}

export function useECharts(
  elRef: Ref<HTMLElement | null>,
  optionRef: Ref<EChartsOption>,
  config: UseEChartsConfig = {}
) {
  const instance = shallowRef<any | null>(null)
  const {
    echarts: echartsLib,
    renderer = 'canvas',
    autoresize = true,
    initOnNonZeroSize = true,
    themeMode = ref('auto'),
    themeStrategy = 'option',
    themeName = 'shadcn',
    themeObject,
    updateMode = 'merge',
    notMerge = false,
    lazyUpdate = true,
    watch: watchMode = 'shallow',
    loading,
    group,
    connectGroup = false,
    events,
    debug = false
  } = config

  const themeModeRef = ref(themeMode)
  const { tokens, isDark } = useChartTheme(elRef, themeModeRef)
  const { start: startResize, stop: stopResize } = useResizeObserver(elRef, () => {
    instance.value?.resize()
  })

  let lastOption: EChartsOption | null = null
  let lastEvents: Record<string, (params: any) => void> | null = null

  const loadECharts = async () => {
    if (instance.value) return

    let echartsInstance
    if (echartsLib) {
      echartsInstance = echartsLib
    } else {
      try {
        const module = await import('echarts')
        echartsInstance = module.default || module
      } catch (err) {
        console.error('[Chart] Failed to load echarts:', err)
        throw err
      }
    }

    return echartsInstance
  }

  const init = async () => {
    console.log('[Chart] init called, instance=' + (instance.value ? 'set' : 'null'))
    if (instance.value) return
    const domAvailable = isDOMAvailable()
    if (!domAvailable || !elRef.value) {
      console.error('[Chart] init skipped: domAvailable=' + domAvailable + ', elRef=' + (elRef.value ? 'set' : 'null'))
      return
    }
    console.log('[Chart] init proceeding with ec.init')

    try {
      const ec = await loadECharts()
      console.log('[Chart] loaded echarts, ec.init=' + (ec.init ? 'exists' : 'missing'))

      let theme: string | undefined
      if (themeStrategy === 'echartsTheme') {
        if (themeObject) {
          ec.registerTheme(themeName, themeObject)
          theme = themeName
        } else if (tokens.value) {
          const themeObj = createEChartsTheme(tokens.value)
          ec.registerTheme(themeName, themeObj)
          theme = themeName
        }
      }

      const inst = ec.init(elRef.value, theme, { renderer })

      if (group) {
        inst.group = group
        if (connectGroup) {
          ec.connect(group)
        }
      }

      instance.value = inst

      // Attach event listeners
      updateEventListeners(inst, events)
      lastEvents = events ? { ...events } : null

      // Set initial option
      const initialOption = optionRef.value
      const optionToSet =
        themeStrategy === 'option' && tokens.value
          ? withShadcnDefaults(initialOption, tokens.value)
          : initialOption
      inst.setOption(optionToSet, {
        notMerge: updateMode === 'replace',
        lazyUpdate
      })

      if (debug) console.log('[Chart] Initialized')
    } catch (err) {
      console.error('[Chart] Init failed:', err)
      throw err
    }
  }

  const setOption = (newOption?: EChartsOption) => {
    if (!instance.value) return

    const opt = newOption || optionRef.value
    const optionToSet =
      themeStrategy === 'option' && tokens.value
        ? withShadcnDefaults(opt, tokens.value)
        : opt

    instance.value.setOption(optionToSet, {
      notMerge: updateMode === 'replace' || (notMerge as boolean),
      lazyUpdate
    })

    lastOption = optionToSet
  }

  const resize = (opts?: { width?: number; height?: number }) => {
    instance.value?.resize(opts)
  }

  const dispose = () => {
    if (instance.value) {
      instance.value.dispose()
      instance.value = null
    }
    stopResize()
  }

  const updateEventListeners = (
    inst: any,
    newEvents: Record<string, (params: any) => void> | undefined
  ) => {
    if (!inst) return

    // Remove old listeners
    if (lastEvents) {
      for (const [event, handler] of Object.entries(lastEvents)) {
        inst.off(event, handler)
      }
    }

    // Add new listeners
    if (newEvents) {
      for (const [event, handler] of Object.entries(newEvents)) {
        inst.on(event, handler)
      }
    }
  }

  // Watch for theme changes
  const handleThemeChange = () => {
    if (!instance.value || themeStrategy !== 'option') return

    if (!tokens.value) {
      if (debug) console.log('[Chart] No tokens available for theme change')
      return
    }

    const currentOption = optionRef.value
    const optionWithDefaults = withShadcnDefaults(currentOption, tokens.value)
    instance.value.setOption(optionWithDefaults, { notMerge: true })

    if (debug) console.log('[Chart] Theme changed')
  }

  watch(() => tokens.value, handleThemeChange, { deep: false })

  // Watch option changes
  const handleOptionChange = () => {
    if (!instance.value) return

    const newOption = optionRef.value

    // Only update if reference changed (shallow) or deeply different
    if (watchMode === 'shallow' && shallowEqual(lastOption, newOption)) {
      return
    }

    setOption(newOption)

    if (debug) console.log('[Chart] Option changed')
  }

  if (watchMode === 'shallow') {
    watch(() => optionRef.value, handleOptionChange, { deep: false })
  } else {
    watch(() => optionRef.value, handleOptionChange, { deep: true })
  }

  // Watch events changes
  watch(
    () => events,
    (newEvents) => {
      if (instance.value) {
        updateEventListeners(instance.value, newEvents)
        lastEvents = newEvents ? { ...newEvents } : null
      }
    },
    { deep: true }
  )

  // Watch loading state
  watch(
    () => loading,
    (newLoading) => {
      if (!instance.value) return

      if (newLoading === false) {
        instance.value.hideLoading()
      } else if (newLoading === true) {
        instance.value.showLoading()
      } else if (typeof newLoading === 'object' && newLoading) {
        const { text, color, maskColor } = newLoading
        instance.value.showLoading('default', {
          text,
          textColor: color,
          maskColor
        })
      }
    },
    { deep: true }
  )

  onMounted(async () => {
    try {
      if (initOnNonZeroSize && elRef.value) {
        // Check if already has size, if yes init immediately
        const { width, height } = elRef.value.getBoundingClientRect()
        if (width > 0 && height > 0) {
          await init()
          if (autoresize) startResize()
          return
        }
        
        // Poll briefly for container size (max 100ms with 10ms intervals = 10 attempts)
        let attempts = 0
        const maxAttempts = 10
        while (attempts < maxAttempts && elRef.value) {
          const element = elRef.value
          const { width, height } = element.getBoundingClientRect()
          if (width > 0 && height > 0) {
            break
          }
          attempts++
          // Use short setTimeout for better test compatibility
          await new Promise(resolve => setTimeout(resolve, 10))
        }
        
        // Always init whether size was found or not (if element still exists)
        if (elRef.value) {
          await init()
          if (autoresize) startResize()
        }
      } else {
        await init()
        if (autoresize) startResize()
      }
    } catch (err) {
      console.error('[Chart] onMounted error:', err)
      throw err
    }
  })

  onUnmounted(() => {
    dispose()
  })

  return {
    instance,
    init,
    setOption,
    resize,
    dispose,
    tokens,
    isDark
  }
}
