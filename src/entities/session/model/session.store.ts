import { defineStore } from 'pinia'
import type { AuthState, User } from './session.types'

type SessionState = {
  user: User | null
  authState: AuthState
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    user: null,
    authState: 'initial'
  }),
  getters: {
    isAuthenticated: (state) => state.authState === 'authenticated',
    isInitial: (state) => state.authState === 'initial',
    isAnonymous: (state) => state.authState === 'anonymous'
  },
  actions: {
    set(data: Partial<SessionState>) {
      Object.assign(this, data)
    },
    reset() {
      this.$reset()
    }
  }
})
