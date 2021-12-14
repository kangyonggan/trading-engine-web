import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/index'

const routes = [
  {
    path: '/',
    component: Index
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',
  routes
})

export default router
