import type { Favorite } from '@/types/Favorite'
import { useLocalStorage } from './useLocalStorage'

const favorites = useLocalStorage<Favorite[]>('favorites', [])

export function useFavorites() {
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

  return { favorites, isPresent, toggle }
}
