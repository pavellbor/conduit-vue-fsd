<script setup lang="ts">
import { useToggleUserFollow } from '../model/toggle-user-follow.composable'

const { unfollowUser, username } = useToggleUserFollow()
</script>

<template>
  <button class="btn btn-sm btn-outline-secondary action-btn" @click="unfollowUser">
    <i class="ion-plus-round"></i>
    &nbsp; Unfollow {{ username }}
  </button>
</template>
