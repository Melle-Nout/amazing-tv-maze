import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest'
import { RouterLink, type Router } from 'vue-router'
import { mount } from '@vue/test-utils'

import { createMockRouter } from '@/test/mocks/router'
import { mockIntersectionObserver } from '@/test/mocks/window-mocks'
import Card from '../Card.vue'

const props = {
  images: {
    original: 'foo',
    medium: 'bar'
  }
}

describe('Card', () => {
  let router: Router

  beforeAll(() => (window.IntersectionObserver = mockIntersectionObserver()))

  beforeEach(async () => {
    router = createMockRouter()
  })

  it('should render an Image component when the props are present', () => {
    const wrapper = mount(Card, {
      props
    })

    const image = wrapper.getComponent(Image)

    expect(image).toBeTruthy()
  })

  it('should render a div when there is no `id` present as a prop', () => {
    const wrapper = mount(Card, {
      props
    })

    const outerDiv = wrapper.find('div')

    expect(outerDiv).toBeTruthy()
    expect(outerDiv.classes()).toContain('card')
  })

  it('should render a RouterLink when an `id` is present as a prop', () => {
    const wrapper = mount(Card, {
      global: {
        plugins: [router]
      },
      props: { ...props, id: 1 }
    })

    const routerLink = wrapper.findComponent(RouterLink)

    expect(routerLink).toBeTruthy()
  })

  it('should redirect when an `id` is present and the card is clicked', async () => {
    const wrapper = mount(Card, {
      global: {
        plugins: [router]
      },
      props: { ...props, id: 1 }
    })

    const push = vi.spyOn(router, 'push')
    const outerLink = wrapper.findComponent(RouterLink)

    expect(outerLink).toBeTruthy()

    await outerLink.trigger('click')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith('/show/1')
  })

  it('should render a span containing the `rating` when present as a prop', () => {
    const wrapper = mount(Card, {
      props: { ...props, rating: 9 }
    })

    const span = wrapper.find('span')

    expect(span).toBeTruthy()
    expect(span.text()).toBe('9 ⭐')
  })
})
