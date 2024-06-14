<script setup lang="ts">
import Image from './Image.vue'
import Title from './Title.vue'

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
      <Title title-heading="h3" :title />
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
