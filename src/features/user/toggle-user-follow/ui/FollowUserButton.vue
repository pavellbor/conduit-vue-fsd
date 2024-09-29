<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session'
import { RoutesNames } from '@/shared/constants/router'
import { useToggleUserFollow } from '../model/toggle-user-follow.composable'

const sessionStore = useSessionStore()
const router = useRouter()
const { followUser, username } = useToggleUserFollow()

const handleButtonClick = () => {
  if (sessionStore.isAnonymous) {
    router.push({ name: RoutesNames.login })
  } else {
    followUser()
  }
}
</script>

<template>
  <button class="btn btn-sm btn-secondary action-btn" @click="handleButtonClick">
    <i class="ion-plus-round"></i>
    &nbsp; Follow {{ username }}
  </button>
</template>
