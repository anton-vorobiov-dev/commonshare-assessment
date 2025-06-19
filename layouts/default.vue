<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar
      :open="sidebarOpen"
      @close="sidebarOpen = false"
      class="fixed inset-y-0 left-0 lg:static lg:translate-x-0 z-20 transition-transform"
    />

    <!-- Main area -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <Navbar @toggleSidebar="sidebarOpen = !sidebarOpen" />

      <!-- Тут рендериться кожна сторінка -->
      <main class="flex-1 overflow-auto p-4">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '~/components/layouts/Navbar.vue'
import Sidebar from '~/components/layouts/Sidebar.vue'

const sidebarOpen = ref(false)
</script>
