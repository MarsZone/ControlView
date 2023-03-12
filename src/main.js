import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
axios.defaults.baseURL="http://localhost:8080"
axios.defaults.timeout=2000
axios.defaults.withCredentials = true
app.use(VueAxios, axios)

app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'
app.use(router)
app.use(ElementPlus)
app.mount('#app')