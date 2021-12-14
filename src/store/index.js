import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
