import axios from 'axios'
import store from '../store'
import router from '../router'
import qs from 'qs'

// 30s超时
axios.defaults.timeout = 30000
axios.defaults.baseURL = '/api/'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
  config.headers['Authorization'] = userInfo.token
  config.headers['Accept-Language'] = 'zh-CN'

  if (config.method === 'get') {
    if (!config.url.includes('?')) {
      config.url = config.url + '?'
    }
    if (config.url.endsWith('?')) {
      config.url = config.url + qs.stringify(config.data)
    } else {
      config.url = config.url + '&' + qs.stringify(config.data)
    }
  }

  return config
}, function (error) {
  return Promise.reject({
    message: error + ''
  })
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.success) {
    return response.data.data
  } else if (response.data.code === '2005') {
    store.commit('setUserInfo', {})
    router.push({
      path: '/login',
      query: {
        redirectUrl: encodeURIComponent(window.location.pathname + window.location.search)
      }
    })
  }
  return Promise.reject({
    msg: response.data.msg,
    code: response.data.code
  })
}, function (error) {
  return Promise.reject({
    code: error.response.data.status,
    msg: error.response.data.error
  })
})

export default axios
