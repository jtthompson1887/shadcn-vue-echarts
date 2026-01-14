import type { ShadcnTokens } from '../types'
import { readCssVar } from './cssVars'
import { resolveColor } from './resolveColor'

const DEFAULT_CHART_COLORS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899'
]

export function readShadcnTokens(el?: Element): ShadcnTokens {
  const source = el || (typeof document !== 'undefined' ? document.documentElement : null)

  if (!source) {
    return {
      background: '#ffffff',
      foreground: '#000000',
      muted: '#f5f5f5',
      mutedForeground: '#666666',
      card: '#ffffff',
      cardForeground: '#000000',
      popover: '#ffffff',
      popoverForeground: '#000000',
      border: '#e5e5e5',
      ring: '#3b82f6',
      chart: DEFAULT_CHART_COLORS
    }
  }

  const background = resolveColor(readCssVar(source, '--background') || '')
  const foreground = resolveColor(readCssVar(source, '--foreground') || '')
  const muted = resolveColor(readCssVar(source, '--muted') || '')
  const mutedForeground = resolveColor(readCssVar(source, '--muted-foreground') || '')
  const card = resolveColor(readCssVar(source, '--card') || '')
  const cardForeground = resolveColor(readCssVar(source, '--card-foreground') || '')
  const popover = resolveColor(readCssVar(source, '--popover') || '')
  const popoverForeground = resolveColor(readCssVar(source, '--popover-foreground') || '')
  const border = resolveColor(readCssVar(source, '--border') || '')
  const ring = resolveColor(readCssVar(source, '--ring') || '')

  const chart = Array.from({ length: 8 }, (_, i) => {
    const varName = `--chart-${i + 1}`
    const value = readCssVar(source, varName)
    return value ? resolveColor(value) : DEFAULT_CHART_COLORS[i]
  })

  return {
    background,
    foreground,
    muted,
    mutedForeground,
    card,
    cardForeground,
    popover,
    popoverForeground,
    border,
    ring,
    chart
  }
}
