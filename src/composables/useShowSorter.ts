import type { Show } from '@/types/Show'

export function useShowSorter() {
  function sortShowsByGenre(shows: Show[]) {
    return shows.reduce(
      (acc, show) => {
        const { genres } = show
        genres.forEach((genre) => (!acc[genre] ? (acc[genre] = [show]) : acc[genre].push(show)))
        return acc
      },
      {} as Record<string, Show[]>
    )
  }

  function sortShowsByRating(shows: Show[]) {
    return shows.sort((a, b) => b.rating.average - a.rating.average)
  }

  function getOrderedShows(shows: Show[]) {
    const showsByGenre = sortShowsByGenre(shows)

    // Sort genres alphabetically and shows by rating
    return Object.entries(showsByGenre)
      .sort()
      .reduce(
        (acc, [key, value]) => {
          acc[key] = sortShowsByRating(value)
          return acc
        },
        {} as Record<string, Show[]>
      )
  }

  return { getOrderedShows, sortShowsByRating }
}
