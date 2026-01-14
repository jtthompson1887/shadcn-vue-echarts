import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Chart from '../components/Chart.vue'

interface MockInstance {
  init: ReturnType<typeof vi.fn>
  setOption: ReturnType<typeof vi.fn>
  getOption: ReturnType<typeof vi.fn>
  resize: ReturnType<typeof vi.fn>
  dispose: ReturnType<typeof vi.fn>
  showLoading: ReturnType<typeof vi.fn>
  hideLoading: ReturnType<typeof vi.fn>
  on: ReturnType<typeof vi.fn>
  off: ReturnType<typeof vi.fn>
  removeAllListeners: ReturnType<typeof vi.fn>
  getWidth: ReturnType<typeof vi.fn>
  getHeight: ReturnType<typeof vi.fn>
}

const mockECharts = {
  init: vi.fn(),
  registerTheme: vi.fn(),
  connect: vi.fn(),
  graphic: {
    LinearGradient: vi.fn((x1: number, y1: number, x2: number, y2: number, stops: unknown[]) => ({ type: 'linear', stops })),
  },
}

vi.mock('echarts', () => ({
  default: mockECharts,
}))

// Helper function to mount Chart with echarts mock
function mountChart(config = {}) {
  return mount(Chart, {
    ...config,
    props: {
      echarts: mockECharts,
      ...(config.props || {}),
    },
  })
}

