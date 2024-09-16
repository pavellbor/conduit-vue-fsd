import { httpClient } from '@/shared/libs/http-client'
import type { Article } from '../model/types'

export const getArticles = async (
  params?: Partial<{
    tag: string
    author: string
    favorited: string
    limit: number
    offset: number
  }>
) => {
  const { data } = await httpClient.get<{
    articles: Article[]
    articlesCount: number
  }>('/articles', { params })
  return data
}
