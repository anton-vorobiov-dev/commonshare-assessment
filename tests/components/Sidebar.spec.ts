import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import Sidebar from '../../components/layouts/Sidebar.vue'

describe('Sidebar.vue', () => {
  const makeWrapper = (open: boolean, path = '/') => {
    return mount(Sidebar, {
      props: { open },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: { user: { id: '1', name: 'Test', role: 'admin' }, token: 't' }
            },
          })
        ],
        stubs: { NuxtLink: RouterLinkStub },
        mocks: { $route: { path } }
      }
    })
  }

  it('renders with hidden classes when open=false', () => {
    const wrapper = makeWrapper(false)
    const classes = wrapper.classes()
    // base width
    expect(classes).toContain('w-64')
    // off-screen
    expect(classes).toContain('-translate-x-full')
    // always present lg: rule
    expect(classes).toContain('lg:translate-x-0')
    // does NOT have the open classes
    expect(classes).not.toContain('translate-x-0')
    expect(classes).not.toContain('w-full')
    expect(classes).not.toContain('backdrop-blur-[2px]')
  })

  it('renders with open classes when open=true', () => {
    const wrapper = makeWrapper(true)
    const classes = wrapper.classes()
    // base width
    expect(classes).toContain('w-64')
    // open transform
    expect(classes).toContain('translate-x-0')
    // full width & backdrop
    expect(classes).toContain('w-full')
    expect(classes).toContain('backdrop-blur-[2px]')
    // still has lg:translate-x-0
    expect(classes).toContain('lg:translate-x-0')
    // does NOT have the hidden class
    expect(classes).not.toContain('-translate-x-full')
  })

  it('applies bg-gray-700 to the active link only', () => {
    const wrapper = makeWrapper(true, '/users')
    const links = wrapper.findAllComponents(RouterLinkStub)
    const userLink = links.find(l => l.props('to') === '/users')!
    const dashLink = links.find(l => l.props('to') === '/')!
    // active path gets bg-gray-700
    expect(userLink.classes()).toContain('bg-gray-700')
    // non-active does not
    expect(dashLink.classes()).not.toContain('bg-gray-700')
  })

  it('emits close when clicking overlay (self)', async () => {
    const wrapper = makeWrapper(true)
    await wrapper.trigger('click.self')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits close when clicking any navigation link', async () => {
    const wrapper = makeWrapper(true)
    const links = wrapper.findAllComponents(RouterLinkStub)
    // click brand, dashboard, and (if present) users
    await links[0].trigger('click')
    await links[1].trigger('click')
    if (links.length > 2) await links[2].trigger('click')
    // at least two closes (brand + dashboard)
    expect(wrapper.emitted('close')!.length).toBeGreaterThanOrEqual(2)
  })
})
