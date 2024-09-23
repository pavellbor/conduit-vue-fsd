import { StatusCodes } from 'http-status-codes'
import { useSessionStore } from '@/entities/session'
import { ApiClientError } from '@/shared/libs/api-client'
import { TokenService } from '@/shared/libs/token-service'
import { getCurrentUserApi } from '../api/init-session.api'

export const useInitSession = () => {
  const sessionStore = useSessionStore()

  const initSession = async () => {
    if (!TokenService.getToken()) {
      sessionStore.set({ authState: 'anonymous' })
      return
    }

    try {
      const { user } = await getCurrentUserApi()
      sessionStore.set({ user, authState: 'authenticated' })
    } catch (error) {
      if (error instanceof ApiClientError && error.response?.status === StatusCodes.UNAUTHORIZED) {
        TokenService.dropToken()
      }

      sessionStore.set({ authState: 'anonymous' })
    }
  }

  return { initSession }
}
