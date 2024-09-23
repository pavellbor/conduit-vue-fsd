import type { User } from '@/entities/session'
import { apiClient } from '@/shared/libs/api-client'

type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = {
  user: User
}

export const loginApi = async (loginData: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/users/login', {
    user: loginData
  })
  return response.data
}
