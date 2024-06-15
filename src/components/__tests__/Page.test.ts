import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Page from '../Page.vue'

describe('Page', () => {
  it('should render the content within the slot', () => {
    const testDiv = '<div>Hello World</div>'
    const wrapper = mount(Page, {
      slots: {
        default: testDiv
      }
    })

    expect(wrapper.html()).toContain(testDiv)
  })

  it('should contain the page-content class when the isContentPage is true', () => {
    const wrapper = mount(Page, {
      props: {
        isContentPage: true
      }
    })

    expect(wrapper.classes()).toContain('page-content')
  })
})
