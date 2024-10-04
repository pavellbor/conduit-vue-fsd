<script setup lang="ts">
import { getCommentsApi } from '../api/comment.api'
import { useCommentsStore } from '../model/comments.store'
import CommentListItem from './CommentListItem.vue'

const props = defineProps<{ articleSlug: string }>()

const commentsStore = useCommentsStore()

const fetchComments = async () => {
  const response = await getCommentsApi({ articleSlug: props.articleSlug })
  commentsStore.set(response.comments)
}

fetchComments()
</script>

<template>
  <CommentListItem v-for="comment in commentsStore.comments" :key="comment.id" :comment="comment">
    <template #actions="{ comment }">
      <slot name="commentActions" :comment="comment"></slot>
    </template>
  </CommentListItem>
</template>
