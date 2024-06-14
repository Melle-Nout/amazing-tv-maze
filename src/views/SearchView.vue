<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { Show } from '@/types/Show'

import { useFetch } from '@/composables/useFetch'
import { useShowSorter } from '@/composables/useShowSorter'
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
            <pre>{{ show }}</pre>
          </template>
        </div>
      </Transition>
    </Section>
  </Page>
</template>
