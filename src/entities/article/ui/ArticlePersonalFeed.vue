<script setup lang="ts">
import { useApiRequest } from '@/shared/composables/useApiRequest'
import { usePagination } from '@/shared/composables/usePagination'
import { feedArticlesApi } from '../api/article.api'
import { useArticles } from '../model/article.composables'
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
const { renderArticleActions: articleActions, updateArticle } = useArticles({ articles })
</script>

<template>
  <ArticleList
    :isLoading="isLoading"
    :articles="articles"
    :totalPages="totalPages"
    :currentPage="page"
    @pageChange="setPage"
  >
    <template #articleActions="{ article }">
      <component :is="articleActions(article, updateArticle)" />
    </template>
  </ArticleList>
</template>
