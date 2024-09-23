import type { User } from '@/entities/session'
import { apiClient } from '@/shared/libs/api-client'

type GetCurrentUserResponse = {
  user: User
}

export const getCurrentUserApi = async (): Promise<GetCurrentUserResponse> => {
  const response = await apiClient.get<GetCurrentUserResponse>('/user')
  return response.data
}
