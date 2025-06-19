<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '../types'

// Apply auth middleware
definePageMeta({ middleware: ['auth'] })

// Fetch users with default empty array
const { data: users } = await useFetch<User[]>('/api/users', {
  key: 'apiUsers',
  dedupe: 'defer',
  default: () => [] as User[],
})

// Computed metrics
const totalUsers = computed(() => users.value.length)
const adminsCount = computed(() => users.value.filter((u: User) => u.role === 'admin').length)
const percentAdmins = computed(() =>
  totalUsers.value ? Math.round((adminsCount.value / totalUsers.value) * 100) : 0
)
const percentViewers = computed(() => (totalUsers.value ? 100 - percentAdmins.value : 0))
const averageAge = computed(() =>
  totalUsers.value
    ? users.value.reduce((sum: number, u: User) => sum + u.age, 0) / totalUsers.value
    : 0
)

// Top 5 countries
const countryCounts = computed(() => {
  const map = new Map<string, number>()
  users.value.forEach((u: User) => map.set(u.country, (map.get(u.country) || 0) + 1))
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
})
const topCountries = computed(() =>
  [...countryCounts.value].sort((a, b) => b.count - a.count).slice(0, 5)
)
</script>

<template>
  <section class="dashboard"  aria-labelledby="dashboard-title">
    <h1 id="dashboard-title" class="dashboard__title text-2xl font-bold mb-6">Dashboard</h1>

    <!-- Metrics -->
    <div
class="dashboard__metrics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" 
    role="region" aria-labelledby="total-users-label" >
      <div class="dashboard__metric-card p-4 bg-white shadow rounded-lg">
        <p class="dashboard__metric-label text-sm font-medium text-gray-500">Total Users</p>
        <p class="dashboard__metric-value mt-2 text-3xl font-semibold">{{ totalUsers }}</p>
      </div>
      <div class="dashboard__metric-card p-4 bg-white shadow rounded-lg">
        <p class="dashboard__metric-label text-sm font-medium text-gray-500">Administrators</p>
        <p class="dashboard__metric-value mt-2 text-3xl font-semibold">{{ percentAdmins }}%</p>
      </div>
      <div class="dashboard__metric-card p-4 bg-white shadow rounded-lg">
        <p class="dashboard__metric-label text-sm font-medium text-gray-500">Viewers</p>
        <p class="dashboard__metric-value mt-2 text-3xl font-semibold">{{ percentViewers }}%</p>
      </div>
      <div class="dashboard__metric-card p-4 bg-white shadow rounded-lg">
        <p class="dashboard__metric-label text-sm font-medium text-gray-500">Average Age</p>
        <p class="dashboard__metric-value mt-2 text-3xl font-semibold">{{ averageAge.toFixed(1) }}</p>
      </div>
    </div>

    <!-- Top 5 Countries -->
    <div class="dashboard__top-countries bg-white shadow rounded-lg p-4" role="region"  aria-labelledby="top-countries-title" >
      <h2 id="top-countries-title" class="dashboard__subtitle text-xl font-semibold mb-4">Top 5 Countries by User Count</h2>
      <ul class="dashboard__country-list space-y-2">
        <li
          v-for="(country, idx) in topCountries"
          :key="country.name"
          class="dashboard__country-item flex justify-between"
        >
          <span class="dashboard__country-rank text-base">{{ idx + 1 }}. {{ country.name }}</span>
          <span class="dashboard__country-count text-base">{{ country.count }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>