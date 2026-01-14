import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'shadcn-vue-echarts',
  description: 'Vue 3 ECharts wrapper with shadcn theming',
  base: '/shadcn-vue-echarts/',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'GitHub', link: 'https://github.com/jtthompson1887/shadcn-vue-echarts' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Theming', link: '/guide/theming' },
          { text: 'SSR & Nuxt', link: '/guide/ssr' },
          { text: 'Recipes', link: '/guide/recipes' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jtthompson1887/shadcn-vue-echarts' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026'
    }
  }
})
