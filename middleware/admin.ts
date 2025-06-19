// middleware/admin.ts
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  // тільки admin може далі
  if (!auth.isAdmin) {
    return navigateTo('/')  // або на сторінку «forbidden»
  }
})
