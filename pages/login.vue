<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

// No middleware for login page; redirect if already authenticated
definePageMeta({ layout: 'empty', middleware: [] })

const auth = useAuthStore()
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string | null>(null)
const loading = ref<boolean>(false)

async function handleSubmit() {
  errorMessage.value = null
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    // login action handles redirection
    if (auth.isLoggedIn) router.push('/')
  } catch (err: {message?: string} | null) {
    errorMessage.value = err?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="login">
    <h1 id="login-title" class="login__title text-2xl font-bold my-6 w-full text-center">Login</h1>
    <form
      class="login__form max-w-md mx-auto bg-white shadow rounded-lg p-6 flex flex-col gap-6"
      aria-labelledby="login-title"
      @submit.prevent="handleSubmit"
    >
      <div class="login__field flex flex-col gap-2">
        <label for="email" class="login__label font-medium">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
          class="login__input p-2 border rounded-lg focus:outline-none focus:ring"
          aria-required="true"
        >
      </div>
      <div class="login__field flex flex-col gap-2">
        <label for="password" class="login__label font-medium">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
          class="login__input p-2 border rounded-lg focus:outline-none focus:ring"
          aria-required="true"
        >
      </div>
      <div v-if="errorMessage" role="alert" class="login__error text-red-600 font-medium">
        {{ errorMessage }}
      </div>
      <button
        type="submit"
        class="login__button min-w-[126px] px-4 py-2 bg-[var(--brand-color)] hover:scale-105 transition-[scale] cursor-pointer text-white font-semibold rounded-lg  disabled:opacity-50 self-end"
        :disabled="loading"
        :aria-busy="loading"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </section>
</template>
