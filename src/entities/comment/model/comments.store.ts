import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Comment } from './comment.type'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])

  const set = (newComments: Comment[]) => (comments.value = newComments)

  const reset = () => (comments.value = [])

  return { comments, set, reset }
})
