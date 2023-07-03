import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css'
import './assets/styles/dark/css-vars.css'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia())
axios.defaults.baseURL="http://localhost:8080"
axios.defaults.timeout=10000
axios.defaults.withCredentials = true
app.use(VueAxios, axios)

app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'
app.use(router)
app.use(ElementPlus)
app.mount('#app')