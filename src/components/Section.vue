<script setup lang="ts">
interface Props {
  showBorder?: boolean
}

withDefaults(defineProps<Props>(), {
  showBorder: true
})
</script>

<template>
  <section :class="{ 'has-border': showBorder }">
    <slot />
  </section>
</template>

<style scoped>
section {
  position: relative;
  max-width: 700px;
  padding-block: 20px;
  padding-inline: 20px;
  margin-inline: auto;
}

.has-border::before {
  position: absolute;
  top: 0;
  left: 10px;
  width: calc(100% - 20px);
  height: 2px;
  content: '';
  background-color: var(--color-border);
}
</style>
