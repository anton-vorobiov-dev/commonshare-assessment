// middleware/auth.ts
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  // якщо не залогінений — відправляємо на сторінку логіну
  if (!auth.isLoggedIn) {
    return navigateTo('/login')
  }
})
