import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'shadcn-vue-echarts',
  description: 'Vue 3 ECharts wrapper with shadcn theming',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Theming', link: '/guide/theming' },
      { text: 'GitHub', link: 'https://github.com/jtthompson1887/shadcn-vue-echarts' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Theming', link: '/guide/theming' },
          { text: 'SSR & Nuxt', link: '/guide/ssr' },
          { text: 'Recipes', link: '/guide/recipes' }
        ]
      }
    ]
  }
})
