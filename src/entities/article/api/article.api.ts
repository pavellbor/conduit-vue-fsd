import { apiClient } from '@/shared/libs/api-client'
import type { Article } from '../model/article.types'

type ListArticlesRequest = Partial<{
  tag: string
  author: string
  favorited: string
  limit: number
  offset: number
}>

type ListArticlesResponse = {
  articles: Article[]
  articlesCount: number
}

type FeedArticlesRequest = Partial<{
  limit: number
  offset: number
}>

type FeedArticlesResponse = {
  articles: Article[]
  articlesCount: number
}

export const listArticlesApi = async (getArticlesData?: ListArticlesRequest) => {
  const { data } = await apiClient.get<ListArticlesResponse>('/articles', {
    params: getArticlesData
  })
  return data
}

export const feedArticlesApi = async (getArticlesData?: FeedArticlesRequest) => {
  const { data } = await apiClient.get<FeedArticlesResponse>('/articles/feed', {
    params: getArticlesData
  })
  return data
}
