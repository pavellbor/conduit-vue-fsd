import type { InternalAxiosRequestConfig } from 'axios'
import { TOKEN_KEY } from '../../constants/authorization'
import { PersistedStorage } from '../persisted-storage'

const getAccessToken = () => PersistedStorage.getItem<string>(TOKEN_KEY)

export const addAuthToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}
