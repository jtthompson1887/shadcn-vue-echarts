import { ref, watch, onMounted, onUnmounted, shallowRef, type Ref } from 'vue'
import { readShadcnTokens } from '../theme/shadcnTokens'
import { isDOMAvailable } from '../utils/ssr'
import type { ShadcnTokens, ChartThemeMode } from '../types'

export function useChartTheme(
  elRef: Ref<Element | null>,
  themeMode: Ref<ChartThemeMode> = ref('auto')
) {
  const tokens = shallowRef<ShadcnTokens | null>(null)
  const isDark = ref(false)

  let mutationObserver: MutationObserver | null = null
  let mediaQueryList: MediaQueryList | null = null

  const refresh = () => {
    if (!isDOMAvailable() || !elRef.value) return

    tokens.value = readShadcnTokens(elRef.value)

    const html = document.documentElement
    const darkClass = html.classList.contains('dark')
    const prefersDark = mediaQueryList?.matches ?? false
    isDark.value = darkClass || prefersDark
  }

  const setupDarkModeObserver = () => {
    if (!isDOMAvailable()) return

    const html = document.documentElement

    // Watch class changes
    mutationObserver = new MutationObserver(() => {
      refresh()
    })
    mutationObserver.observe(html, { attributes: true, attributeFilter: ['class'] })

    // Watch media query
    mediaQueryList = matchMedia('(prefers-color-scheme: dark)')
    const handler = () => refresh()
    mediaQueryList.addEventListener('change', handler)
  }

  const cleanup = () => {
    mutationObserver?.disconnect()
    mutationObserver = null

    if (mediaQueryList) {
      mediaQueryList.removeEventListener('change', () => {})
    }
  }

  onMounted(() => {
    refresh()
    setupDarkModeObserver()
  })

  onUnmounted(() => {
    cleanup()
  })

  watch(() => themeMode.value, () => {
    refresh()
  })

  return {
    tokens,
    isDark,
    refresh
  }
}
