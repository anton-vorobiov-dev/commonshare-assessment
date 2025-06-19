import { promises as fs } from 'fs'
import { join } from 'path'
import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const { email, password } = await readBody<{ email: string; password: string }>(event)

  const filePath = join(process.cwd(), 'server/data/users.json')
  const json     = await fs.readFile(filePath, 'utf-8')
  const users    = JSON.parse(json) as Array<{
    id: string
    name: string
    email: string
    password: string
    role: string
    country: string
    age: number
  }>

  const user = users.find(u => u.email === email && u.password === password)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const { password: _, ...userSafe } = user

  // TODO: тут можна робити справжній JWT, але для MVP — просто заглушка
  const token = 'dummy-jwt-token'

  return { user: userSafe, token }
})
