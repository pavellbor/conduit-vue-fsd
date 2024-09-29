<script setup lang="ts">
import type { Profile } from '@/entities/user'
import { useToggleUserFollow } from '../model/toggle-user-follow.composable'
import FollowUserButton from './FollowUserButton.vue'
import UnfollowUserButton from './UnfollowUserButton.vue'

const props = defineProps<{ profile: Profile }>()
const emit = defineEmits<{ (e: 'toggle', value: { following: boolean }): void }>()

const { followUser, unfollowUser } = useToggleUserFollow({
  username: props.profile.username,
  onToggled: ({ following }) => emit('toggle', { following })
})
</script>

<template>
  <UnfollowUserButton v-if="profile.following" :username="profile.username" @click="unfollowUser" />
  <FollowUserButton v-else :username="profile.username" @click="followUser" />
</template>
