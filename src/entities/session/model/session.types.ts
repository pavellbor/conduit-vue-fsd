export type AuthState = 'initial' | 'authenticated' | 'anonymous'

export type User = {
  email: string
  token: string
  username: string
  bio?: string
  image?: string
}
