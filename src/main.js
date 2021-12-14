import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import './assets/element-variables.scss'
import VueAxios from 'vue-axios'
import axios from './util/axios'

createApp(App).use(store).use(router).use(ElementPlus).use(VueAxios, axios).mount('#app')
