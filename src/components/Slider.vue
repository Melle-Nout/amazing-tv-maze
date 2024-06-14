<script setup lang="ts">
import { onMounted, ref } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'

import type { Card as CardType } from '@/types/shared-props/Card'
import Card from './Card.vue'

interface Props {
  items: CardType[]
}

defineProps<Props>()

const [sliderRef, emblaApi] = emblaCarouselVue({
  dragFree: true,
  breakpoints: { '(min-width: 1024px)': { watchDrag: false, slidesToScroll: 3 } }
})

const canScrollPrev = ref<boolean>(false)
const canScrollNext = ref<boolean>(true)

function onSelect() {
  canScrollPrev.value = !!emblaApi.value?.canScrollPrev()
  canScrollNext.value = !!emblaApi.value?.canScrollNext()
}

onMounted(() => {
  emblaApi.value?.on('select', onSelect)
})
</script>

<template>
  <div v-if="items.length" class="slider">
    <div class="slider-controls">
      <button
        @click="emblaApi?.scrollPrev()"
        :disabled="!canScrollPrev"
        type="button"
        aria-label="Slider left"
        class="slider-btn slider-btn-left"
      />
      <button
        @click="emblaApi?.scrollNext()"
        :disabled="!canScrollNext || items.length <= 5"
        type="button"
        aria-label="Slider right"
        class="slider-btn slider-btn-right"
      />
    </div>
    <div class="slider-viewport" ref="sliderRef">
      <div class="slider-container">
        <div
          v-for="({ id, images, rating }, index) in items"
          :key="`slider-item-${index}`"
          class="slider-item"
        >
          <Card :id :images :rating />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider {
  --slide-spacing: 5px;
  --slide-size: 50%;

  position: relative;
}

.slider-viewport {
  overflow: hidden;
}

.slider-container {
  display: flex;
  margin-left: calc(var(--slide-spacing) * -1);
  touch-action: pan-y pinch-zoom;
  backface-visibility: hidden;
}

.slider-item {
  position: relative;
  flex: 0 0 var(--slide-size);
  max-width: 255px;
  max-height: 390px;
  aspect-ratio: 2 / 3;
  padding-left: var(--slide-spacing);
}

.slider-controls {
  display: none;
}

.slider-btn {
  position: absolute;
  top: 50%;
  z-index: 1;
  width: 65px;
  height: 65px;
  color: var(--color-heading);
  cursor: pointer;
  background-color: var(--color-background-mute);
  border-width: 0;
  border-radius: 50%;
  fill: 0.4s;
  transition:
    color 0.4s,
    opacity 0.4s,
    background-color 0.4s;
  translate: 0 -50%;
}

.slider-btn::before {
  display: flex;
  justify-content: center;
  height: 100%;
  font-size: 50px;
}

.slider-btn:hover {
  color: white;
  background-color: var(--color-primary);
}

.slider-btn-left {
  left: 20px;
}

.slider-btn-left::before {
  content: '\2039';
}

.slider-btn-right {
  right: 20px;
}

.slider-btn-right::before {
  content: '\203A';
}

.slider-btn:disabled {
  pointer-events: none;
  opacity: 0;
}

@media (min-width: 450px) {
  .slider {
    --slide-size: 40%;
  }
}

@media (min-width: 640px) {
  .slider {
    --slide-size: 25%;
  }
}

@media (min-width: 1024px) {
  .slider {
    --slide-size: 20%;
  }

  .slider-controls {
    display: block;
  }
}
</style>
