import { Photo } from "./photo"

export interface Member {
    id: number
    username: string
    age: number
    photoURL: string
    knownAs: string
    created: Date
    lastActive: Date
    gender: string
    introduction: string
    interests: string
    lookingFor: string
    city: string
    country: string
    photos: Photo[]
  }
