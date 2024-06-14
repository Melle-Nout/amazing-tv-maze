<script setup lang="ts">
interface Props {
  titleHeading?: 'h1' | 'h2' | 'h3' | 'h4'
  title?: string
}

withDefaults(defineProps<Props>(), {
  titleHeading: 'h2'
})
</script>

<template>
  <component v-if="title" :is="titleHeading" class="title">{{ title }}</component>
</template>

<style scoped>
.title {
  color: var(--color-heading);
}
</style>
