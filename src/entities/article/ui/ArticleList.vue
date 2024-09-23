<script setup lang="ts">
import UIPagination from '@/shared/ui/UIPagination.vue'
import type { Article } from '../model/article.types'
import ArticlePreview from './ArticlePreview.vue'

defineProps<{
  articles: Article[]
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'changePage', newPage: number): void
}>()
</script>

<template>
  <ArticlePreview v-for="article in articles" :article="article" :key="article.slug" />

  <UIPagination
    :current-page="currentPage"
    @update:current-page="$emit('changePage', $event)"
    :page-count="totalPages"
  />
</template>
