export function isHslComponent(value: string): boolean {
  return /^\d+\.?\d*\s+\d+\.?\d*%\s+\d+\.?\d*%$/.test(value.trim())
}

export function resolveColor(value?: string, alpha?: number): string | undefined {
  if (!value) return undefined

  const v = String(value).trim()

  // Handle hex colors with alpha conversion
  if (v.startsWith('#')) {
    if (alpha != null) {
      const hex = v.slice(1)
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    return v
  }

  // Handle rgb colors with alpha conversion
  if (v.startsWith('rgb(')) {
    if (alpha != null && !v.includes('rgba')) {
      // rgb(...) -> rgba(...) by replacing ) with , alpha)
      return v.replace(/rgb\(/, 'rgba(').replace(/\)$/, `, ${alpha})`)
    }
    if (alpha != null && v.includes('rgba')) {
      // Replace existing rgba alpha
      return v.replace(/rgba\(([^,]+),\s*([^,]+),\s*([^,]+),\s*[^)]+\)/, `rgba($1, $2, $3, ${alpha})`)
    }
    return v
  }

  // Handle hsl colors with alpha conversion
  if (v.startsWith('hsl(')) {
    if (alpha != null) {
      return v.replace(/hsl\(/, 'hsla(').replace(/\)$/, `, ${alpha})`)
    }
    return v
  }

  // Handle hsla colors with alpha replacement
  if (v.startsWith('hsla(')) {
    if (alpha != null) {
      return v.replace(/hsla\(([^,]+),\s*([^,]+),\s*([^,]+),\s*[^)]+\)/, `hsla($1, $2, $3, ${alpha})`)
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
