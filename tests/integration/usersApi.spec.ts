// tests/integration/usersApi.spec.ts
import usersHandler from '~/server/api/users'      // Nitro handler
import { describe, it, expect } from 'vitest'
import type { User } from '~/types.ts'

describe('GET /api/users handler', () => {
  it('returns an array of users with no password field', async () => {
    // call the handler with a dummy event object
    const result = await usersHandler({} as User)

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    // check that none has a password property
    expect((result[0] as Record<string, string | number>)).not.toHaveProperty('password')
  })
})
