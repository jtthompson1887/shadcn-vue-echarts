export function readCssVar(el: Element | null, varName: string): string | null {
  if (!el) return null
  try {
    return getComputedStyle(el).getPropertyValue(varName).trim() || null
  } catch {
    return null
  }
}

export function readRootCssVar(varName: string): string | null {
  if (typeof document === 'undefined') return null
  return readCssVar(document.documentElement, varName)
}
