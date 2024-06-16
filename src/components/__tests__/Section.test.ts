import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Section from '../Section.vue'

describe('Section', () => {
  it('should render the content within the slot', () => {
    const testDiv = '<div>Hello World</div>'
    const wrapper = mount(Section, {
      slots: {
        default: testDiv
      }
    })

    expect(wrapper.html()).toContain(testDiv)
  })

  it('should contain the `has-border` class when showBorder is true', () => {
    const wrapper = mount(Section, {
      props: {
        showBorder: true
      }
    })

    expect(wrapper.classes()).toContain('has-border')
  })
})
