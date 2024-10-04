<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArticleFavoriteToggleButton } from '@/features/article/toggle-article-favorite'
import { RoutesPaths } from '@/shared/constants/router'
import type { ArticlePreview } from '../model/article.types'
import ArticleMeta from './ArticleMeta.vue'

const props = defineProps<{
  article: ArticlePreview
}>()

const article = computed(() => props.article)
const articleLink = computed(() => `${RoutesPaths.article}/${article.value.slug}`)
</script>

<template>
  <div class="article-preview">
    <ArticleMeta :author="article.author" :created-at="article.createdAt">
      <slot name="actions" :article="article"></slot>
    </ArticleMeta>
    <RouterLink :to="articleLink" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill tag-outline">
          {{ tag }}
        </li>
      </ul>
    </RouterLink>
  </div>
</template>
