<script setup lang="ts">
import { watch } from 'vue'
import { useApiRequest } from '@/shared/composables/useApiRequest'
import { usePagination } from '@/shared/composables/usePagination'
import { listArticlesApi } from '../api/article.api'
import type { ArticlePreview } from '../model/article.types'
import ArticleList from './ArticleList.vue'

const props = defineProps<{ filters?: { tag?: string; author?: string; favorited?: string } }>()

const fetchArticles = async (offset: number, limit: number) => {
  const { articles, articlesCount } = await listArticlesApi({
    limit,
    offset,
    tag: props.filters?.tag,
    author: props.filters?.author,
    favorited: props.filters?.favorited
  })

  return {
    data: articles,
    totalCount: articlesCount
  }
}

const { isLoading, executeRequest } = useApiRequest(fetchArticles)
const { data: articles, page, totalPages, setPage, reset } = usePagination(executeRequest)

const updateItem = (article: ArticlePreview) => {
  const articleIndex = articles.value.findIndex((item) => item.slug === article.slug)

  articles.value = [
    ...articles.value.slice(0, articleIndex),
    article,
    ...articles.value.slice(articleIndex + 1)
  ]
}

watch(() => props.filters, reset)
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
