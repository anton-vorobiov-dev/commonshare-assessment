import { beforeAll, afterAll, vi } from 'vitest'

beforeAll(() => {
  // mock для localStorage
  const storage: Record<string, string> = {}
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage[key] ?? null,
    setItem: (key: string, value: string) => { storage[key] = value },
    removeItem: (key: string) => { delete storage[key] },
  })
})

afterAll(() => {
  vi.unstubAllGlobals()
})
