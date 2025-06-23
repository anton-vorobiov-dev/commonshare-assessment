
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from '~/types/user'

// Protect route: only authenticated admins
definePageMeta({ middleware: ['auth', 'admin'] })

// Fetch all users
const { data: users = ref<User[]>([]) } = await useFetch<User[]>('/api/users', {
  key: 'apiUsers',
  dedupe: 'defer',
  default: () => [] as User[],
})

// Filters and pagination state
const search = ref<string>('')
const selectedCountry = ref<string>('')
const page = ref<number>(1)
const perPage = 10

// Computed: filtered list
const filteredUsers = computed(() => {
  return users.value
    .filter((u: User) => {
      const matchText = u.name.toLowerCase().includes(search.value.toLowerCase())
        || u.email.toLowerCase().includes(search.value.toLowerCase())
      const matchCountry = selectedCountry.value
        ? u.country === selectedCountry.value
        : true
      return matchText && matchCountry
    })
})

// Computed: unique countries sorted by frequency
const countryCounts = computed(() => {
  const map = new Map<string, number>()
  users.value.forEach((u: User) => map.set(u.country, (map.get(u.country) || 0) + 1))
  return Array.from(map.entries())
})
const countries = computed<string[]>(() =>
  [...countryCounts.value]
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name)
)

// Pagination computations
const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / perPage)
)
const paginatedUsers = computed(() =>
  filteredUsers.value.slice((page.value - 1) * perPage, page.value * perPage)
)

function prevPage() {
  if (page.value > 1) page.value--
}

function nextPage() {
  if (page.value < totalPages.value) page.value++
}
</script>

<template>
  <section aria-labelledby="users-title" class="users">
    <h1 id="users-title" class="users__title text-2xl font-bold mb-4">Users</h1>

    <!-- Controls: Search and Country Filter -->
    <div class="users__controls flex items-center space-x-4 mb-4">
      <label for="search" class="sr-only">Search by name or email</label>
      <input
        id="search"
        v-model="search"
        type="text"
        class="users__search border rounded-lg focus:outline-none focus:ring cursor-text py-2 px-3"
        placeholder="Search by name or email"
      >

      <label for="filter" class="sr-only">Filter by country</label>
      <select
        id="filter"
        v-model="selectedCountry"
        class="users__filter p-2 border rounded-lg focus:outline-none focus:ring cursor-pointer py-2 px-3"
      >
        <option value="">All countries</option>
        <option
          v-for="country in countries"
          :key="country"
          :value="country"
        >
          {{ country }}
        </option>
      </select>
    </div>

    <!-- Users Table -->
    <table class="users__table w-full bg-white shadow rounded-lg overflow-hidden mb-4" role="table">
      <caption class="sr-only">List of users</caption>
      <thead class="users__thead bg-gray-100">
        <tr>
          <th scope="col"  class="users__th text-left p-3 font-medium text-gray-700">ID</th>
          <th scope="col"  class="users__th text-left p-3 font-medium text-gray-700">Name</th>
          <th scope="col"  class="users__th text-left p-3 font-medium text-gray-700">Email</th>
          <th scope="col"  class="users__th text-left p-3 font-medium text-gray-700">Age</th>
          <th scope="col"  class="users__th text-left p-3 font-medium text-gray-700">Role</th>
          <th scope="col"  class="users__th text-left p-3 font-medium text-gray-700">Country</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in paginatedUsers"
          :key="user.uuid"
          class="users__row even:bg-gray-50"
        >
          <td class="users__td p-3">{{ user.uuid.split('-')[0] }}</td>
          <td class="users__td p-3">{{ user.name }}</td>
          <td class="users__td p-3">{{ user.email }}</td>
          <td class="users__td p-3">{{ user.age }}</td>
          <td class="users__td p-3">{{ user.role }}</td>
          <td class="users__td p-3">{{ user.country }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div aria-label="Pagination" class="users__pagination flex items-center justify-center space-x-4">
      <button
        :disabled="page === 1"
        class="users__page-btn px-4 py-2 border rounded-lg border-[var(--brand-color)] hover:scale-105 cursor-pointer disabled:opacity-50 disabled:!scale-100"
        aria-label="Go to previous page"
        @click="prevPage"
      >
        Prev
      </button>
      <span class="users__page-info text-sm" aria-live="polite">
        Page {{ page }} of {{ totalPages }}
      </span>
      <button
        class="users__page-btn px-4 py-2 border rounded-lg border-[var(--brand-color)] hover:scale-105 cursor-pointer disabled:opacity-50 disabled:!scale-100"
        aria-label="Go to next page"
        :disabled="page === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </section>
</template>