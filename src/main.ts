import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { router } from './app/providers/router'
import App from './app/ui/App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
