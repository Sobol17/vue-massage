import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import i18n from "@/i18n.js";

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(VueTheMask)

app.mount('#app')
