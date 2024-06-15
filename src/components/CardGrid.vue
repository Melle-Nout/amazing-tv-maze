<script setup lang="ts">
import type { Card as CardType } from '@/types/shared-props/Card'
import Card from './Card.vue'

interface Props {
  cards: CardType[]
}

defineProps<Props>()
</script>

<template>
  <div class="card-grid">
    <template v-for="(card, index) in cards" :key="`card-${index}`">
      <Card :id="card.id" :images="card.images" :rating="card.rating" />
    </template>
  </div>
</template>

<style scoped>
.card-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.card {
  height: 300px;
  aspect-ratio: 2 / 3;
}
</style>
