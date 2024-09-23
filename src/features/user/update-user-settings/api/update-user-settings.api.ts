import type { User } from '@/entities/session'
import { apiClient } from '@/shared/libs/api-client'

type UpdateUserRequest = Partial<{
  email: string
  username: string
  bio: string
  image: string
  password: string
}>

type UpdateUserResponse = {
  user: User
}

export const updateUserApi = async (
  updateUserData: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = await apiClient.put<UpdateUserResponse>('/user', { user: updateUserData })
  return response.data
}
