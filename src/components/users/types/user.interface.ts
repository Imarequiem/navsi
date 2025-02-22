export default interface User {
  cell?: string
  dob: {
    age: number | string
    date?: string
  }
  email: string
  gender: string
  id?: {
    name?: string
    value?: string
  }
  location?: {
    city?: string
    coordinates?: {
      latitude: string
      longitude: string
    }
    country?: string
    postcode?: string
    state?: string
    street?: {
      name: string
      number: number
    }
    timezone?: {
      description?: string
      offset?: string
    }
  }
  login?: {
    md5?: string
    password?: string
    salt?: string
    sha1?: string
    sha256?: string
    username?: string
    uuid?: string
  }
  name: {
    title?: string
    first: string
    last?: string
  }
  nat?: string
  phone?: string
  picture?: {
    large?: string
    medium?: string
    thumbnail?: string
  }
  registered?: {
    age?: number
    date?: string
  }
}
