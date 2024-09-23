import { useSessionStore } from '@/entities/session'
import { useApiRequest } from '@/shared/composables/useApiRequest'
import { TokenService } from '@/shared/libs/token-service'
import { loginApi } from '../api/login.api'

export const useLogin = () => {
  const { set } = useSessionStore()
  const { errorMessages, executeRequest } = useApiRequest()

  const login = async ({ email, password }: { email: string; password: string }) =>
    executeRequest(async () => {
      const { user } = await loginApi({ email, password })

      TokenService.saveToken(user.token)
      set({ user, authState: 'authenticated' })
    })

  return { login, errorMessages }
}
