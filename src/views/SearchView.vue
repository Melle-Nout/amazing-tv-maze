<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { Show } from '@/types/Show'

import { useFetch } from '@/composables/useFetch'
import { useShowSorter } from '@/composables/useShowSorter'
import CardGrid from '@/components/CardGrid.vue'
import Loader from '@/components/Loader.vue'
import Page from '@/components/Page.vue'
import Section from '@/components/Section.vue'
import Title from '@/components/Title.vue'

interface SearchResponse {
  score: number
  show: Show
}

const route = useRoute()
const query = computed(() => {
  return { q: route.query.q }
})

const { data: shows, pending, submit } = useFetch<SearchResponse[]>('search/shows', { query })
const { sortShowsByRating } = useShowSorter()

watch(() => route.query.q, submit, { immediate: true })

const sortedShows = computed(() => {
  const showsByRating = sortShowsByRating(shows.value?.map((show) => show.show) ?? [])
  const formattedShows = showsByRating.map(({ id, image, rating }) => ({
    id,
    images: image,
    rating: rating.average
  }))
  return formattedShows
})
</script>

<template>
  <Page :is-content-page="true">
    <Section :show-border="false">
      <Title title-heading="h1" title="Search results" />
      <Transition name="fade" mode="out-in">
        <Loader v-if="pending" />
        <CardGrid v-else-if="sortedShows.length" :cards="sortedShows" />
        <p v-else>{{ `No results found for ${query.q}` }}</p>
      </Transition>
    </Section>
  </Page>
</template>

<style scoped>
.page-content {
  min-height: calc(100dvh - 70px);
}

.loader {
  margin-top: 60px;
}

.title {
  margin-top: 20px;
}

.fade-leave-to {
  transition: opacity 0.5s;
}

@media (min-width: 1024px) {
  .page-content {
    min-height: calc(100dvh - 100px);
  }

  .title {
    margin-top: 70px;
  }
}
</style>
