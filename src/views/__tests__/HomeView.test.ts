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

  it('should render sliders and titles alphabetically by genre', async () => {
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

    const mockTitleOrders = [
      'Action',
      'Adventure',
      'Crime',
      'Drama',
      'Espionage',
      'Horror',
      'Music',
      'Mystery',
      'Romance',
      'Science-Fiction',
      'Thriller'
    ]

    titles.forEach((title, index) => expect(title.text()).toBe(mockTitleOrders[index]))

    const actionSlider = sliders[0]
    const actionCards = actionSlider.findAllComponents(Card)
    expect(actionCards.length).toBe(3)
  })

  it('should redirect after clicking a card', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router]
      }
    })

    await flushPromises()

    const push = vi.spyOn(router, 'push')
    const card = wrapper.findComponent(Slider).findComponent(Card)

    await card.trigger('click')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith('/show/2')
  })
})
