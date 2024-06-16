import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Article from '../Article.vue'
import Title from '../Title.vue'

const props = {
  title: 'foo',
  text: 'bar'
}

describe('Article', () => {
  it('should render the titleheading as an h2 by default', () => {
    const wrapper = mount(Article, { props })

    const title = wrapper.findComponent(Title)
    expect(title).toBeTruthy()
    expect(title.text()).toBe('foo')
  })

  it('should render the text in the p tag', () => {
    const wrapper = mount(Article, { props })

    const text = wrapper.find('p')
    expect(text.text()).toBe('bar')
  })
})
