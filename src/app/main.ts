import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useInitSession } from '@/features/session/init-session'
import { router } from './providers/router'
import App from './ui/App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const { initSession } = useInitSession()
await initSession()

app.mount('#app')
