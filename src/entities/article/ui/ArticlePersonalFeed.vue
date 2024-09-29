<script setup lang="ts">
import { useApiRequest } from '@/shared/composables/useApiRequest'
import { usePagination } from '@/shared/composables/usePagination'
import { feedArticlesApi } from '../api/article.api'
import type { ArticlePreview } from '../model/article.types'
import ArticleList from './ArticleList.vue'

const fetchArticles = async (offset: number, limit: number) => {
  const { articles, articlesCount } = await feedArticlesApi({ limit, offset })

  return {
    data: articles,
    totalCount: articlesCount
  }
}

const { isLoading, executeRequest } = useApiRequest(fetchArticles)
const { data: articles, page, totalPages, setPage } = usePagination(executeRequest)

const updateItem = (article: ArticlePreview) => {
  const articleIndex = articles.value.findIndex((item) => item.slug === article.slug)

  articles.value = [
    ...articles.value.slice(0, articleIndex),
    article,
    ...articles.value.slice(articleIndex + 1)
  ]
}
</script>

<template>
  <ArticleList
    :isLoading="isLoading"
    :articles="articles"
    :totalPages="totalPages"
    :currentPage="page"
    @pageChange="setPage"
    @updateItem="updateItem"
  />
</template>
