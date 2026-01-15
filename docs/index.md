---
layout: home
title: shadcn-vue-echarts
hero:
  name: shadcn-vue-echarts
  text: Vue 3 ECharts Wrapper with Shadcn Theming
  tagline: Lightweight, headless Vue 3 wrapper for ECharts with automatic shadcn theming support
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/jtthompson1887/shadcn-vue-echarts
  image:
    src: /logo.svg
    alt: shadcn-vue-echarts
features:
  - icon: 🎨
    title: Automatic Shadcn Theming
    details: Reads CSS variables for perfect light/dark mode integration with your shadcn design system
  - icon: 🌓
    title: Smart Theme Detection
    details: Automatically responds to dark mode changes without manual configuration
  - icon: 📱
    title: Responsive Design
    details: Built-in ResizeObserver for automatic chart resizing when container dimensions change
  - icon: ⚡
    title: SSR Safe
    details: Works seamlessly with Nuxt 3 and other SSR frameworks out of the box
  - icon: 🧪
    title: TypeScript First
    details: Full type safety with exact ECharts types for better development experience
  - icon: 📦
    title: Zero Runtime Dependencies
    details: ECharts as peer dependency, you control the version and bundle size
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Redirect to guide page after a short delay
  setTimeout(() => {
    window.location.href = '/shadcn-vue-echarts/guide/'
  }, 3000)
})
</script>

<div class="vp-raw">
  <div style="text-align: center; margin: 2rem 0; padding: 1rem; background: var(--vp-c-bg-soft); border-radius: 8px;">
    <p style="margin: 0; color: var(--vp-c-text-1); font-size: 1.1rem;">
      📖 Redirecting to the <strong>Guide</strong> page in 3 seconds...
    </p>
    <p style="margin: 0.5rem 0 0 0; color: var(--vp-c-text-2);">
      Or <a href="/shadcn-vue-echarts/guide/" style="color: var(--vp-c-brand);">click here</a> to go there now.
    </p>
  </div>
</div>
