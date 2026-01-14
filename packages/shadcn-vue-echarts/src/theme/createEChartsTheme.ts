import type { ShadcnTokens } from '../types'
import { resolveColor } from './resolveColor'

export function createEChartsTheme(tokens: ShadcnTokens): object {
  const borderColor = resolveColor(tokens.border, 0.6)
  const splitLineColor = resolveColor(tokens.border, 0.35)
  const bgColor = resolveColor(tokens.background)

  // Convert chart colors from raw HSL components to CSS colors
  const chartColors = tokens.chart.map(color => resolveColor(color) || color)

  return {
    color: chartColors,
    backgroundColor: bgColor,
    textStyle: {
      color: resolveColor(tokens.foreground),
      fontFamily: 'inherit'
    },
    title: {
      textStyle: {
        color: resolveColor(tokens.foreground)
      }
    },
    grid: {
      borderColor: borderColor
    },
    legend: {
      textStyle: {
        color: resolveColor(tokens.mutedForeground)
      }
    },
    tooltip: {
      borderColor: borderColor,
      backgroundColor: bgColor,
      textStyle: {
        color: resolveColor(tokens.foreground)
      },
      axisPointer: {
        lineStyle: {
          color: borderColor,
          width: 1
        },
        crossStyle: {
          color: borderColor,
          width: 1
        }
      }
    },
    line: {
      lineStyle: {
        width: 2
      },
      symbol: 'circle',
      symbolSize: 4
    },
    bar: {
      borderRadius: 0
    },
    pie: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      }
    },
    candlestick: {
      itemStyle: {
        color: tokens.chart[0],
        color0: tokens.chart[1],
        borderColor: tokens.chart[0],
        borderColor0: tokens.chart[1],
        borderWidth: 1
      }
    },
    gauge: {
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: tokens.foreground,
          width: 2
        }
      },
      axisLabel: {
        color: resolveColor(tokens.foreground)
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: tokens.foreground,
          width: 2
        }
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}',
        color: resolveColor(tokens.foreground)
      }
    },
    geo: {
      borderColor: borderColor,
      itemStyle: {
        areaColor: resolveColor(tokens.muted),
        borderColor: borderColor,
        borderWidth: 0.5
      },
      emphasis: {
        itemStyle: {
          areaColor: resolveColor(tokens.border, 0.5)
        }
      }
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: resolveColor(tokens.mutedForeground)
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: splitLineColor
        }
      }
    },
    valueAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: resolveColor(tokens.mutedForeground)
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      }
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: resolveColor(tokens.mutedForeground)
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      }
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: resolveColor(tokens.mutedForeground)
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: splitLineColor
        }
      }
    },
    angleAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: resolveColor(tokens.mutedForeground)
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      }
    },
    radiusAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: resolveColor(tokens.mutedForeground)
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      }
    },
    radar: {
      itemStyle: {
        borderWidth: 1
      },
      lineStyle: {
        width: 2
      },
      symbolSize: 4
    },
    scatter: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      }
    },
    graph: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      },
      lineStyle: {
        width: 1,
        color: borderColor
      },
      symbolSize: 4,
      smooth: false
    },
    map: {
      itemStyle: {
        areaColor: resolveColor(tokens.muted),
        borderColor: borderColor,
        borderWidth: 0.5
      },
      emphasis: {
        itemStyle: {
          areaColor: resolveColor(tokens.border, 0.5)
        }
      }
    },
    toolbox: {
      iconStyle: {
        borderColor: resolveColor(tokens.foreground)
      },
      emphasis: {
        iconStyle: {
          borderColor: resolveColor(tokens.foreground)
        }
      }
    },
    timeline: {
      lineStyle: {
        color: borderColor,
        width: 1
      },
      itemStyle: {
        color: tokens.chart[0],
        borderWidth: 1
      },
      controlStyle: {
        color: resolveColor(tokens.foreground),
        borderColor: borderColor,
        borderWidth: 0.5
      },
      checkpointStyle: {
        color: tokens.chart[0],
        borderColor: tokens.chart[0]
      },
      label: {
        color: resolveColor(tokens.foreground)
      },
      emphasis: {
        itemStyle: {
          color: tokens.chart[0]
        },
        controlStyle: {
          color: resolveColor(tokens.foreground),
          borderColor: borderColor,
          borderWidth: 0.5
        },
        label: {
          color: resolveColor(tokens.foreground)
        }
      }
    },
    visualMap: {
      textStyle: {
        color: resolveColor(tokens.foreground)
      }
    },
    dataZoom: {
      backgroundColor: 'rgba(0,0,0,0)',
      dataBackgroundColor: resolveColor(tokens.border, 0.1),
      fillerColor: resolveColor(tokens.border, 0.2),
      handleColor: resolveColor(tokens.foreground),
      handleSize: '100%',
      textStyle: {
        color: resolveColor(tokens.foreground)
      }
    },
    markPoint: {
      label: {
        color: resolveColor(tokens.popoverForeground)
      }
    },
    parallel: {
      itemStyle: {
        borderColor: borderColor,
        borderWidth: 1
      }
    }
  }
}
