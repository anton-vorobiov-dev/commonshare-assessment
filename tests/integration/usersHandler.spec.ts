import { describe, it, expect } from 'vitest'
// 1) Import the handler
import usersHandler from '~/server/api/users'
// 2) Load the raw JSON fixture
import rawUsers from '~/server/data/users.json'
import type { User } from '~/types.ts'

describe('GET /api/users handler', () => {
  it('returns all users with password removed', async () => {
    // Act: call the Nitro handler
    const result = await usersHandler({} as User)

    // Assert: same number of users
    expect(result).toHaveLength(rawUsers.length)

    // Assert: no object has a "password" key
    result.forEach((u: Record<string, string | number>) => {
      expect(u).not.toHaveProperty('password')
    })

    // Assert: each result exactly matches rawUsers item minus its password
    const expected = rawUsers.map(({ password, ...rest }) => rest)
    expect(result).toEqual(expected)
  })
})
