<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import Input from './Input.vue'

const router = useRouter()
const query = ref('')

function submit() {
  router.push({
    name: 'search',
    query: { q: query.value }
  })
}

onMounted(async () => {
  await router.isReady()

  const currentRoute = router.currentRoute
  if (currentRoute.value.path === '/search' && currentRoute.value.query.q) {
    query.value = currentRoute.value.query.q.toString()
  }
})
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <img src="../assets/icons/logo.svg" alt="ABN AMRO logo" class="logo" />
      </RouterLink>
      <form action="/search" method="get" @submit.prevent="submit">
        <Input
          v-model="query"
          id="search"
          placeholder="Search by show title"
          label-text="Search shows"
        />
      </form>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  line-height: 0;
  background-color: var(--color-background);
}

nav {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}

form {
  max-width: 200px;
}

.logo {
  width: 30px;
}

@media (min-width: 768px) {
  nav {
    margin: 30px;
  }
}

@media (min-width: 1024px) {
  nav {
    margin-inline: 50px;
    font-size: 1rem;
  }
}
</style>
