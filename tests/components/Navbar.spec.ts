import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

import Navbar from '~/components/layouts/Navbar.vue'
import { useAuthStore } from '~/stores/auth'

// 1) mock vue-router’s useRouter before importing the component
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() })
}))

describe('Navbar.vue', () => {
  it('renders greeting and calls logout when Logout button clicked', async () => {
    // 2) set up Pinia with real actions
    const pinia = createTestingPinia({
      initialState: {
        auth: { user: { id: '1', name: 'Zlatа', role: 'admin' }, token: 't' }
      },
      stubActions: false,
    })

    // 3) mount with NuxtLink stubbed
    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia],
        stubs: { NuxtLink: RouterLinkStub }
      }
    })

    // 4) confirm greeting is rendered
    expect(wrapper.text()).toContain('Hi, Zlatа')

    // 5) override the store.logout method so we can spy on it
    const authStore = useAuthStore()
    authStore.logout = vi.fn()

    // 6) find the actual Logout button (not the burger) and click it
    const logoutBtn = wrapper.findAll('button')
      .find(btn => btn.text().trim() === 'Logout')!
    await logoutBtn.trigger('click')

    // 7) assert logout was called
    expect(authStore.logout).toHaveBeenCalled()
  })
})
