import { apiClient } from '@/shared/libs/api-client'
import type { Profile } from '../model/user.type'

type GetProfileRequest = {
  username: string
}

type GetProfileResponse = {
  profile: Profile
}

export const getProfileApi = async ({
  username
}: GetProfileRequest): Promise<GetProfileResponse> => {
  const response = await apiClient.get<GetProfileResponse>(`/profiles/${username}`)
  return response.data
}
