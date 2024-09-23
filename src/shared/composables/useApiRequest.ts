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

export const useApiRequest = () => {
  const isLoading = ref(false)
  const errorMessages = ref<string[]>([])

  const executeRequest = async <T>(request: () => Promise<T>) => {
    let result: T | undefined
    isLoading.value = true
    errorMessages.value = []

    try {
      result = await request()
    } catch (error) {
      errorMessages.value = formatErrorMessages(error)
    } finally {
      isLoading.value = false
    }

    return result
  }

  return {
    executeRequest,
    isLoading,
    errorMessages
  }
}
