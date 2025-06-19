export interface User {
  uuid: string
  name: string
  email: string
  role: 'admin' | 'viewer'
  country: string
  age: number
}
