<script setup lang="ts">
import { getArticles } from '@/entities/article'
import { usePagination } from '@/shared/composables/usePagination'
import UIPagination from '@/shared/ui/UIPagination.vue'
import ArticlePreview from './ArticlePreview.vue'

const fetchArticles = async (offset: number, limit: number) => {
  const { articles, articlesCount } = await getArticles({ limit, offset })
  return { data: articles, totalCount: articlesCount }
}

const { data: articles, totalPages, page, setPage } = usePagination(fetchArticles)
</script>

<template>
  <ArticlePreview v-for="article in articles" :article="article" :key="article.slug" />

  <UIPagination :current-page="page" @update:current-page="setPage" :page-count="totalPages" />
</template>
