<script setup lang="ts">
import { useFavorites } from '@/composables/useFavorites'
import CardGrid from '@/components/CardGrid.vue'
import Page from '@/components/Page.vue'
import Section from '@/components/Section.vue'
import Title from '@/components/Title.vue'

const { favorites } = useFavorites()
</script>

<template>
  <Page :is-content-page="true">
    <Section :show-border="false">
      <Title title-heading="h1" title="Favorites" />
      <Transition name="fade" mode="out-in">
        <CardGrid v-if="favorites.length" :cards="favorites" />
        <p v-else>You don't have any favorites yet!</p>
      </Transition>
    </Section>
  </Page>
</template>

<style>
.title {
  margin-top: 20px;
}

@media (min-width: 1024px) {
  .title {
    margin-top: 70px;
  }
}
</style>
