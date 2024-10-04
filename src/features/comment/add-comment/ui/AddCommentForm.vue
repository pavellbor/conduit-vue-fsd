<script setup lang="ts">
import { ref } from 'vue'
import { useCommentsStore } from '@/entities/comment/model/comments.store'
import { useSessionStore } from '@/entities/session'
import { addCommentApi } from '../api/add-comment.api'

const props = defineProps<{ articleSlug: string }>()
const sessionStore = useSessionStore()
const commentsStore = useCommentsStore()

const body = ref('')

const onSubmit = async () => {
  const response = await addCommentApi({
    articleSlug: props.articleSlug,
    comment: { body: body.value }
  })

  commentsStore.set([response.comment, ...commentsStore.comments])

  body.value = ''
}
</script>

<template>
  <form class="card comment-form" @submit.prevent="onSubmit">
    <div class="card-block">
      <textarea
        v-model="body"
        class="form-control"
        placeholder="Write a comment..."
        rows="3"
      ></textarea>
    </div>
    <div class="card-footer">
      <img :src="sessionStore.user?.image" class="comment-author-img" />
      <button class="btn btn-sm btn-primary">Post Comment</button>
    </div>
  </form>
</template>
