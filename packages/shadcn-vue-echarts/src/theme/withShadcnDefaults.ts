import type { EChartsOption } from 'echarts'
import type { ShadcnTokens } from '../types'
import { resolveColor } from './resolveColor'

export function withShadcnDefaults(option: EChartsOption, tokens: ShadcnTokens): EChartsOption {
  const merged = JSON.parse(JSON.stringify(option)) as EChartsOption

  // Color palette
  if (!merged.color) {
    merged.color = tokens.chart
  }

  // Text style
  if (!merged.textStyle) {
    merged.textStyle = {}
  }
  if (!merged.textStyle.color) {
    merged.textStyle.color = tokens.foreground
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
        color: tokens.foreground,
        ...t.textStyle
      }
    }))
  } else {
    merged.title.textStyle = {
      color: tokens.foreground,
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
        color: tokens.mutedForeground,
        ...l.textStyle
      }
    }))
  } else {
    merged.legend.textStyle = {
      color: tokens.mutedForeground,
      ...(merged.legend.textStyle || {})
    }
  }

  // Axis
  if (!merged.xAxis) merged.xAxis = {}
  if (!merged.yAxis) merged.yAxis = {}

  const borderColor = resolveColor(tokens.border, 0.6)
  const splitLineColor = resolveColor(tokens.border, 0.35)

  for (const axis of [merged.xAxis, merged.yAxis]) {
    if (Array.isArray(axis)) {
      axis.forEach((a) => applyAxisDefaults(a, borderColor, splitLineColor, tokens.mutedForeground))
    } else {
      applyAxisDefaults(axis, borderColor, splitLineColor, tokens.mutedForeground)
    }
  }

  // Tooltip
  if (!merged.tooltip) {
    merged.tooltip = {}
  }
  merged.tooltip.backgroundColor = tokens.popover
  merged.tooltip.borderColor = resolveColor(tokens.border, 0.6)
  merged.tooltip.textStyle = {
    color: tokens.popoverForeground,
    ...merged.tooltip.textStyle
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
