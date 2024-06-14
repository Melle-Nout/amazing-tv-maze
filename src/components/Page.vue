<script setup lang="ts">
interface Props {
  isContentPage?: boolean
}

defineProps<Props>()
</script>

<template>
  <div :class="isContentPage ? 'page-content' : 'page'">
    <slot />
  </div>
</template>

<style scoped>
.page {
  padding-inline: 20px;
}

.page-content {
  max-width: 1024px;
  padding-inline: 0;
  margin-inline: auto;
  overflow: hidden;
  background-color: var(--color-background-mute);
}

.page,
.page-content {
  margin-top: 70px;
  padding-bottom: 70px;
}

@media (min-width: 768px) {
  .page,
  .page-content {
    margin-top: 100px;
  }
}

@media (min-width: 1024px) {
  .page-content {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
}
</style>
