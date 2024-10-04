<script setup lang="ts">
import { format } from 'date-fns'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { RoutesPaths } from '@/shared/constants/router'
import type { Comment } from '../model/comment.type'

const props = defineProps<{
  comment: Comment
}>()

const authorLink = computed(() => `${RoutesPaths.profile}/${props.comment.author.username}`)
const formattedDate = computed(() => format(props.comment.createdAt, 'MMMM d, yyyy'))
</script>

<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <RouterLink :to="authorLink" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </RouterLink>
      &nbsp;
      <RouterLink :to="authorLink" class="comment-author">{{ comment.author.username }}</RouterLink>
      <span class="date-posted">{{ formattedDate }}</span>
      <span class="mod-options">
        <slot name="actions" :comment="comment"></slot>
      </span>
    </div>
  </div>
</template>