describe('Chart Component', () => {
  let mockInstance: MockInstance
  let originalGetBoundingClientRect: typeof Element.prototype.getBoundingClientRect

  beforeEach(() => {
    // Mock getBoundingClientRect to return non-zero dimensions
    originalGetBoundingClientRect = Element.prototype.getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 800,
      height: 600,
      top: 0,
      left: 0,
      right: 800,
      bottom: 600,
      x: 0,
      y: 0,
      toJSON: () => ({})
    }))

    // Create a mock ECharts instance
    mockInstance = {
      init: vi.fn(),
      setOption: vi.fn(),
      getOption: vi.fn(() => ({ color: [] })),
      resize: vi.fn(),
      dispose: vi.fn(),
      showLoading: vi.fn(),
      hideLoading: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      removeAllListeners: vi.fn(),
      getWidth: vi.fn(() => 800),
      getHeight: vi.fn(() => 600),
    }

    mockECharts.init.mockReturnValue(mockInstance)
  })

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect
    vi.clearAllMocks()
  })

  describe('Component Mounting', () => {
    it('should mount successfully', () => {
      const wrapper = mountChart()
      expect(wrapper.exists()).toBe(true)
    })

    it('should render a div container', () => {
      const wrapper = mountChart()
      const div = wrapper.find('div')
      expect(div.exists()).toBe(true)
    })

    it('should apply minHeight style', () => {
      const wrapper = mountChart({
        props: {
          minHeight: 400,
        },
      })
      const div = wrapper.find('div')
      expect(div.attributes('style')).toContain('400px')
    })

    it('should apply class and style props', () => {
      const wrapper = mountChart({
        props: {
          class: 'custom-class',
          style: { padding: '10px' },
        },
      })
      const div = wrapper.find('div')
      expect(div.classes()).toContain('custom-class')
      expect(div.attributes('style')).toContain('padding: 10px')
    })
  })

  describe('Option Props', () => {
    it('should accept option prop', () => {
      const option = { xAxis: { type: 'category' } }
      const wrapper = mountChart({
        props: {
          option,
        },
      })
      expect(wrapper.props('option')).toEqual(option)
    })

    it('should handle empty option', async () => {
      const wrapper = mountChart()
      await flushPromises()
      expect(wrapper.exists()).toBe(true)
    })

    it('should update on option prop change', async () => {
      const wrapper = mountChart({
        props: {
          option: { color: ['#FF0000'] },
        },
      })

      await flushPromises()

      await wrapper.setProps({
        option: { color: ['#00FF00'] },
      })

      expect(mockInstance.setOption).toHaveBeenCalled()
    })
  })

  describe('Events', () => {
    it('should handle custom events prop', async () => {
      const clickHandler = vi.fn()
      const wrapper = mountChart({
        props: {
          events: {
            click: clickHandler,
          },
        },
      })

      await flushPromises()

      // Verify event handler was registered
      expect(mockInstance.on).toHaveBeenCalledWith('click', expect.any(Function))
    })

    it('should register event listeners on init', async () => {
      const handler1 = vi.fn()

      const wrapper = mountChart({
        props: {
          events: { click: handler1 },
        },
      })

      await flushPromises()

      // Event should be registered on init
      expect(mockInstance.on).toHaveBeenCalledWith('click', expect.any(Function))
    })

    it('should emit ready event when chart initializes', async () => {
      const wrapper = mountChart({
        props: {
          option: { series: [] },
        },
      })

      await flushPromises()

      expect(wrapper.emitted('ready')).toBeDefined()
    })

    it('should cleanup on unmount via dispose', async () => {
      const wrapper = mountChart({
        props: {
          events: {
            click: vi.fn(),
          },
        },
      })

      await flushPromises()

      wrapper.unmount()

      // ECharts dispose() handles all cleanup including event listeners
      expect(mockInstance.dispose).toHaveBeenCalled()
    })
  })

  describe('Expose Methods', () => {
    it('should expose getInstance method', async () => {
      const wrapper = mountChart()
      await flushPromises()

      const instance = wrapper.vm as any
      expect(instance.getInstance).toBeDefined()
      expect(instance.getInstance()).toBe(mockInstance)
    })

    it('should expose setOption method', async () => {
      const wrapper = mountChart()
      await flushPromises()

      const instance = wrapper.vm as any
      const option = { color: ['#FF0000'] }
      instance.setOption(option)

      expect(mockInstance.setOption).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
      )
    })

    it('should expose resize method', async () => {
      const wrapper = mountChart()
      await flushPromises()

      const instance = wrapper.vm as any
      instance.resize()

      expect(mockInstance.resize).toHaveBeenCalled()
    })

    it('should expose dispose method', async () => {
      const wrapper = mountChart()
      await flushPromises()

      const instance = wrapper.vm as any
      instance.dispose()

      expect(mockInstance.dispose).toHaveBeenCalled()
    })
  })

  describe('Loading State', () => {
    it('should show loading with boolean', async () => {
      const wrapper = mountChart({
        props: {
          loading: true,
        },
      })

      await flushPromises()

      expect(mockInstance.showLoading).toHaveBeenCalled()
    })

    it('should show loading on init when prop is true', async () => {
      const wrapper = mountChart({
        props: {
          loading: true,
        },
      })

      await flushPromises()

      // Loading should be shown during init
      expect(mockInstance.showLoading).toHaveBeenCalled()
    })

    it('should handle loading object with text', async () => {
      const wrapper = mountChart({
        props: {
          loading: {
            text: 'Loading data...',
          },
        },
      })

      await flushPromises()

      expect(mockInstance.showLoading).toHaveBeenCalled()
    })

    it('should handle loading object with color', async () => {
      const wrapper = mountChart({
        props: {
          loading: {
            text: 'Loading...',
            color: '#FF0000',
          },
        },
      })

      await flushPromises()

      expect(mockInstance.showLoading).toHaveBeenCalled()
    })
  })

  describe('Renderer Prop', () => {
    it('should accept renderer prop', () => {
      const wrapper = mountChart({
        props: {
          renderer: 'canvas',
        },
      })
      expect(wrapper.props('renderer')).toBe('canvas')
    })

    it('should use renderer when initializing', async () => {
      const wrapper = mountChart({
        props: {
          renderer: 'svg',
        },
      })

      await flushPromises()

      expect(mockECharts.init).toHaveBeenCalled()
      const initCall = mockECharts.init.mock.calls[0]
      // ec.init(element, theme, { renderer }) - renderer is in 3rd argument
      expect(initCall[2]).toEqual({ renderer: 'svg' })
    })
  })

  describe('Theme Props', () => {
    it('should accept themeMode prop', () => {
      const wrapper = mountChart({
        props: {
          themeMode: 'dark',
        },
      })
      expect(wrapper.props('themeMode')).toBe('dark')
    })

    it('should accept themeName prop', () => {
      const wrapper = mountChart({
        props: {
          themeName: 'custom-theme',
        },
      })
      expect(wrapper.props('themeName')).toBe('custom-theme')
    })

    it('should accept themeObject prop', () => {
      const theme = { color: ['#FF0000'] }
      const wrapper = mountChart({
        props: {
          themeObject: theme,
        },
      })
      expect(wrapper.props('themeObject')).toEqual(theme)
    })

    it('should accept themeStrategy prop', () => {
      const wrapper = mountChart({
        props: {
          themeStrategy: 'echartsTheme',
        },
      })
      expect(wrapper.props('themeStrategy')).toBe('echartsTheme')
    })
  })

  describe('Group/Sync Props', () => {
    it('should accept group prop', () => {
      const wrapper = mountChart({
        props: {
          group: 'chart-group',
        },
      })
      expect(wrapper.props('group')).toBe('chart-group')
    })

    it('should accept connectGroup prop', () => {
      const wrapper = mountChart({
        props: {
          connectGroup: 'connected-charts',
        },
      })
      expect(wrapper.props('connectGroup')).toBe('connected-charts')
    })
  })

  describe('Autoresize', () => {
    it('should accept autoresize prop', () => {
      const wrapper = mountChart({
        props: {
          autoresize: true,
        },
      })
      expect(wrapper.props('autoresize')).toBe(true)
    })

    it('should accept initOnNonZeroSize prop', () => {
      const wrapper = mountChart({
        props: {
          initOnNonZeroSize: true,
        },
      })
      expect(wrapper.props('initOnNonZeroSize')).toBe(true)
    })
  })

  describe('Update Mode', () => {
    it('should accept notMerge prop', () => {
      const wrapper = mountChart({
        props: {
          notMerge: true,
        },
      })
      expect(wrapper.props('notMerge')).toBe(true)
    })

    it('should accept lazyUpdate prop', () => {
      const wrapper = mountChart({
        props: {
          lazyUpdate: true,
        },
      })
      expect(wrapper.props('lazyUpdate')).toBe(true)
    })

    it('should accept watch prop', () => {
      const wrapper = mountChart({
        props: {
          watch: 'deep',
        },
      })
      expect(wrapper.props('watch')).toBe('deep')
    })
  })

  describe('Custom Echarts Instance', () => {
    it('should accept echarts prop', () => {
      const customEcharts = { init: vi.fn() }
      const wrapper = mountChart({
        props: {
          echarts: customEcharts,
        },
      })
      expect(wrapper.props('echarts')).toStrictEqual(customEcharts)
    })
  })

  describe('Cleanup', () => {
    it('should dispose chart on unmount', async () => {
      const wrapper = mountChart()
      await flushPromises()

      wrapper.unmount()

      expect(mockInstance.dispose).toHaveBeenCalled()
    })

    it('should cleanup event listeners on unmount', async () => {
      const wrapper = mountChart({
        props: {
          events: {
            click: vi.fn(),
          },
        },
      })

      await flushPromises()

      // Verify event was registered
      expect(mockInstance.on).toHaveBeenCalledWith('click', expect.any(Function))

      wrapper.unmount()

      // ECharts dispose() handles event cleanup internally
      expect(mockInstance.dispose).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle init failure gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockECharts.init.mockReturnValueOnce(undefined)

      const wrapper = mountChart()

      await flushPromises()

      // Should still exist even if init returns undefined
      expect(wrapper.exists()).toBe(true)
      consoleSpy.mockRestore()
    })
  })

  describe('Debug Mode', () => {
    it('should accept debug prop', () => {
      const wrapper = mountChart({
        props: {
          debug: true,
        },
      })
      expect(wrapper.props('debug')).toBe(true)
    })
  })
})
