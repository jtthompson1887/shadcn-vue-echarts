<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'No data',
    description: 'Try adjusting filters.'
  }
)

defineSlots<{
  default(): any
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <slot />
    <h3 class="mt-4 font-semibold">{{ title }}</h3>
    <p class="text-sm text-muted-foreground">{{ description }}</p>
  </div>
</template>
