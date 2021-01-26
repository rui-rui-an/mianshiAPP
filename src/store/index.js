import Vue from 'vue'
import Vuex from 'vuex'

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
  actions: {},
  modules: {}
})
