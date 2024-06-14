<script setup lang="ts">
interface Props {
  id: string
  labelText: string
  placeholder: string
}

defineProps<Props>()

const model = defineModel<string>()
</script>

<template>
  <label v-text="labelText" :for="id" class="form-label sr-only" />
  <input v-model="model" :id :name="id" :placeholder type="text" class="form-input" />
</template>

<style scoped>
input {
  width: 100%;
  height: 100%;
  padding-inline: 10px;
  font-size: 1rem;
  color: var(--color-heading);
  background-color: var(--color-background-soft);
  border-color: var(--color-border);
  border-width: 1px;
  border-radius: var(--border-radius);
}

input:focus {
  outline: var(--color-primary) auto 2px;
}
</style>
