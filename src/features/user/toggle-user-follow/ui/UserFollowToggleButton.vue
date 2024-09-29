<script setup lang="ts">
import { useToggleUserFollow } from '../model/toggle-user-follow.composable'
import FollowUserButton from './FollowUserButton.vue'
import UnfollowUserButton from './UnfollowUserButton.vue'

const { isUserFollowed } = useToggleUserFollow()
</script>

<template>
  <UnfollowUserButton v-if="isUserFollowed" />
  <FollowUserButton v-else />
</template>
