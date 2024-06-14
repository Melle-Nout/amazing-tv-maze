<script setup lang="ts">
import { RouterView } from 'vue-router'

import Navigation from './components/Navigation.vue'
</script>

<template>
  <Navigation />
  <main>
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>
