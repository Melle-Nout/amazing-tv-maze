import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useViewport(options: IntersectionObserverInit = { rootMargin: '300px' }) {
  const targetRef = ref<Element | null>(null)
  const isVisible = ref(false)

  let observer: IntersectionObserver

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? (isVisible.value = true) : (isVisible.value = false)
    }, options)

    if (targetRef.value) observer.observe(targetRef.value)
  })

  onBeforeUnmount(() => {
    if (observer && targetRef.value) {
      observer.unobserve(targetRef.value)
    }
  })

  return { isVisible, targetRef }
}
