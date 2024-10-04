import { apiClient } from '@/shared/libs/api-client'

type DeleteCommentRequest = {
  articleSlug: string
  commentId: number
}

export const deleteCommentApi = async ({ articleSlug, commentId }: DeleteCommentRequest) => {
  const response = await apiClient.delete(`/articles/${articleSlug}/comments/${commentId}`)
  return response.data
}
