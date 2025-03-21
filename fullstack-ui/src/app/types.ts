export type URL = string

// TODO: Make this shared between UI and backend
export interface User {
  _id: string
  name: string
  username: string
  address: {
    street: string
    suite?: string
    city: string
    zipcode: string
    geo?: {
      lat?: string
      lng?: string
    }
  }
  phone: string
  website?: URL
  company: {
    name: string
    catchPhrase?: string
    bs?: string
  }
}

export type NewUser = Omit<User, '_id'>
