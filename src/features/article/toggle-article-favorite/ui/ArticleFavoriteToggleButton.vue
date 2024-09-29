<script setup lang="ts">
import type { Article, ArticlePreview } from '@/entities/article'
import { useToggleArticleFavorite } from '../model/toggle-article-favorite.composable'
import FavoriteArticleButton from './FavoriteArticleButton.vue'
import UnfavoriteArticleButton from './UnfavoriteArticleButton.vue'

const props = defineProps<{
  article: ArticlePreview | Article
}>()

const emit = defineEmits<{
  (e: 'toggle', value: { favorited: boolean; favoritesCount: number }): void
}>()

const { favoriteArticle, unfavoriteArticle } = useToggleArticleFavorite({
  slug: props.article.slug,
  onToggled: ({ favorited, favoritesCount }) => emit('toggle', { favorited, favoritesCount })
})
</script>

<template>
  <UnfavoriteArticleButton
    v-if="article.favorited"
    :favorites-count="article.favoritesCount"
    @click="unfavoriteArticle"
  >
    <template #default="{ favoritesCount }">
      <slot name="unfavorite" :favoritesCount="favoritesCount"></slot>
    </template>
  </UnfavoriteArticleButton>
  <FavoriteArticleButton v-else :favorites-count="article.favoritesCount" @click="favoriteArticle">
    <template #default="{ favoritesCount }">
      <slot name="favorite" :favoritesCount="favoritesCount"></slot>
    </template>
  </FavoriteArticleButton>
</template>
