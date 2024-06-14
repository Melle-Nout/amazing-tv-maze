import type { Image } from './Image'
import type { Network } from './Network'

export interface Season {
  id: number
  url: string
  number: number
  name: string
  episodeOrder: string
  premiereDate: string
  endDate: string
  network: Network
  webChannel: null
  image: Image
  summary: string
  _links?: {
    self?: {
      href: string
    }
  }
}
