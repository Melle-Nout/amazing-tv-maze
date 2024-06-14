<script setup lang="ts">
interface Props {
  items?: {
    title?: string
    value?: string | number
  }[]
}

defineProps<Props>()
</script>

<template>
  <ul v-if="items?.length" class="meta-data">
    <template v-for="(item, index) in items">
      <li v-if="item.value" :key="`item-${index}`" class="meta-data-item">
        <span class="meta-data-title">{{ item.title }}</span>
        <span class="meta-data-value">{{ item.value }}</span>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.meta-data-title {
  margin-right: 5px;
  font-weight: bold;
}

.meta-data-item {
  position: relative;
}
</style>
