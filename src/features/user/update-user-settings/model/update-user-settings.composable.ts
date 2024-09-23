import { useSessionStore } from '@/entities/session'
import { useApiRequest } from '@/shared/composables/useApiRequest'
import { updateUserApi } from '../api/update-user-settings.api'

type UpdateUserSettingsData = Partial<{
  email: string
  username: string
  bio: string
  image: string
  password: string
}>

export const useUpdateUserSettings = () => {
  const sessionStore = useSessionStore()
  const { errorMessages, executeRequest } = useApiRequest()

  const updateUserSettings = async (updateUserSettingsData: UpdateUserSettingsData) =>
    executeRequest(async () => {
      const { user } = await updateUserApi(updateUserSettingsData)
      sessionStore.set({ user })
    })

  return { updateUserSettings, errorMessages }
}
