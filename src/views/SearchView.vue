<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { Show } from '@/types/Show'

import { useFetch } from '@/composables/useFetch'
import { useShowSorter } from '@/composables/useShowSorter'
import Card from '@/components/Card.vue'
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

const sortedShows = computed(() => sortShowsByRating(shows.value?.map((show) => show.show) ?? []))
const titleText = computed(() =>
  shows.value?.length ? 'Search results' : `No results where found for: ${query.value.q}`
)
</script>

<template>
  <Page :is-content-page="true">
    <Section>
      <Title title-heading="h1" :title="titleText" />
      <Transition name="fade" mode="out-in">
        <Loader v-if="pending" />
        <div v-else-if="shows?.length" class="search-grid">
          <template v-for="show in sortedShows" :key="`card-${show.id}`">
            <Card
              v-if="show.image?.medium || show.image?.original"
              :id="show.id"
              :images="{ medium: show.image?.medium, original: show.image?.original }"
              :rating="show.rating.average"
            />
          </template>
        </div>
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

.search-grid {
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
