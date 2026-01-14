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
      background: '0 0% 100%',
      foreground: '0 0% 0%',
      muted: '210 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      card: '0 0% 100%',
      cardForeground: '0 0% 0%',
      popover: '0 0% 100%',
      popoverForeground: '0 0% 0%',
      border: '214.3 31.8% 91.4%',
      ring: '222.2 84% 4.9%',
      chart: DEFAULT_CHART_COLORS
    }
  }

  // Read raw HSL component values (without hsl() wrapper)
  const background = readCssVar(source, '--background')?.trim() || '0 0% 100%'
  const foreground = readCssVar(source, '--foreground')?.trim() || '0 0% 0%'
  const muted = readCssVar(source, '--muted')?.trim() || '210 40% 96%'
  const mutedForeground = readCssVar(source, '--muted-foreground')?.trim() || '215.4 16.3% 46.9%'
  const card = readCssVar(source, '--card')?.trim() || '0 0% 100%'
  const cardForeground = readCssVar(source, '--card-foreground')?.trim() || '0 0% 0%'
  const popover = readCssVar(source, '--popover')?.trim() || '0 0% 100%'
  const popoverForeground = readCssVar(source, '--popover-foreground')?.trim() || '0 0% 0%'
  const border = readCssVar(source, '--border')?.trim() || '214.3 31.8% 91.4%'
  const ring = readCssVar(source, '--ring')?.trim() || '222.2 84% 4.9%'

  const chart = Array.from({ length: 8 }, (_, i) => {
    const varName = `--chart-${i + 1}`
    const value = readCssVar(source, varName)
    return value?.trim() || DEFAULT_CHART_COLORS[i]
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
