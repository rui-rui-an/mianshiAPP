import Vue from 'vue'
import Vuex from 'vuex'
import { auInfo } from '@/api/my.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '',
    isLogin: false
  },
  mutations: {
    setUserInfo (state, value) {
      state.userInfo = value
    },
    setIsLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {
    async refreshUserInfo (store) {
      const res = await auInfo()
      store.commit('setUserInfo', res.data.data)
    }
  },
  modules: {}
})
