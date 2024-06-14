<script setup lang="ts">
import { ref, watch } from 'vue'

import { useViewport } from '@/composables/useViewport'

interface Props {
  src?: string
  sources?: {
    media?: string
    srcset?: string
  }[]
  alt?: string
}

defineProps<Props>()

const { isVisible, targetRef } = useViewport()

const hasRendered = ref(false)

watch(
  isVisible,
  (newValue, oldValue) => {
    if (newValue || oldValue) {
      hasRendered.value = true
    }
  },
  { once: true }
)
</script>

<template>
  <picture v-if="src" class="picture" ref="targetRef">
    <source
      v-for="(source, index) in sources"
      :srcset="source.srcset"
      :media="source.media"
      :key="`${source.srcset}-${index}`"
    />
    <img v-if="hasRendered" :src="src" :alt class="image" />
  </picture>
</template>
