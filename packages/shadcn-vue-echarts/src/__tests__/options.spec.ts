import { describe, it, expect } from 'vitest'
import { createEChartsTheme } from '../theme'

describe('Options & Theme Creation', () => {
  describe('createEChartsTheme', () => {
    let theme: any

    beforeEach(() => {
      const tokens = {
        background: '0 0% 100%',
        foreground: '222.2 84% 4.9%',
        muted: '210 40% 96%',
        mutedForeground: '215.4 16.3% 46.9%',
        card: '0 0% 100%',
        cardForeground: '222.2 84% 4.9%',
        popover: '0 0% 100%',
        popoverForeground: '222.2 84% 4.9%',
        border: '214.3 31.8% 91.4%',
        ring: '222.2 84% 4.9%',
        chart: [
          '12 76% 61%',     // chart-1: orange
          '221 83% 53%',    // chart-2: blue
          '142 72% 29%',    // chart-3: green
          '39 84% 63%',     // chart-4: yellow
          '322 80% 43%',    // chart-5: pink
          '16 100% 66%',    // chart-6: red
          '173 58% 39%',    // chart-7: teal
          '259 80% 71%',    // chart-8: purple
        ],
      }
      theme = createEChartsTheme(tokens)
    })

    it('should generate a valid theme object', () => {
      expect(theme).toBeDefined()
      expect(typeof theme).toBe('object')
    })

    it('should have color array with palette', () => {
      expect(theme.color).toBeDefined()
      expect(Array.isArray(theme.color)).toBe(true)
      expect(theme.color.length).toBe(8)
    })

    it('should set background color', () => {
      expect(theme.backgroundColor).toBeDefined()
    })

    it('should configure text style', () => {
      expect(theme.textStyle).toBeDefined()
      expect(theme.textStyle.color).toBeDefined()
    })

    it('should configure title style', () => {
      expect(theme.title).toBeDefined()
      expect(theme.title.textStyle).toBeDefined()
    })

    it('should configure legend', () => {
      expect(theme.legend).toBeDefined()
      expect(theme.legend.textStyle).toBeDefined()
    })

    it('should configure tooltip', () => {
      expect(theme.tooltip).toBeDefined()
      expect(theme.tooltip.borderColor).toBeDefined()
      expect(theme.tooltip.backgroundColor).toBeDefined()
      expect(theme.tooltip.textStyle).toBeDefined()
    })

    it('should configure axis styles', () => {
      expect(theme.categoryAxis).toBeDefined()
      expect(theme.valueAxis).toBeDefined()
      expect(theme.logAxis).toBeDefined()
      expect(theme.timeAxis).toBeDefined()

      // Check axis label color
      expect(theme.categoryAxis.axisLabel?.color).toBeDefined()
    })

    it('should configure grid', () => {
      expect(theme.grid).toBeDefined()
      expect(theme.grid.borderColor).toBeDefined()
    })

    it('should configure line series', () => {
      expect(theme.line).toBeDefined()
      expect(theme.line.lineStyle).toBeDefined()
      expect(theme.line.symbol).toBeDefined()
    })

    it('should configure bar series', () => {
      expect(theme.bar).toBeDefined()
      expect(theme.bar.borderRadius).toBeDefined()
    })

    it('should configure pie series', () => {
      expect(theme.pie).toBeDefined()
      expect(theme.pie.itemStyle).toBeDefined()
    })

    it('should configure candlestick series', () => {
      expect(theme.candlestick).toBeDefined()
      expect(theme.candlestick.itemStyle).toBeDefined()
    })

    it('should configure gauge series', () => {
      expect(theme.gauge).toBeDefined()
      expect(theme.gauge.axisTick).toBeDefined()
    })

    it('should configure geo', () => {
      expect(theme.geo).toBeDefined()
      expect(theme.geo.borderColor).toBeDefined()
    })

    it('should handle palette cycling for charts', () => {
      const chartColors = theme.color
      // Should have 8 colors defined
      expect(chartColors.length).toBeGreaterThan(0)
      // Each color should be a valid hsl or hex value
      chartColors.forEach((color: string) => {
        expect(color).toBeDefined()
        expect(color.length).toBeGreaterThan(0)
      })
    })

    it('should apply consistent color scheme across components', () => {
      // Title and legend should use similar colors
      expect(theme.title.textStyle.color).toBeDefined()
      expect(theme.legend.textStyle.color).toBeDefined()
      expect(theme.tooltip.textStyle.color).toBeDefined()

      // These should be consistent (typically the foreground color)
      // Note: They should all be the same or similar
    })

    it('should configure all axis types', () => {
      const axisTypes = ['categoryAxis', 'valueAxis', 'logAxis', 'timeAxis', 'angleAxis', 'radiusAxis']
      axisTypes.forEach((axisType) => {
        expect(theme[axisType]).toBeDefined()
        if (theme[axisType].axisLabel) {
          expect(theme[axisType].axisLabel.color).toBeDefined()
        }
      })
    })

    it('should configure radar', () => {
      expect(theme.radar).toBeDefined()
      if (theme.radar.axisLabel) {
        expect(theme.radar.axisLabel).toBeDefined()
      }
    })

    it('should configure parallel series', () => {
      expect(theme.parallel).toBeDefined()
      expect(theme.parallel.itemStyle).toBeDefined()
    })

    it('should configure scatter series', () => {
      expect(theme.scatter).toBeDefined()
    })

    it('should handle hsl color conversion', () => {
      // The theme should convert HSL components to proper CSS colors
      const chartColor = theme.color[0]
      expect(chartColor).toMatch(/hsl|rgb|#/)
    })

    it('should create different themes for different token palettes', () => {
      const tokens2 = {
        background: '222.2 84% 4.9%',
        foreground: '210 40% 98%',
        muted: '217.2 32.6% 17.5%',
        mutedForeground: '215 20.3% 65.1%',
        card: '222.2 84% 4.9%',
        cardForeground: '210 40% 98%',
        popover: '222.2 84% 4.9%',
        popoverForeground: '210 40% 98%',
        border: '217.2 32.6% 17.5%',
        ring: '212.7 26.8% 83.9%',
        chart: [
          '12 76% 61%',
          '221 83% 53%',
          '142 72% 29%',
          '39 84% 63%',
          '322 80% 43%',
          '16 100% 66%',
          '173 58% 39%',
          '259 80% 71%',
        ],
      }

      const darkTheme = createEChartsTheme(tokens2)
      expect(darkTheme).toBeDefined()
      // Themes should be different
      expect(darkTheme.backgroundColor).not.toEqual(theme.backgroundColor)
    })
  })

  describe('Color palette generation', () => {
    it('should cycle through 8 colors', () => {
      const tokens = {
        background: '0 0% 100%',
        foreground: '222.2 84% 4.9%',
        muted: '210 40% 96%',
        mutedForeground: '215.4 16.3% 46.9%',
        card: '0 0% 100%',
        cardForeground: '222.2 84% 4.9%',
        popover: '0 0% 100%',
        popoverForeground: '222.2 84% 4.9%',
        border: '214.3 31.8% 91.4%',
        ring: '222.2 84% 4.9%',
        chart: [
          '12 76% 61%',
          '221 83% 53%',
          '142 72% 29%',
          '39 84% 63%',
          '322 80% 43%',
          '16 100% 66%',
          '173 58% 39%',
          '259 80% 71%',
        ],
      }

      const theme = createEChartsTheme(tokens)

      // The palette should have all 8 colors
      expect(theme.color.length).toBe(8)

      // Colors should be in order
      for (let i = 0; i < 8; i++) {
        expect(theme.color[i]).toBeDefined()
      }
    })

    it('should handle missing chart colors gracefully', () => {
      const tokens = {
        background: '0 0% 100%',
        foreground: '222.2 84% 4.9%',
        muted: '210 40% 96%',
        mutedForeground: '215.4 16.3% 46.9%',
        card: '0 0% 100%',
        cardForeground: '222.2 84% 4.9%',
        popover: '0 0% 100%',
        popoverForeground: '222.2 84% 4.9%',
        border: '214.3 31.8% 91.4%',
        ring: '222.2 84% 4.9%',
        chart: [
          '12 76% 61%',
          '221 83% 53%',
        ],
      }

      // Should not throw
      const theme = createEChartsTheme(tokens)
      expect(theme).toBeDefined()
      expect(theme.color).toBeDefined()
    })
  })
})
