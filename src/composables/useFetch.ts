import { ofetch, type FetchOptions } from 'ofetch'
import { reactive, ref, shallowRef } from 'vue'

export function useFetch<T>(url: string, options?: FetchOptions<'json'>) {
  const data = shallowRef<T | null>(null)
  const error = ref()
  const pending = ref(false)

  async function submit() {
    data.value = null
    error.value = null
    const fetchOptions = reactive({ ...options })

    try {
      pending.value = true
      data.value = await ofetch<T>(`${import.meta.env.VITE_API_BASE_URL}${url}`, fetchOptions)
    } catch (err) {
      error.value = err
    } finally {
      pending.value = false
    }
  }

  return { data, error, pending, submit }
}
