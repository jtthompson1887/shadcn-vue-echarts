export function isHslComponent(value: string): boolean {
  return /^\d+\.?\d*\s+\d+\.?\d*%\s+\d+\.?\d*%$/.test(value.trim())
}

export function resolveColor(value: string, alpha?: number): string {
  if (!value) return ''

  const trimmed = value.trim()

  // Handle HSL component format (e.g., "222.2 84% 4.9%")
  if (isHslComponent(trimmed)) {
    const parts = trimmed.split(/\s+/)
    const h = parts[0]
    const s = parts[1].replace('%', '')
    const l = parts[2].replace('%', '')

    if (alpha !== undefined) {
      if (alpha === 1) {
        return `hsl(${h}, ${s}%, ${l}%)`
      }
      return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
    }
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  // Handle hex colors with alpha
  if (trimmed.startsWith('#') && alpha !== undefined) {
    const hex = trimmed.slice(1)
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  // Handle rgb/rgba colors with alpha
  if (trimmed.startsWith('rgb(') && alpha !== undefined) {
    const withoutParen = trimmed.slice(4, -1)
    const parts = withoutParen.split(',').map(p => p.trim())
    return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`
  }

  return trimmed
}
