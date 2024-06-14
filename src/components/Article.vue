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
  <article v-if="text" class="article">
    <Title :titleHeading :title class="article-title" />
    <p v-html="text" />
  </article>
</template>

<style scoped>
.article-title {
  margin-bottom: 10px;
}
</style>
