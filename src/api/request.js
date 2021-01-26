import axios from 'axios'
import { Toast } from 'vant'
import { removeLocal } from '@/utils/local.js'
import router from '@/router'
import Store from '@/store'
const _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 请求拦截器
_fetch.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
_fetch.interceptors.response.use(
  function (res) {
    // console.log(res)
    if (res.data.code === 200) {
      return res
    } else {
      // 针对token过期的处理
      if (res.data.code === 401 || res.data.code === 403) {
        // 登录过期时
        // 1.提示用户
        Toast.fail('登录过期，请重新登录')
        // 2.删除token
        removeLocal()
        // 3.设置登录状态
        Store.commit('setIsLogin', false)
        // 4.跳转到登录页面
        router.push('/login')
        // 5.这里也要阻止.then的执行。因为这里也是请求错误的情况
        return Promise.reject(new Error(res.data.message))
      } else {
        // 登录没过期时
        Toast.fail(res.data.message)
        return Promise.reject(new Error(res.data.message))
      }
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default _fetch
