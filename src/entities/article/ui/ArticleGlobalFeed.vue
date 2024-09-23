<script setup lang="ts">
import { watch } from 'vue'
import { usePagination } from '@/shared/composables/usePagination'
import { listArticlesApi } from '../api/article.api'
import ArticleList from './ArticleList.vue'

const props = defineProps<{ tag?: string }>()

const fetchArticles = async (offset: number, limit: number) => {
  const { articles, articlesCount } = await listArticlesApi({ limit, offset, tag: props.tag })
  return {
    data: articles,
    totalCount: articlesCount
  }
}

const { data: articles, page, totalPages, setPage, reset } = usePagination(fetchArticles)

watch(() => props.tag, reset)
</script>

<template>
  <ArticleList
    :articles="articles"
    :totalPages="totalPages"
    :currentPage="page"
    @changePage="setPage"
  />
</template>
