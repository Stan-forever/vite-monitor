import { createApp } from 'vue'

//ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//Pinia
import { createPinia } from 'pinia'

//router
import router from '@/router'

//taildwindcss
import 'tailwindcss/tailwind.css'
// reset style sheet
import '@/styles/reset.css'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
