import { useSessionStore } from '@/entities/session'
import { TokenService } from '@/shared/libs/token-service'

export const useLogout = () => {
  const { set } = useSessionStore()

  const logout = () => {
    set({ user: null, authState: 'anonymous' })
    TokenService.dropToken()
  }

  return { logout }
}
