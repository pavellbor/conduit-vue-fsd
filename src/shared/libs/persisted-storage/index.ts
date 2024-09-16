export class PersistedStorage {
  static setItem<T>(key: string, data: T): void {
    try {
      const serializedData = JSON.stringify(data)
      localStorage.setItem(key, serializedData)
    } catch (error) {
      throw new Error(`Ошибка при сохранении данных в localStorage: ${error}`)
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const serializedData = localStorage.getItem(key)
      if (serializedData === null) {
        return null
      }
      return JSON.parse(serializedData) as T
    } catch (error) {
      throw new Error(`Ошибка при чтении данных из localStorage: ${error}`)
    }
  }
}
