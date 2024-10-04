<script setup lang="ts">
import { computed } from 'vue'
import UIPagination from '@/shared/ui/UIPagination.vue'
import type { ArticlePreview } from '../model/article.types'
import ArticleListItem from './ArticleListItem.vue'

const props = defineProps<{
  isLoading: boolean
  articles: ArticlePreview[]
  currentPage: number
  totalPages: number
}>()

const areArticlesEmpty = computed(() => props.articles.length === 0)

defineEmits<{
  (e: 'pageChange', newPage: number): void
}>()
</script>

<template>
  <div v-if="isLoading" class="article-preview">Loading articles...</div>

  <div v-else-if="areArticlesEmpty" class="article-preview">No articles are here... yet.</div>

  <template v-else>
    <ArticleListItem v-for="article in articles" :article="article" :key="article.slug">
      <template #actions="{ article }">
        <slot name="articleActions" :article="article"></slot>
      </template>
    </ArticleListItem>

    <UIPagination
      :current-page="currentPage"
      @update:current-page="$emit('pageChange', $event)"
      :page-count="totalPages"
    />
  </template>
</template>
