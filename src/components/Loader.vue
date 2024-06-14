<template>
  <div class="loader">
    <span
      v-for="index in 4"
      :key="`loader-${index}`"
      class="loader-circle"
      :style="{ '--index': index }"
    />
  </div>
</template>

<style scoped>
.loader {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 82px;
  padding: 10px 0;
}

.loader-circle {
  --index: 0;

  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  background-color: var(--color-primary);
  border-radius: 50px;
  translate: 0 -10px;
  animation: loading 1.2s ease-in-out infinite;
  animation-delay: calc(0.1s * var(--index));
}

@keyframes loading {
  0%,
  100% {
    background-color: var(--color-primary);
    translate: 0 -10px;
  }

  50% {
    background-color: var(--color-primary-light);
    translate: 0 10px;
  }
}
</style>
