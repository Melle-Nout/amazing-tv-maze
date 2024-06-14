<script setup lang="ts">
interface Props {
  tags?: string[]
}

defineProps<Props>()
</script>

<template>
  <div v-if="tags?.length" class="tags">
    <span v-for="(tag, index) in tags" :key="`tag-${index}`" class="tag">
      {{ tag }}
    </span>
  </div>
</template>

<style scoped>
.tags {
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
}

.tag {
  padding: 10px;
  color: white;
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  font-weight: bold;
}
</style>
