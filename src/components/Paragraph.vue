<script setup lang="ts">
import Title from './Title.vue'

interface Props {
  titleHeading?: 'h1' | 'h2' | 'h3' | 'h4'
  title?: string
  text?: string
}

withDefaults(defineProps<Props>(), {
  titleHeading: 'h2'
})
</script>

<template>
  <article v-if="text" class="paragraph">
    <Title :titleHeading :title class="paragraph-title" />
    <p v-html="text" />
  </article>
</template>

<style scoped>
.paragraph-title {
  margin-bottom: 10px;
}
</style>
