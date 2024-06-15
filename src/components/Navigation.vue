<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useFavorites } from '@/composables/useFavorites'
import FavoriteIcon from './FavoriteIcon.vue'
import Input from './Input.vue'

const router = useRouter()
const query = ref('')

function submit() {
  router.push({
    name: 'search',
    query: { q: query.value }
  })
}

const { hasFavorites } = useFavorites()

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
      <div class="right">
        <form action="/search" method="get" @submit.prevent="submit">
          <Input
            v-model="query"
            id="search"
            placeholder="Search by show title"
            label-text="Search shows"
          />
        </form>
        <RouterLink to="/favorites">
          <FavoriteIcon :is-full="hasFavorites" class="heart" />
        </RouterLink>
      </div>
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

.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.heart {
  fill: red;
  height: 20px;
  width: 20px;
}

form {
  max-width: 200px;
  height: 100%;
}

.logo {
  width: 30px;
}

@media (min-width: 768px) {
  nav {
    margin: 30px;
  }

  .right {
    gap: 20px;
  }

  .heart {
    width: 25px;
    height: 25px;
  }
}

@media (min-width: 1024px) {
  nav {
    margin-inline: 50px;
    font-size: 1rem;
  }
}
</style>
