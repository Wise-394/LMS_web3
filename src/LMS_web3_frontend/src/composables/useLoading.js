import { ref } from 'vue'

export function useLoading(initialState = false) {
  const isLoading = ref(initialState)
  const loadingText = ref('')

  const startLoading = (text = '') => {
    isLoading.value = true
    loadingText.value = text
  }

  const stopLoading = () => {
    isLoading.value = false
    loadingText.value = ''
  }

  const withLoading = async (fn, text = '') => {
    try {
      startLoading(text)
      const result = await fn()
      return result
    } finally {
      stopLoading()
    }
  }

  return {
    isLoading,
    loadingText,
    startLoading,
    stopLoading,
    withLoading
  }
} 