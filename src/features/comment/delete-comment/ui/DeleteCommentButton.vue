<script setup lang="ts">
import { useCommentsStore } from '@/entities/comment/model/comments.store'
import { deleteCommentApi } from '../api/delete-comment.api'

const props = defineProps<{ articleSlug: string; commentId: number }>()
const commentsStore = useCommentsStore()

const onClick = async () => {
  await deleteCommentApi({
    articleSlug: props.articleSlug,
    commentId: props.commentId
  })

  commentsStore.set(commentsStore.comments.filter((comment) => comment.id !== props.commentId))
}
</script>

<template>
  <i class="ion-trash-a" @click="onClick"></i>
</template>
