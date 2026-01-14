import type { EChartsOption } from 'echarts'
import type { ShadcnTokens } from '../types'
import { resolveColor } from './resolveColor'

export function withShadcnDefaults(option: EChartsOption, tokens: ShadcnTokens): EChartsOption {
  const merged = JSON.parse(JSON.stringify(option)) as EChartsOption

  // Color palette - convert raw HSL components to CSS colors
  if (!merged.color) {
    merged.color = tokens.chart.map(c => resolveColor(c) || c)
  }

  // Text style
  if (!merged.textStyle) {
    merged.textStyle = {}
  }
  if (!merged.textStyle.color) {
    merged.textStyle.color = resolveColor(tokens.foreground)
  }
  if (!merged.textStyle.fontFamily) {
    merged.textStyle.fontFamily = 'inherit'
  }

  // Title
  if (!merged.title) {
    merged.title = {}
  }
  if (Array.isArray(merged.title)) {
    merged.title = merged.title.map((t) => ({
      ...t,
      textStyle: {
        color: resolveColor(tokens.foreground),
        ...t.textStyle
      }
    }))
  } else {
    merged.title.textStyle = {
      color: resolveColor(tokens.foreground),
      ...(merged.title.textStyle || {})
    }
  }

  // Legend
  if (!merged.legend) {
    merged.legend = {}
  }
  if (Array.isArray(merged.legend)) {
    merged.legend = merged.legend.map((l) => ({
      ...l,
      textStyle: {
        color: resolveColor(tokens.mutedForeground),
        ...l.textStyle
      }
    }))
  } else {
    merged.legend.textStyle = {
      color: resolveColor(tokens.mutedForeground),
      ...(merged.legend.textStyle || {})
    }
  }

  // Axis
  if (!merged.xAxis) merged.xAxis = {}
  if (!merged.yAxis) merged.yAxis = {}

  const borderColor = resolveColor(tokens.border, 0.6) || tokens.border
  const splitLineColor = resolveColor(tokens.border, 0.35) || tokens.border
  const mutedFgColor = resolveColor(tokens.mutedForeground) || tokens.mutedForeground

  for (const axis of [merged.xAxis, merged.yAxis]) {
    if (Array.isArray(axis)) {
      axis.forEach((a) => applyAxisDefaults(a, borderColor, splitLineColor, mutedFgColor))
    } else {
      applyAxisDefaults(axis, borderColor, splitLineColor, mutedFgColor)
    }
  }

  // Tooltip
  if (!merged.tooltip) {
    merged.tooltip = {}
  }
  if (!Array.isArray(merged.tooltip)) {
    merged.tooltip.backgroundColor = resolveColor(tokens.popover)
    merged.tooltip.borderColor = resolveColor(tokens.border, 0.6)
    merged.tooltip.textStyle = {
      color: resolveColor(tokens.popoverForeground),
      ...merged.tooltip.textStyle
    }
  }

  // Grid
  if (!merged.grid) {
    merged.grid = {}
  }
  if (Array.isArray(merged.grid)) {
    merged.grid.forEach((g) => {
      g.containLabel = true
    })
  } else {
    merged.grid.containLabel = true
  }

  return merged
}

function applyAxisDefaults(
  axis: any,
  borderColor: string,
  splitLineColor: string,
  labelColor: string
) {
  if (!axis) return

  if (!axis.axisLine) axis.axisLine = {}
  if (!axis.axisLine.lineStyle) axis.axisLine.lineStyle = {}
  if (!axis.axisLine.lineStyle.color) axis.axisLine.lineStyle.color = borderColor

  if (!axis.axisLabel) axis.axisLabel = {}
  if (!axis.axisLabel.color) axis.axisLabel.color = labelColor

  if (!axis.splitLine) axis.splitLine = {}
  if (!axis.splitLine.lineStyle) axis.splitLine.lineStyle = {}
  if (!axis.splitLine.lineStyle.color) axis.splitLine.lineStyle.color = splitLineColor
}
