import type { Router } from 'vue-router'
import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import { createMockRouter } from '@/test/mocks/router'
import {
  mockIntersectionObserver,
  mockMatchMedia,
  mockResizeObserver
} from '@/test/mocks/window-mocks'
import HomeView from '../HomeView.vue'
import Loader from '@/components/Loader.vue'
import Slider from '@/components/Slider.vue'
import Card from '@/components/Card.vue'

describe('HomeView', () => {
  let router: Router

  beforeAll(() => {
    window.IntersectionObserver = mockIntersectionObserver()
    window.matchMedia = mockMatchMedia()
    window.ResizeObserver = mockResizeObserver()
  })

  beforeEach(async () => {
    router = createMockRouter()
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

  it('should render sliders and titles alphabetically', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router]
      }
    })

    await flushPromises()

    const titles = wrapper.findAll('h2')
    const sliders = wrapper.findAllComponents(Slider)
    expect(titles.length).toBe(11)
    expect(sliders.length).toBe(11)

    const actionTitle = titles[0]
    const actionSlider = sliders[0]
    const actionCards = actionSlider.findAllComponents(Card)
    expect(actionTitle.text()).toBe('Action')
    expect(actionCards.length).toBe(3)
  })
})
