import { apiClient } from '@/shared/libs/api-client'

type TagResponse = {
  tags: string[]
}

export const getTagsApi = async (): Promise<TagResponse> => {
  const response = await apiClient.get<TagResponse>('/tags')
  return response.data
}
