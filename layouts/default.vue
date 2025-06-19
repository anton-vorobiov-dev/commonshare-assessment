<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar
      :open="sidebarOpen"
      class="fixed inset-y-0 left-0 lg:static lg:translate-x-0 z-20 transition-transform"
      @close="sidebarOpen = false"
    />

    <!-- Main area -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

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
