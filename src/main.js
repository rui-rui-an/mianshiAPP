import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'normalize.css'
import 'amfe-flexible'
import '@/style/iconfont/iconfont.css'
import '@/style/comm.css'
// import hmNavBar from '@/components/hmNavBar'
// Vue.component('hmNavBar', hmNavBar)

// 用高级一点的js来注册全局组件
import comm from '@/utils/comm.js'
Vue.use(comm)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
