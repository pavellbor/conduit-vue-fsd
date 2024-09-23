<script setup lang="ts">
import { format } from 'date-fns'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { RoutesPaths } from '@/shared/constants/router'
import type { Article } from '../model/article.types'

const { article } = defineProps<{
  article: Article
}>()

const authorLink = computed(() => `${RoutesPaths.profile}/${article.author.username}`)
const articleLink = computed(() => `${RoutesPaths.article}/${article.slug}`)
const formattedDate = computed(() => format(article.createdAt, 'MMMM do'))
</script>

<template>
  <div class="article-preview">
    <div class="article-meta">
      <RouterLink :to="authorLink"><img :src="article.author.image" /></RouterLink>
      <div class="info">
        <RouterLink :to="authorLink" class="author">{{ article.author.username }}</RouterLink>
        <span class="date">{{ formattedDate }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
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
