import type { ShadcnTokens } from '../types'
import { resolveColor } from './resolveColor'

export function createEChartsTheme(tokens: ShadcnTokens): object {
  const borderColor = resolveColor(tokens.border, 0.6)
  const splitLineColor = resolveColor(tokens.border, 0.35)

  return {
    color: tokens.chart,
    backgroundColor: tokens.background,
    textStyle: {
      color: tokens.foreground,
      fontFamily: 'inherit'
    },
    title: {
      textStyle: {
        color: tokens.foreground
      }
    },
    line: {
      itemStyle: {
        borderWidth: 1
      },
      lineStyle: {
        width: 2
      },
      symbolSize: 4
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
    bar: {
      itemStyle: {
        barBorderWidth: 0,
        barBorderColor: borderColor
      }
    },
    pie: {
      itemStyle: {
        borderWidth: 0,
        borderColor: borderColor
      }
    },
    scatter: {
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
        areaColor: tokens.muted,
        borderColor: borderColor,
        borderWidth: 0.5
      },
      emphasis: {
        itemStyle: {
          areaColor: resolveColor(tokens.border, 0.5)
        }
      }
    },
    geo: {
      itemStyle: {
        areaColor: tokens.muted,
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
        color: tokens.mutedForeground
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: splitLineColor
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [resolveColor(tokens.border, 0.1)]
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
        color: tokens.mutedForeground
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [resolveColor(tokens.border, 0.1)]
        }
      }
    },
    logAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: borderColor
        }
      },
      axisLabel: {
        show: true,
        color: tokens.mutedForeground
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: splitLineColor
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [resolveColor(tokens.border, 0.1)]
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
        color: tokens.mutedForeground
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: splitLineColor
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: [resolveColor(tokens.border, 0.1)]
        }
      }
    },
    toolbox: {
      iconStyle: {
        borderColor: tokens.foreground
      },
      emphasis: {
        iconStyle: {
          borderColor: tokens.foreground
        }
      }
    },
    legend: {
      textStyle: {
        color: tokens.mutedForeground
      }
    },
    tooltip: {
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
        color: tokens.foreground,
        borderColor: borderColor,
        borderWidth: 0.5
      },
      checkpointStyle: {
        color: tokens.chart[0],
        borderColor: tokens.chart[0]
      },
      label: {
        color: tokens.foreground
      },
      emphasis: {
        itemStyle: {
          color: tokens.chart[0]
        },
        controlStyle: {
          color: tokens.foreground,
          borderColor: borderColor,
          borderWidth: 0.5
        },
        label: {
          color: tokens.foreground
        }
      }
    },
    visualMap: {
      textStyle: {
        color: tokens.foreground
      }
    },
    dataZoom: {
      backgroundColor: 'rgba(0,0,0,0)',
      dataBackgroundColor: resolveColor(tokens.border, 0.1),
      fillerColor: resolveColor(tokens.border, 0.2),
      handleColor: tokens.foreground,
      handleSize: '100%',
      textStyle: {
        color: tokens.foreground
      }
    },
    markPoint: {
      label: {
        color: tokens.popoverForeground
      }
    }
  }
}
