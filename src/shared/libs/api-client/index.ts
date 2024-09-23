import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { TokenService } from '../token-service'

export const ApiClientError = AxiosError

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.BASE_URL
})

const addAuthToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = TokenService.getToken()
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
}

apiClient.interceptors.request.use(addAuthToken)
