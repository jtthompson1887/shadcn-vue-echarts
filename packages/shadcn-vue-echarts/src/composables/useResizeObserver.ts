import { isDOMAvailable } from '../utils/ssr'
import { rafThrottle } from '../utils/rafThrottle'
import type { Ref } from 'vue'

export function useResizeObserver(
  elRef: Ref<Element | null>,
  onResize: () => void,
) {
  const throttledResize = rafThrottle(onResize)
  let observer: ResizeObserver | null = null

  const start = () => {
    if (!isDOMAvailable() || !elRef.value) return
    if (typeof ResizeObserver === 'undefined') return

    observer = new ResizeObserver(() => {
      throttledResize()
    })
    observer.observe(elRef.value)
  }

  const stop = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  return {
    start,
    stop,
    isActive: () => observer !== null
  }
}
