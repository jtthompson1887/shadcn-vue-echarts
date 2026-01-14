export function rafThrottle(fn: () => void): () => void {
  let rafId: number | null = null

  return () => {
    if (rafId === null) {
      rafId = typeof requestAnimationFrame !== 'undefined'
        ? requestAnimationFrame(() => {
          fn()
          rafId = null
        })
        : (setTimeout(() => {
          fn()
          rafId = null
        }, 16) as unknown as number)
    }
  }
}
