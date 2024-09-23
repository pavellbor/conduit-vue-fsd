import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session'
import { RoutesNames } from '@/shared/constants/router'

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
