// server/api/auth/login.post.ts
import { defineEventHandler, readBody, createError } from 'h3'
import rawUsers from '../../data/users.json'
import type { ApiUser, User } from '~/types/user'

/**
 * @typedef {Object} AuthResponse
 * @property {User} user
 *   The authenticated user object, with the password field removed.
 * @property {string} token
 *   A JSON Web Token to be used for subsequent authenticated requests.
 *   Replace this placeholder with a real signed JWT in production.
 */

/**
 * @returns {Promise<AuthResponse>}
 */
export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const { email, password } = await readBody<{ email: string; password: string }>(event)

  const users = rawUsers as ApiUser[]

  const found = users.find(u => u.email === email && u.password === password)
  if (!found) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const { password: _pw, ...userSafe } = found
  const safeUser = userSafe as User

  // --------------------------------------------------
  // NOTE: This is a dummy token for demonstration.
  // In production, replace the next line with a real JWT, e.g.:
  //
  // import jwt from 'jsonwebtoken'
  // const token = jwt.sign(
  //   { sub: safeUser.uuid, email: safeUser.email },
  //   JWT_SECRET as string,
  //   { algorithm: 'HS256', expiresIn: '1h' }
  // )
  // --------------------------------------------------
  const token = 'dummy-jwt-token'

  return { user: safeUser, token }
})
