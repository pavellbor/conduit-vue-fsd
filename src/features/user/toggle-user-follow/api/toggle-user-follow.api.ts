import type { Profile } from '@/entities/user'
import { apiClient } from '@/shared/libs/api-client'

type FollowUserRequest = {
  username: string
}

type FollowUserResponse = {
  profile: Profile
}

export const followUserApi = async ({
  username
}: FollowUserRequest): Promise<FollowUserResponse> => {
  const response = await apiClient.post<FollowUserResponse>(`/profiles/${username}/follow`)
  return response.data
}

export const unfollowUserApi = async ({
  username
}: FollowUserRequest): Promise<FollowUserResponse> => {
  const response = await apiClient.delete<FollowUserResponse>(`/profiles/${username}/follow`)
  return response.data
}
