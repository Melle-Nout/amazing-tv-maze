import { useLocalStorage } from './useLocalStorage'

interface Favorite {
  id: number
  imageUrl: string
}

export function useFavorites() {
  const favorites = useLocalStorage<Favorite[]>('favorites', [])

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

  return { isPresent, toggle }
}