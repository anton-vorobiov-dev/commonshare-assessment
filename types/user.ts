export interface ApiUser {
  uuid: string
  name: string
  email: string
  password: string
  role: string
  country: string
  age: number
}

export type User = Omit<ApiUser, 'password'>
