import type { Article } from '@/entities/article'
import { apiClient } from '@/shared/libs/api-client'

type FavoriteArticleRequest = {
  slug: string
}

type FavoriteArticleResponse = {
  article: Article
}

type UnfavoriteArticleRequest = {
  slug: string
}

type UnfavoriteArticleResponse = {
  article: Article
}

export const favoriteArticleApi = async ({ slug }: FavoriteArticleRequest) => {
  const response = await apiClient.post<FavoriteArticleResponse>(`/articles/${slug}/favorite`)
  return response.data
}

export const unfavoriteArticleApi = async ({ slug }: UnfavoriteArticleRequest) => {
  const response = await apiClient.delete<UnfavoriteArticleResponse>(`/articles/${slug}/favorite`)
  return response.data
}
