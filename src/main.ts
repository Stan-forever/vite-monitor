import { createApp } from 'vue'
import App from './App.vue'
//ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//Pinia
import pinia from '@/stores/index'
//router
import router from '@/router'
//taildwindcss
import 'tailwindcss/tailwind.css'
// element主题修改
import '@/styles/elementVariable.scss'
// reset style sheet
import '@/styles/reset.css'
// custom element css
import '@/styles/element.scss'
// CSS common style sheet
import '@/styles/common.scss'

import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
