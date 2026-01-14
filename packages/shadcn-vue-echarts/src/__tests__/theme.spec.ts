import { describe, it, expect, beforeEach } from 'vitest'
import { resolveColor, isHslComponent, readShadcnTokens, withShadcnDefaults } from '../theme'

describe('Theme Utilities', () => {
  describe('isHslComponent', () => {
    it('should detect valid HSL component format', () => {
      expect(isHslComponent('222.2 84% 4.9%')).toBe(true)
      expect(isHslComponent('0 0% 100%')).toBe(true)
      expect(isHslComponent('12 76% 61%')).toBe(true)
    })

    it('should reject invalid formats', () => {
      expect(isHslComponent('#000000')).toBe(false)
      expect(isHslComponent('rgb(0, 0, 0)')).toBe(false)
      expect(isHslComponent('not a color')).toBe(false)
      expect(isHslComponent('')).toBe(false)
    })
  })

  describe('resolveColor', () => {
    it('should convert HSL component to hsl() function', () => {
      expect(resolveColor('222.2 84% 4.9%')).toBe('hsl(222.2, 84%, 4.9%)')
    })

    it('should apply alpha to HSL component', () => {
      expect(resolveColor('222.2 84% 4.9%', 0.5)).toBe('hsla(222.2, 84%, 4.9%, 0.5)')
    })

    it('should apply alpha to hex colors', () => {
      expect(resolveColor('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
    })

    it('should apply alpha to rgb colors', () => {
      expect(resolveColor('rgb(0, 0, 0)', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
    })

    it('should pass through non-HSL colors with alpha', () => {
      // When alpha is provided but format is not HSL, should add alpha support
      const result = resolveColor('var(--custom)', 0.5)
      expect(result).toBeDefined()
    })

    it('should handle edge case alphas', () => {
      expect(resolveColor('222.2 84% 4.9%', 0)).toBe('hsla(222.2, 84%, 4.9%, 0)')
      expect(resolveColor('222.2 84% 4.9%', 1)).toBe('hsl(222.2, 84%, 4.9%)')
    })
  })

  describe('readShadcnTokens', () => {
    let mockEl: HTMLElement

    beforeEach(() => {
      // Create a mock element with CSS variables
      mockEl = document.createElement('div')
      const style = `
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --card: 0 0% 100%;
        --card-foreground: 222.2 84% 4.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 222.2 84% 4.9%;
        --muted: 210 40% 96%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --accent: 210 40% 96%;
        --accent-foreground: 222.2 47.6% 11.2%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;
        --border: 214.3 31.8% 91.4%;
        --ring: 222.2 84% 4.9%;
        --chart-1: 12 76% 61%;
        --chart-2: 221 83% 53%;
        --chart-3: 142 72% 29%;
        --chart-4: 39 84% 63%;
        --chart-5: 322 80% 43%;
        --chart-6: 16 100% 66%;
        --chart-7: 173 58% 39%;
        --chart-8: 259 80% 71%;
      `
      mockEl.setAttribute('style', style)
      document.body.appendChild(mockEl)
    })

    it('should read all tokens from element', () => {
      const tokens = readShadcnTokens(mockEl)
      expect(tokens.background).toBe('0 0% 100%')
      expect(tokens.foreground).toBe('222.2 84% 4.9%')
      expect(tokens.card).toBe('0 0% 100%')
    })

    it('should read chart colors', () => {
      const tokens = readShadcnTokens(mockEl)
      expect(tokens.chart.length).toBe(8)
      expect(tokens.chart[0]).toBe('12 76% 61%')
      expect(tokens.chart[7]).toBe('259 80% 71%')
    })

    it('should return all expected token keys', () => {
      const tokens = readShadcnTokens(mockEl)
      expect(tokens).toHaveProperty('background')
      expect(tokens).toHaveProperty('foreground')
      expect(tokens).toHaveProperty('muted')
      expect(tokens).toHaveProperty('mutedForeground')
      expect(tokens).toHaveProperty('card')
      expect(tokens).toHaveProperty('cardForeground')
      expect(tokens).toHaveProperty('popover')
      expect(tokens).toHaveProperty('popoverForeground')
      expect(tokens).toHaveProperty('border')
      expect(tokens).toHaveProperty('ring')
      expect(tokens).toHaveProperty('chart')
    })

    it('should use fallback palette when variables missing', () => {
      const emptyEl = document.createElement('div')
      const tokens = readShadcnTokens(emptyEl)
      expect(tokens.chart.length).toBe(8)
      // Should have default colors
      expect(tokens.chart[0]).toBeDefined()
    })
  })

  describe('withShadcnDefaults', () => {
    it('should not clobber user-provided option values', () => {
      const userOption = {
        color: ['#FF0000', '#00FF00'],
        textStyle: { color: '#000000' },
        title: { text: 'My Chart' },
      }

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
        chart: ['12 76% 61%', '221 83% 53%'],
      }

      const result = withShadcnDefaults(userOption, tokens)

      // User colors should be preserved
      expect(result.color).toEqual(['#FF0000', '#00FF00'])
      expect(result.textStyle?.color).toBe('#000000')
      expect(result.title?.text).toBe('My Chart')
    })

    it('should merge defaults for missing properties', () => {
      const userOption = {
        series: [{ data: [1, 2, 3] }],
      }

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
        chart: ['12 76% 61%', '221 83% 53%'],
      }

      const result = withShadcnDefaults(userOption, tokens)

      // Should have default color array
      expect(result.color).toBeDefined()
      expect(Array.isArray(result.color)).toBe(true)
    })

    it('should handle deep nested structures', () => {
      const userOption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed'],
          axisLine: {
            lineStyle: { color: '#FF0000' },
          },
        },
      }

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
        chart: ['12 76% 61%', '221 83% 53%'],
      }

      const result = withShadcnDefaults(userOption, tokens)

      // User nested value should be preserved
      expect(result.xAxis?.axisLine?.lineStyle?.color).toBe('#FF0000')
      expect(result.xAxis?.data).toEqual(['Mon', 'Tue', 'Wed'])
    })

    it('should not mutate original option', () => {
      const userOption = { color: ['#FF0000'] }
      const originalColor = [...userOption.color]

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
        chart: ['12 76% 61%', '221 83% 53%'],
      }

      withShadcnDefaults(userOption, tokens)

      expect(userOption.color).toEqual(originalColor)
    })
  })
})
