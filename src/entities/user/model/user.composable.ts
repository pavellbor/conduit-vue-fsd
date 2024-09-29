import { computed } from 'vue'
import { getProfileApi } from '../api/user.api'
import { useUserStore } from './user.store'

export const useFetchUserProfile = () => {
  const userStore = useUserStore()
  const userProfile = computed(() => userStore.profile)

  const fetchUserProfile = async (username: string) => {
    const { profile } = await getProfileApi({ username })
    userStore.set(profile)
  }

  return { userProfile, fetchUserProfile }
}
