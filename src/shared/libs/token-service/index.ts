import { TOKEN_KEY } from '../../constants/authorization'
import { PersistedStorage } from '../persisted-storage'

export class TokenService {
  static saveToken(token: string) {
    PersistedStorage.setItem(TOKEN_KEY, token)
  }

  static getToken() {
    return PersistedStorage.getItem(TOKEN_KEY)
  }

  static dropToken() {
    PersistedStorage.setItem(TOKEN_KEY, null)
  }
}
