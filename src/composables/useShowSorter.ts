import type { Show } from '@/types/Show'

export function useShowSorter() {
  function sortShowsByRating(shows: Show[]) {
    return shows.sort((a, b) => b.rating.average - a.rating.average)
  }

  return { sortShowsByRating }
}
