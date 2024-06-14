<template>
  <div class="page">
    <slot />
  </div>
</template>

<style scoped>
.page {
  padding-inline: 20px;
}

.page {
  margin-top: 70px;
  padding-bottom: 70px;
}

@media (min-width: 768px) {
  .page {
    margin-top: 100px;
  }
}
</style>
