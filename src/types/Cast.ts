import type { Image } from './Image'

export interface Cast {
  person?: {
    id: number
    url: string
    name: string
    country?: {
      name: string
      code: string
      timezone: string
    }
    birthday: string
    deathday: null
    gender: string
    image?: Image
    updated: number
    _links?: {
      self?: {
        href: string
      }
    }
  }
  character?: {
    id: number
    url: string
    name: string
    image: Image
    _links?: {
      self?: {
        href: string
      }
    }
  }
  self: boolean
  voice: boolean
}
