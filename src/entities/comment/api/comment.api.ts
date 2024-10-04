import { apiClient } from '@/shared/libs/api-client'
import type { Comment } from '../model/comment.type'

type GetCommentsRequest = {
  articleSlug: string
}

type GetCommentsResponse = {
  comments: Comment[]
}

export const getCommentsApi = async ({
  articleSlug
}: GetCommentsRequest): Promise<GetCommentsResponse> => {
  const response = await apiClient.get<GetCommentsResponse>(`/articles/${articleSlug}/comments`)
  return response.data
}
