<script setup lang="ts">
import { watch } from 'vue'
import { useApiRequest } from '@/shared/composables/useApiRequest'
import { usePagination } from '@/shared/composables/usePagination'
import { listArticlesApi } from '../api/article.api'
import { useArticles } from '../model/article.composables'
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
const { renderArticleActions: articleActions, updateArticle } = useArticles({ articles })

watch(() => props.filters, reset)
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
