<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  contentClass?: string
  headerClass?: string
}>()

defineSlots<{
  title(): any
  description(): any
  actions(): any
  default(): any
  footer(): any
}>()
</script>

<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow-sm">
    <div
      v-if="title || $slots.title || $slots.actions || description || $slots.description"
      class="flex items-start justify-between p-6 pb-2"
      :class="headerClass"
    >
      <div>
        <h3 v-if="title" class="font-semibold">{{ title }}</h3>
        <slot v-if="!title" name="title" />
        <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
        <slot v-if="!description" name="description" />
      </div>
      <slot name="actions" />
    </div>
    <div class="p-6 pt-4" :class="contentClass">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-6 pt-0">
      <slot name="footer" />
    </div>
  </div>
</template>
