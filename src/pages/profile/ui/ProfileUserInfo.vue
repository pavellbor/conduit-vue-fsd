<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { UserFollowToggleButton } from '@/features/user/toggle-user-follow'
import { useIsCurrentUser, useSessionStore } from '@/entities/session'
import { useFetchUserProfile, useUserStore } from '@/entities/user'
import { RoutesNames } from '@/shared/constants/router'

const props = defineProps<{
  username: string
}>()

const { userProfile, fetchUserProfile } = useFetchUserProfile()
const { isCurrentUser } = useIsCurrentUser(props.username)
const userStore = useUserStore()

watch(
  () => props.username,
  (newUsername) => fetchUserProfile(newUsername),
  { immediate: true }
)

onUnmounted(() => userStore.reset())

const router = useRouter()

const navigateToSettings = () => router.push({ name: RoutesNames.settings })
</script>

<template>
  <div class="user-info">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="userProfile?.image" class="user-img" />
          <h4>{{ userProfile?.username }}</h4>
          <p>{{ userProfile?.bio }}</p>
          <button
            v-if="isCurrentUser"
            class="btn btn-sm btn-outline-secondary action-btn"
            @click="navigateToSettings"
          >
            <i class="ion-gear-a"></i>
            &nbsp; Edit Profile Settings
          </button>
          <UserFollowToggleButton v-else-if="userProfile" />
        </div>
      </div>
    </div>
  </div>
</template>
