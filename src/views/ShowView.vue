<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { Cast } from '@/types/Cast'
import type { Images } from '@/types/Images'
import type { Season } from '@/types/Season'
import type { Show } from '@/types/Show'

import { useFetch } from '@/composables/useFetch'
import Page from '@/components/Page.vue'
import Hero from '@/components/Hero.vue'
import Paragraph from '@/components/Paragraph.vue'
import Title from '@/components/Title.vue'
import Section from '@/components/Section.vue'
import Profile from '@/components/Profile.vue'
import Slider from '@/components/Slider.vue'

type ShowResponse = Show & {
  _embedded?: {
    seasons?: Season[]
    cast?: Cast[]
    images?: Images[]
  }
}

const route = useRoute()

const { data: show, submit } = useFetch<ShowResponse>(`shows/${route.params.id}`, {
  query: {
    'embed[]': ['seasons', 'cast', 'images']
  }
})

watch(() => route.params.id, submit, { immediate: true, once: true })

const mappedImages = computed(() =>
  show.value?._embedded?.images?.map((image) => {
    return {
      images: { original: image.resolutions?.original?.url, medium: image.resolutions?.medium?.url }
    }
  })
)

const heroMetaItems = computed(() => {
  if (!show.value) return []
  return [
    { title: 'Rating:', value: show.value.rating?.average && `${show.value.rating.average} ⭐` },
    { title: 'Premiered:', value: show.value.premiered },
    { title: 'Show type:', value: show.value.type },
    { title: 'Language:', value: show.value.language },
    { title: 'Runtime:', value: show.value.runtime && `${show.value.runtime} min` },
    { title: 'Network:', value: show.value.network?.name },
    { title: 'Seasons:', value: show.value._embedded?.seasons?.length ?? '-' },
    { title: 'Status:', value: show.value.status }
  ]
})
</script>

<template>
  <Page v-if="show" :is-content-page="true">
    <Hero
      :title="show.name"
      :tags="show.genres"
      :meta="heroMetaItems"
      :image="{
        src: show.image?.medium,
        sources: [{ srcset: show.image?.original, media: '(min-width: 350px)' }],
        alt: 'Show poster'
      }"
    />
    <Section v-if="show.summary">
      <Paragraph title="Summary" :text="show.summary" />
    </Section>
    <Section v-if="mappedImages?.length">
      <Slider :items="mappedImages" />
    </Section>
    <Section v-if="show._embedded?.cast?.length">
      <Title title="Cast" />
      <div class="grid">
        <Profile
          v-for="member in show._embedded.cast"
          :key="`cast-member-${member.person?.id}`"
          :image="member.person?.image?.medium"
          :title="member.person?.name"
          :description="member.character?.name"
        />
      </div>
    </Section>
    <Section
      v-if="
        show._embedded?.seasons?.length && show._embedded.seasons.some((season) => season.summary)
      "
    >
      <Title title="Seasons" />
      <Paragraph
        v-for="season in show._embedded.seasons"
        :key="`season-${season.id}`"
        :title="`Season ${season.number}`"
        :text="season.summary"
        title-heading="h3"
        class="season-paragraph"
      />
    </Section>
  </Page>
</template>

<style scoped>
.hero {
  padding-bottom: 40px;
}

.grid {
  display: grid;
  gap: 20px;
  margin-top: 10px;
}

.season-paragraph {
  margin-bottom: 20px;
}

.season-paragraph:first-of-type {
  margin-top: 10px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
