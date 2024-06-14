<script setup lang="ts">
import Image from './Image.vue'

interface Props {
  image?: string
  title?: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="profile">
    <Image v-if="image" :src="image" class="profile-image" />
    <div class="profile-content">
      <h3 v-if="title" class="profile-title">{{ title }}</h3>
      <p v-if="description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}

.profile-image {
  width: 110px;
  height: 110px;
  overflow: hidden;
  border-radius: 50%;
}

.profile-image :deep(img) {
  width: 100%;
}

.profile-content {
  flex: 1;
}
</style>
