<script setup lang="ts">
import { usePagination } from '@/shared/composables/usePagination'
import { feedArticlesApi } from '../api/article.api'
import ArticleList from './ArticleList.vue'

const fetchArticles = async (offset: number, limit: number) => {
  const { articles, articlesCount } = await feedArticlesApi({ limit, offset })
  return {
    data: articles,
    totalCount: articlesCount
  }
}

const { data: articles, page, totalPages, setPage } = usePagination(fetchArticles)
</script>

<template>
  <ArticleList
    :articles="articles"
    :totalPages="totalPages"
    :currentPage="page"
    @changePage="setPage"
  />
</template>
