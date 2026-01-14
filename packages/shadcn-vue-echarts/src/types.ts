import type { EChartsOption } from 'echarts'

export type ChartThemeMode = 'auto' | 'light' | 'dark'

export interface ShadcnTokens {
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  border: string
  ring: string
  chart: string[]
}

export interface ChartProps {
  option: EChartsOption
  echarts?: any
  renderer?: 'canvas' | 'svg'
  autoresize?: boolean
  initOnNonZeroSize?: boolean
  themeMode?: ChartThemeMode
  themeStrategy?: 'option' | 'echartsTheme'
  themeName?: string
  themeObject?: object
  updateMode?: 'replace' | 'merge'
  notMerge?: boolean
  lazyUpdate?: boolean
  watch?: 'shallow' | 'deep'
  loading?: boolean | {
    text?: string
    color?: string
    maskColor?: string
  }
  group?: string
  connectGroup?: boolean | string
  events?: Record<string, (params: any) => void>
  minHeight?: number | string
  debug?: boolean
}

export interface ChartExpose {
  getInstance(): any | null
  setOption(option: EChartsOption, opts?: {
    notMerge?: boolean
    lazyUpdate?: boolean
  }): void
  resize(opts?: { width?: number; height?: number }): void
  dispose(): void
}
