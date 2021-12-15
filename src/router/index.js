import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/layout.vue'
import NotFound from '../views/404.vue'
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import UserLayout from '../views/user/layout.vue'
import UserIndex from '../views/user/index.vue'
import UserSecurity from '../views/user/security/index.vue'
import UserApi from '../views/user/api/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Index,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'login',
        component: Login,
        meta: {
          title: '登录'
        }
      },
      {
        path: 'user',
        component: UserLayout,
        children: [
          {
            path: '',
            component: UserIndex,
            meta: {
              title: '账户总览',
              authorization: true
            }
          },
          {
            path: 'security',
            component: UserSecurity,
            meta: {
              title: '账户安全',
              authorization: true
            }
          },
          {
            path: 'api',
            component: UserApi,
            meta: {
              title: 'API管理',
              authorization: true
            }
          },
        ]
      },
      {
        path: '/:catchAll(.*)',
        meta: {
          title: '404'
        },
        component: NotFound
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes
})


router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' - 交易引擎'
  }

  // 权限校验
  if (to.meta && to.meta.authorization) {
    if (!checkLogin()) {
      next({
        path: '/login',
        query: {
          redirectUrl: encodeURIComponent(to.fullPath)
        }
      })
      return
    }
  }

  next()
})

function checkLogin() {
  let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
  return userInfo.token
}

export default router
