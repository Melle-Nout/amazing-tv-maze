import { describe, it, expect } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { FetchError } from 'ofetch'

import { shows } from '../../test/mocks/shows'
import { useFetch } from '../useFetch'

describe('useFetch composable', () => {
  it('should change the pending to true and back to false after resolving the request', async () => {
    const { pending, submit } = useFetch('shows')

    expect(pending.value).toBe(false)
    submit()
    expect(pending.value).toBe(true)
    await flushPromises()
    expect(pending.value).toBe(false)
  })

  it('should set the data ref when a response is successful', async () => {
    const { data, submit } = useFetch('shows')

    await submit()
    expect(data.value).toStrictEqual(shows)
  })

  it('should set the error ref when a response is unsuccessful', async () => {
    const { error, submit } = useFetch('error')

    const mockError = new FetchError(
      '[GET] "http://localhost:3000/error": <no response> request to http://localhost:3000/error failed, reason: Network error'
    )

    await submit()
    expect(error.value).toStrictEqual(mockError)
  })
})
