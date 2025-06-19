<template>
  <header class="flex items-center justify-between bg-white shadow px-4 h-16">
    <div class="flex items-center">
      <button
        class="p-2 lg:hidden focus:outline-none"
        aria-label="Toggle sidebar"
        @click="emit('toggleSidebar')"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <span class="ml-2 text-xl font-semibold lg:hidden">CommonShare</span>
    </div>

    <div class="flex items-center space-x-4">
      <span v-if="auth.isLoggedIn" class="hidden md:inline" aria-live="polite">
        Hi, {{ auth.user?.name }}!
      </span>
      <button
        v-if="auth.isLoggedIn"
        class="px-3 py-1 border border-[var(--brand-color)] hover:scale-105 transition-[scale] cursor-pointer rounded"
        aria-label="Log out"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const emit = defineEmits(['toggleSidebar'])

const auth = useAuthStore()
const router = useRouter()

async function logout() {
  auth.logout()
  router.push('/login')
}
</script>
