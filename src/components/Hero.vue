<script setup lang="ts">
import Image from './Image.vue'
import MetaData from './MetaData.vue'
import Tags from './Tags.vue'
import Title from './Title.vue'

interface Props {
  title?: string
  tags?: string[]
  image?: {
    src?: string
    sources?: { srcset?: string; media?: string }[]
    alt?: string
  }
  meta?: {
    title: string
    value: string | number
  }[]
}

defineProps<Props>()
</script>

<template>
  <div class="hero">
    <Image
      v-if="image"
      :src="image.src"
      :sources="image.sources"
      :alt="image.alt"
      class="hero-image"
    />
    <div class="hero-content">
      <Title v-if="title" title-heading="h1" :title />
      <MetaData v-if="meta?.length" :items="meta" />
      <Tags v-if="tags?.length" :tags />
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
}

.hero-image {
  position: relative;
  width: 100%;
  height: 480px;
  margin-bottom: 30px;
  background-color: black;
}

.hero-image :deep(img) {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.hero-content {
  padding-inline: 20px;
}

.tags {
  margin-top: 20px;
}

@media (min-width: 768px) {
  .hero {
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
  }

  .hero-image {
    width: 40%;
    max-width: 320px;
    height: auto;
    min-height: 480px;
    margin-bottom: 0;
  }

  .hero-content {
    width: 60%;
    padding: 40px;
    margin-block: auto;
    margin-inline: auto;
  }

  .meta-data {
    display: flex;
    flex-wrap: wrap;
    gap: 5px 40px;
  }

  .meta-data > :deep(li:not(:last-child)::before) {
    position: absolute;
    top: 50%;
    right: -25px;
    width: 10px;
    height: 10px;
    content: '';
    background-color: var(--color-primary);
    border-radius: var(--border-radius);
    translate: 0 -50%;
  }
}
</style>
