export function isHslComponent(value: string): boolean {
  return /^\d+\.?\d*\s+\d+\.?\d*%\s+\d+\.?\d*%$/.test(value.trim())
}

export function resolveColor(value: string, alpha?: number): string {
  if (!value) return ''

  const trimmed = value.trim()

  if (isHslComponent(trimmed)) {
    const alphaStr = alpha !== undefined ? ` / ${alpha}` : ''
    return `hsl(${trimmed}${alphaStr})`
  }

  if (trimmed.startsWith('hsl(') || trimmed.startsWith('rgb(') || trimmed.startsWith('#')) {
    if (alpha !== undefined && (trimmed.startsWith('hsl(') || trimmed.startsWith('rgb('))) {
      const withoutParen = trimmed.slice(0, -1)
      const alphaStr = trimmed.includes('/') ? '' : ` / ${alpha}`
      return `${withoutParen}${alphaStr})`
    }
    return trimmed
  }

  return trimmed
}
