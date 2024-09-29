<script setup lang="ts">
import ProfileArticlesFeed from './ProfileArticlesFeed.vue'
import ProfileUserInfo from './ProfileUserInfo.vue'

defineProps<{
  username: string
}>()
</script>

<template>
  <div class="profile-page">
    <ProfileUserInfo :username="username" />
    <ProfileArticlesFeed :username="username" />
  </div>
</template>
