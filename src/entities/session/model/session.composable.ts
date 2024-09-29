import { StatusCodes } from 'http-status-codes'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RoutesNames } from '@/shared/constants/router'
import { ApiClientError } from '@/shared/libs/api-client'
import { TokenService } from '@/shared/libs/token-service'
import { getCurrentUserApi } from '../api/session.api'
import { useSessionStore } from './session.store'

export const useAccessLevelRedirect = () => {
  const session = useSessionStore()
  const router = useRouter()
  const route = useRoute()

  watch(
    () => session.authState,
    () => {
      if (route.meta.accessLevel === 'authenticated' && session.isAnonymous) {
        router.push({ name: RoutesNames.login })
      } else if (route.meta.accessLevel === 'anonymous' && session.isAuthenticated) {
        router.push({ name: RoutesNames.home })
      }
    },
    {
      immediate: true
    }
  )
}

export const useEnsureAuthenticated = () => {
  const session = useSessionStore()
  const router = useRouter()

  return (cb: () => void) => {
    return () => {
      if (session.isAnonymous) {
        return router.push({ name: RoutesNames.login })
      }

      cb()
    }
  }
}

export const useIsCurrentUser = (username: string) => {
  const sessionStore = useSessionStore()
  const isCurrentUser = computed(() => username === sessionStore.user?.username)

  return { isCurrentUser }
}

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
