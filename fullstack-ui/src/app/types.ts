export type URL = string

export interface User {
  id: string
  name: string
  username: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: URL
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}
