import { describe, it, expect } from 'vitest'

import { orderedShows, shows } from '../../test/mocks/shows'
import { useShowSorter } from '../useShowSorter'

describe('useShowSorter', () => {
  it('Should order the shows by genre and rating', () => {
    const { getOrderedShows } = useShowSorter()

    expect(getOrderedShows(shows)).toStrictEqual(orderedShows)
  })
})
