import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import moment from 'moment-jalaali'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('moment', moment)

app.mount('#app')
