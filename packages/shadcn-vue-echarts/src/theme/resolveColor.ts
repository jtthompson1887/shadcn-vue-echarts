export function isHslComponent(value: string): boolean {
  return /^\d+\.?\d*\s+\d+\.?\d*%\s+\d+\.?\d*%$/.test(value.trim())
}

export function resolveColor(value?: string, alpha?: number): string | undefined {
  if (!value) return undefined

  const v = String(value).trim()

  // If already a hex, rgb, rgba, hsl or hsla string
  if (/^(#|rgb|rgba|hsl|hsla)/i.test(v)) {
    if (alpha != null) {
      if (/^hsl\(/i.test(v)) {
        // hsl(...) -> hsla(...) by replacing ) with , alpha)
        return v.replace(/\)$/, `, ${alpha})`)
      }
      if (/^hsla\(/i.test(v)) {
        // Replace existing hsla alpha with new one
        return v.replace(/hsla\(([^,]+),\s*([^,]+),\s*([^,]+),\s*[^)]+\)/, `hsla($1, $2, $3, ${alpha})`)
      }
      if (/^rgb\(/i.test(v) && !/a/.test(v)) {
        // rgb(...) -> rgba(...)
        return v.replace(/\)$/, `, ${alpha})`)
      }
      if (/^rgba\(/i.test(v)) {
        // Replace existing rgba alpha
        return v.replace(/rgba\(([^,]+),\s*([^,]+),\s*([^,]+),\s*[^)]+\)/, `rgba($1, $2, $3, ${alpha})`)
      }
    }
    return v
  }

  // Raw HSL components: e.g. "12 76% 61%" or "12 76% 61% / 0.5"
  if (isHslComponent(v) || /^\d+\.?\d*\s+\d+\.?\d*%\s+\d+\.?\d*%\s*\/\s*[\d.]+$/.test(v)) {
    if (v.includes('/')) {
      // Already has alpha in new CSS syntax "h s l / a"
      if (alpha != null && alpha !== 1) {
        // Override with provided alpha
        const parts = v.split('/')
        return `hsl(${parts[0].trim()} / ${alpha})`
      }
      return `hsl(${v})`
    }

    // Convert space-separated to comma-separated for legacy hsla syntax
    const parts = v.split(/\s+/)
    const h = parts[0]
    const s = parts[1].replace('%', '')
    const l = parts[2].replace('%', '')

    if (alpha != null && alpha !== 1) {
      return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
    }

    return `hsl(${h}, ${s}%, ${l}%)`
  }

  // Fallback: return the original string
  return v
}
