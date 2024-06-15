import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Loader from '../Loader.vue'

describe('Loader', () => {
  it('should render 4 spans', () => {
    const wrapper = mount(Loader)

    expect(wrapper.findAll('span').length).toBe(4)
  })
})
