import { computed } from 'vue'
import { useUserStore } from '@/entities/user'
import { followUserApi, unfollowUserApi } from '../api/toggle-user-follow.api'

export const useToggleUserFollow = () => {
  const userStore = useUserStore()
  const username = computed(() => userStore.profile?.username)

  const followUser = async () => {
    if (!username.value) {
      return
    }

    try {
      const { profile } = await followUserApi({ username: username.value })
      userStore.set(profile)
    } catch (error) {
      console.error(`Failed to follow user ${username.value}`, error)
    }
  }

  const unfollowUser = async () => {
    if (!username.value) {
      return
    }

    try {
      const { profile } = await unfollowUserApi({ username: username.value })
      userStore.set(profile)
    } catch (error) {
      console.error(`Failed to unfollow user ${username.value}`, error)
    }
  }

  const isUserFollowed = computed(() => userStore.profile?.following ?? false)

  return {
    followUser,
    unfollowUser,
    isUserFollowed,
    username
  }
}
