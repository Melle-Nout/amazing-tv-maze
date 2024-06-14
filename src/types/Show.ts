import type { Image } from './Image'
import type { Network } from './Network'

export interface Show {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number
  averageRuntime: number
  premiered: string
  ended: string | null
  officialSite: string | null
  schedule: {
    time?: string
    days?: string[]
  }
  rating: {
    average: number
  }
  weight: number
  network: Network
  webChannel: null
  dvdCountry: null
  externals: {
    tvrage?: number
    thetvdb?: number
    imdb?: string
  }
  image?: Image
  summary: string
  updated: number
  _links: {
    self: {
      href?: string
    }
    previousepisode: {
      href?: string
      name?: string
    }
  }
}