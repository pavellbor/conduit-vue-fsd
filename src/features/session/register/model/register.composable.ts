import { useSessionStore } from '@/entities/session'
import { useApiRequest } from '@/shared/composables/useApiRequest'
import { TokenService } from '@/shared/libs/token-service'
import { registerApi } from '../api/register.api'

export const useRegister = () => {
  const sessionStore = useSessionStore()

  const register = async ({
    username,
    email,
    password
  }: {
    username: string
    email: string
    password: string
  }) => {
    const { user } = await registerApi({ username, email, password })
    TokenService.saveToken(user.token)
    sessionStore.set({ user, authState: 'authenticated' })
  }

  const { errorMessages, executeRequest } = useApiRequest(register)

  return { register: executeRequest, errorMessages }
}
