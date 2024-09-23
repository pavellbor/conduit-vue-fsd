<script setup lang="ts">
import { ref } from 'vue'
import { getTagsApi } from '../api/tag.api'

const emit = defineEmits<{
  (e: 'selectTag', tag: string): void
}>()

const tags = ref<string[]>()

const fetchTags = async () => {
  const response = await getTagsApi()
  tags.value = response.tags
}

fetchTags()
</script>

<template>
  <div class="tag-list">
    <a
      v-for="tag in tags"
      :key="tag"
      href=""
      class="tag-pill tag-default"
      @click.prevent="emit('selectTag', tag)"
      >{{ tag }}</a
    >
  </div>
</template>
