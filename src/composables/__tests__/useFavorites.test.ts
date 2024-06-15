import { describe, it, expect } from 'vitest'

import { useFavorites } from '../useFavorites'

describe('useFavorites', () => {
  it('Add and remove favorites when toggled', () => {
    const { favorites, toggle, hasFavorites } = useFavorites()

    const favoriteItem = { id: 1, rating: 5, images: { medium: 'foo' } }

    // Add item
    expect(favorites.value.length).toBe(0)
    toggle(favoriteItem)
    expect(favorites.value).toStrictEqual([favoriteItem])
    expect(hasFavorites.value).toBe(true)

    // Remove item
    toggle(favoriteItem)
    expect(favorites.value).toStrictEqual([])
    expect(hasFavorites.value).toBe(false)
  })
})
