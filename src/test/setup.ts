import { afterAll, afterEach, beforeAll } from 'vitest'
import { fetch } from 'cross-fetch'

import { server } from './mocks/server'

// fetch polyfill
global.fetch = fetch
global.process.env.VITE_API_BASE_URL = 'http://localhost:3000'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
