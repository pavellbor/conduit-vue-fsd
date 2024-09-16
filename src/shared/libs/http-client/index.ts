import axios from 'axios'
import { addAuthToken } from './interceptors'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.BASE_URL
})

httpClient.interceptors.request.use(addAuthToken)
