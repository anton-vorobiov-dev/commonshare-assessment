import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuthStore } from '~/stores/auth'

describe('Auth Store', () => {
  let auth: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    auth = useAuthStore()
  })

  it('starts logged out', () => {
    expect(auth.user).toBeNull()
    expect(auth.token).toBeNull()
    expect(auth.isLoggedIn).toBe(false)
  })

  it('sets user and token on login()', async () => {
    const fakeUser = { id: '1', name: 'Alice', role: 'viewer' }
    vi.stubGlobal('$fetch', vi.fn().mockResolvedValue({
      user: fakeUser,
      token: 'abc123'
    }))

    await auth.login('alice@example.com', 'pass')
    expect(auth.user).toEqual(fakeUser)
    expect(auth.token).toBe('abc123')
    expect(auth.isLoggedIn).toBe(true)
  })

  it('clears state on logout()', () => {
    auth.user = { id: 'x', name: 'X', role: 'admin' }
    auth.token = 't'
    auth.logout()
    expect(auth.user).toBeNull()
    expect(auth.token).toBeNull()
    expect(auth.isLoggedIn).toBe(false)
  })
})
