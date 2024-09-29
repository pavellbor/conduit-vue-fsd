import { apiClient } from '@/shared/libs/api-client'
import type { User } from '../model/session.types'

type GetCurrentUserResponse = {
  user: User
}

export const getCurrentUserApi = async (): Promise<GetCurrentUserResponse> => {
  const response = await apiClient.get<GetCurrentUserResponse>('/user')
  return response.data
}
