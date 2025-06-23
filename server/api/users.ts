import { defineEventHandler } from 'h3'
import type { ApiUser } from '~/types/user'
import rawUsers from '../data/users.json'

export default defineEventHandler(async () => {
  const users = rawUsers as ApiUser[]

  // remove password field
  return users.map(({ password, ...safe }) => safe)
})
