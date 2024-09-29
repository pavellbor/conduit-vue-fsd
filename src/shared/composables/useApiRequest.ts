import { ref } from 'vue'
import { ApiClientError } from '../libs/api-client'

const formatApiErrors = (errors: Record<string, string[]> = {}) =>
  Object.entries(errors).flatMap(([field, messages]) =>
    messages.map((message) => `${field} ${message}`)
  )

const formatErrorMessages = (error: unknown) => {
  if (error instanceof ApiClientError) {
    return formatApiErrors(error.response?.data?.errors)
  } else if (error instanceof Error && error.message) {
    return [error.message]
  } else {
    return ['An unknown error occurred']
  }
}

export const useApiRequest = <T, A extends any[]>(request: (...args: A) => Promise<T>) => {
  const isLoading = ref(false)
  const errorMessages = ref<string[]>([])

  const executeRequest = async (...args: A) => {
    isLoading.value = true
    errorMessages.value = []

    try {
      const result = await request(...args)
      return result
    } catch (error) {
      errorMessages.value = formatErrorMessages(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    executeRequest,
    isLoading,
    errorMessages
  }
}
