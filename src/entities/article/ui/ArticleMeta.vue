<script setup lang="ts">
import { format } from 'date-fns'
import { computed } from 'vue'
import { RoutesPaths } from '@/shared/constants/router'
import type { Author } from '../model/article.types'

const props = defineProps<{
  author: Author
  createdAt: string
}>()

const authorLink = computed(() => `${RoutesPaths.profile}/${props.author.username}`)
const formattedDate = computed(() => format(props.createdAt, 'MMMM do'))
</script>

<template>
  <div class="article-meta">
    <RouterLink :to="authorLink"><img :src="author.image" /></RouterLink>
    <div class="info">
      <RouterLink :to="authorLink" class="author">{{ author.username }}</RouterLink>
      <span class="date">{{ formattedDate }}</span>
    </div>

    <slot></slot>
  </div>
</template>
