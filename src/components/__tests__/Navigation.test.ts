import { RouterLink, type Router } from 'vue-router'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { createMockRouter } from '@/test/mocks/router'
import Navigation from '../Navigation.vue'
import Input from '../Input.vue'

describe('Navigation', () => {
  let router: Router

  beforeEach(async () => {
    router = createMockRouter()
  })

  it('should redirect after a user submits a search query', async () => {
    const wrapper = mount(Navigation, {
      global: {
        plugins: [router]
      }
    })

    const push = vi.spyOn(router, 'push')
    const form = wrapper.find('form')
    const input = wrapper.findComponent(Input)

    await input.setValue('Game of Thrones')
    await form.trigger('submit')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith({ name: 'search', query: { q: 'Game of Thrones' } })

    const homeLogo = wrapper.findComponent(RouterLink)
    await homeLogo.trigger('click')

    expect(push).toHaveBeenCalledTimes(2)
  })
})
