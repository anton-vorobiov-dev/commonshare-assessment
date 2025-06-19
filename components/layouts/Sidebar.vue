<template>
  <aside
    role="navigation"
    :class="[
      'w-64',
      open ? 'translate-x-0 w-full backdrop-blur-[2px]' : '-translate-x-full',
      'lg:translate-x-0 lg:static fixed inset-y-0 left-0 transition-transform'
    ]"
    @click.self="$emit('close')"
  >
    <nav class="bg-gray-800 text-white w-64 h-full space-y-2 p-4">
      <NuxtLink 
        to="/" 
        class="text-xl font-semibold block py-2 px-3 mb-4"
        @click.native="$emit('close')"
      > 
        CommonShare
      </NuxtLink>
      <NuxtLink
        to="/"
        class="block py-2 px-3 rounded hover:bg-gray-700 hover:scale-105 transition-[scale]"
        :class="{ 'bg-gray-700': $route.path === '/' }"
        aria-current="$route.path === '/' ? 'page' : undefined"
        @click.native="$emit('close')"
      >
        Dashboard
      </NuxtLink>
      <NuxtLink
      v-if="auth.isAdmin"
        to="/users"
        class="block py-2 px-3 rounded hover:bg-gray-700 hover:scale-105 transition-[scale]"
        :class="{ 'bg-gray-700': $route.path === '/users' }"
        aria-current="$route.path === '/users' ? 'page' : undefined"
        @click.native="$emit('close')"
      >
        Users
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const props = defineProps<{ open: boolean }>()
</script>
