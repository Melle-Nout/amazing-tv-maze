<script setup lang="ts">
import type { Show } from '@/types/Show'
import Card from './Card.vue'

interface Props {
  shows: Show[]
}

defineProps<Props>()
</script>

<template>
  <div class="card-grid">
    <template v-for="show in shows" :key="`card-${show.id}`">
      <Card
        v-if="show.image?.medium || show.image?.original"
        :id="show.id"
        :images="{ medium: show.image?.medium, original: show.image?.original }"
        :rating="show.rating.average"
      />
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
