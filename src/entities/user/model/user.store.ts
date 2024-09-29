import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Profile } from './user.type'

export const useUserStore = defineStore('user', () => {
  const profile = ref<Profile>()

  const set = (newProfile: Profile) => (profile.value = newProfile)

  const reset = () => (profile.value = undefined)

  return { profile, set, reset }
})
