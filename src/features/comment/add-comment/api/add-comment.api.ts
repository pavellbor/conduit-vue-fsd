import type { Comment } from '@/entities/comment'
import { apiClient } from '@/shared/libs/api-client'

type AddCommentRequest = {
  articleSlug: string
  comment: {
    body: string
  }
}

type AddCommentResponse = {
  comment: Comment
}

export const addCommentApi = async ({ articleSlug, comment }: AddCommentRequest) => {
  const response = await apiClient.post<AddCommentResponse>(`/articles/${articleSlug}/comments`, {
    comment
  })
  return response.data
}
