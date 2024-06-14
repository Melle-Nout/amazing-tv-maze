import { HttpResponse, http } from 'msw'
import { shows } from './shows'

const apiUrl = 'http://localhost:3000'

export const handlers = [
  http.get(`${apiUrl}/shows`, () => HttpResponse.json(shows)),
  http.get(`${apiUrl}/error`, () => HttpResponse.error())
]
