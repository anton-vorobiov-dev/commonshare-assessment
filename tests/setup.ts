import { beforeAll, afterAll, vi } from 'vitest'

beforeAll(() => {
  const storage: Record<string, string> = {}
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage[key] ?? null,
    setItem: (key: string, value: string) => { storage[key] = value },
    removeItem: (key: string) => { Reflect.deleteProperty(storage, key) },
  })
})

afterAll(() => {
  vi.unstubAllGlobals()
})
