import { apiClient } from '@/shared/libs/api-client'
import type { Article, ArticlePreview } from '../model/article.types'

type ListArticlesRequest = Partial<{
  tag: string
  author: string
  favorited: string
  limit: number
  offset: number
}>

type ListArticlesResponse = {
  articles: ArticlePreview[]
  articlesCount: number
}

type FeedArticlesRequest = Partial<{
  limit: number
  offset: number
}>

type FeedArticlesResponse = {
  articles: ArticlePreview[]
  articlesCount: number
}

type GetArticleRequest = {
  slug: string
}

type GetArticleResponse = {
  article: Article
}

export const listArticlesApi = async (params?: ListArticlesRequest) => {
  const response = await apiClient.get<ListArticlesResponse>('/articles', {
    params
  })
  return response.data
}

export const feedArticlesApi = async (params?: FeedArticlesRequest) => {
  const response = await apiClient.get<FeedArticlesResponse>('/articles/feed', {
    params
  })
  return response.data
}

export const getArticleApi = async ({ slug }: GetArticleRequest) => {
  const response = await apiClient.get<GetArticleResponse>(`/articles/${slug}`)
  return response.data
}
