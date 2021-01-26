import axios from 'axios'
import { Toast } from 'vant'
const _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 请求拦截器
_fetch.interceptors.request.use(
  function (config) {
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)
// 相应拦截器
_fetch.interceptors.response.use(
  function (res) {
    if (res.data.data.code === 200) {
      return res
    } else {
      Toast.fail(res.data.message)
      return Promise.reject(new Error(res.data.message))
    }
  },
  function (err) {
    return Promise.reject(err)
  }
)
export default _fetch
