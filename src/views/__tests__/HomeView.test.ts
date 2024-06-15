import type { Router } from 'vue-router'
import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import { createMockRouter } from '@/test/mocks/router'
import HomeView from '../HomeView.vue'
import Loader from '@/components/Loader.vue'
import Slider from '@/components/Slider.vue'

describe('HomeView', () => {
  let router: Router

  beforeAll(() => {
    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        unobserve: vi.fn()
      }))
    })
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    })
  })

  beforeEach(async () => {
    router = createMockRouter()
    const mockIntersectionObserver = vi.fn()

    mockIntersectionObserver.mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }))

    window.IntersectionObserver = mockIntersectionObserver
  })

  it('should render the loading state and after resolving show the slider', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.findComponent(Loader).classes()).toBeTruthy()

    await flushPromises()

    expect(wrapper.findComponent(Slider).classes()).toBeTruthy()
  })

  it('should not render the slider first', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router]
      }
    })
  })
})
