import { promises as fs } from 'fs'
import { join } from 'path'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const filePath = join(process.cwd(), 'server/data/users.json')
  const json     = await fs.readFile(filePath, 'utf-8')
  const users    = JSON.parse(json) as Array<Record<string, any>>

  // remove password field
  return users.map(({ password, ...safe }) => safe)
})
