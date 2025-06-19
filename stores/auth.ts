// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // — STATE
    const user = ref<{ id: string; name: string; role: string } | null>(null)
    const token = ref<string | null>(null)

    // — GETTERS
    const isLoggedIn = computed(() => Boolean(token.value))
    const isAdmin    = computed(() => user.value?.role === 'admin')

    // — ACTIONS
    const login = async (email: string, password: string) => {
      try {
        const res = await $fetch<{
          user: { id: string; name: string; role: string }
          token: string
        }>('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        })
        user.value  = res.user
        token.value = res.token
      } catch (err) {
        throw new Error('Bad credentials', { cause: err })
      }
    }

    const logout = () => {
      user.value  = null
      token.value = null
    }

    return {
      user,
      token,
      isLoggedIn,
      isAdmin,
      login,
      logout,
    }
  },
  {
    persist: true,
  }
)
