<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import type { Show } from '@/types/Show'

import { useFetch } from '@/composables/useFetch'
import { useShowSorter } from '@/composables/useShowSorter'
import Loader from '@/components/Loader.vue'
import Page from '@/components/Page.vue'
import Slider from '@/components/Slider.vue'

const { data: shows, pending, submit } = useFetch<Show[]>('shows')
const { getOrderedShows } = useShowSorter()

function getShowSliderData(shows: Show[]) {
  return shows.map(({ id, image, rating }) => {
    return {
      id,
      images: image,
      rating: rating?.average
    }
  })
}

const orderedShows = ref<Record<string, Show[]>>()
onBeforeMount(async () => {
  await submit()

  if (shows.value) {
    orderedShows.value = getOrderedShows(shows.value)
  }
})
</script>

<template>
  <Page>
    <Transition name="fade" mode="out-in">
      <Loader v-if="pending" />
      <div v-else-if="orderedShows" class="content">
        <div v-for="(shows, title) in orderedShows" :key="title" class="slider-section">
          <h2 class="title">{{ title }}</h2>
          <Slider :items="getShowSliderData(shows)" />
        </div>
      </div>
      <div v-else>No results found</div>
    </Transition>
  </Page>
</template>

<style scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}

.content {
  margin-block: 40px;
}

.slider-section:not(:first-child) {
  margin-top: 30px;
}

.title {
  margin-bottom: 5px;
  color: var(--color-heading);
}
</style>
