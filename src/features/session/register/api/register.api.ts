import type { User } from '@/entities/session'
import { apiClient } from '@/shared/libs/api-client'

type RegisterRequest = {
  username: string
  email: string
  password: string
}

type RegisterResponse = {
  user: User
}

export const registerApi = async (registerData: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>('/users', {
    user: registerData
  })
  return response.data
}
