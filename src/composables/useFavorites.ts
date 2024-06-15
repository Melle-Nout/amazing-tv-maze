import type { Favorite } from '@/types/Favorite'
import { useLocalStorage } from './useLocalStorage'
import { computed } from 'vue'

const favorites = useLocalStorage<Favorite[]>('favorites', [])

export function useFavorites() {
  const hasFavorites = computed(() => !!favorites.value.length)

  function add(favorite: Favorite) {
    favorites.value = [favorite, ...favorites.value]
  }

  function remove(favorite: Favorite) {
    favorites.value = favorites.value.filter((item) => item.id !== favorite.id)
  }

  function isPresent(id: number) {
    return favorites.value.some((item) => item.id === id)
  }

  function toggle(favorite: Favorite) {
    isPresent(favorite.id) ? remove(favorite) : add(favorite)
  }

  return { favorites, hasFavorites, isPresent, toggle }
}
