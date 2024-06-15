import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Input from '../Input.vue'

function mountInput(modelProps?: Record<string, unknown>) {
  return mount(Input, {
    props: {
      id: 'foo',
      labelText: 'bar',
      placeholder: 'baz',
      ...modelProps
    }
  })
}

describe('Input', () => {
  it('should render the `labelText` on the label and the `placeholder` on the input', () => {
    const wrapper = mountInput()

    expect(wrapper.find('label').text()).toBe('bar')
    expect(wrapper.find('input').attributes().placeholder).toBe('baz')
  })

  it('should have the label `for` attribute and input `id` match with eachother', () => {
    const wrapper = mountInput()

    expect(wrapper.find('label').attributes().for).toBe('foo')
    expect(wrapper.find('input').attributes().id).toBe('foo')
  })

  it('should have updated the modelValue when entering a text', async () => {
    const wrapper = mountInput({
      modelValue: '',
      'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e })
    })

    await wrapper.find('input').setValue('foobar')

    expect(wrapper.props('modelValue')).toBe('foobar')
  })
})
