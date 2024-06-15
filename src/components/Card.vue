<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import type { Card } from '@/types/shared-props/Card'
import { useFavorites } from '@/composables/useFavorites'
import Image from './Image.vue'

const props = defineProps<Card>()

const componentToRender = computed(() => (props.id ? RouterLink : 'div'))
const componentProps = computed(() => props.id && { to: `/show/${props.id}` })

const { toggle, isPresent } = useFavorites()
</script>

<template>
  <div v-if="images && Object.keys(images).length" class="card">
    <component :is="componentToRender" v-bind="componentProps">
      <Image
        :src="images.medium || images.original"
        :sources="[{ srcset: images.original, media: '(min-width: 600px)' }]"
        alt="Show poster"
        class="card-media"
      />
      <span v-if="rating" class="card-rating">{{ rating }} ⭐</span>
    </component>
    <button
      v-if="id && images.original"
      @click.stop="toggle({ id, images, rating })"
      class="card-favorite"
    >
      {{ isPresent(id) ? '❤️' : '🩶' }}
    </button>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  display: block;
  height: 100%;
  overflow: hidden;
  border-radius: var(--border-radius);
  background-color: var(--color-background-soft);
  transition: scale 0.4s;
}

.card-media :deep(img) {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
  transition: scale 0.4s;
}

.card-rating,
.card-favorite {
  position: absolute;
  padding: 5px 10px;
  font-size: 1rem;
  background-color: var(--color-primary);
}

.card-rating {
  bottom: 0;
  font-weight: bold;
  border-top-right-radius: var(--border-radius);
  color: white;
}

.card-favorite {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  border-width: 0;
  border-bottom-left-radius: var(--border-radius);
}

@media (hover: hover) and (min-width: 1024px) {
  a:hover > .card-media :deep(img) {
    scale: 1.05;
  }
}
</style>
