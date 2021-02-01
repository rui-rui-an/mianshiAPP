import _fetch from './request'
// import { getLocal } from '@/utils/local'
function auInfo () {
  return _fetch({
    url: '/au/info',
    // headers: {
    //   authorization: `Bearer ${getLocal()}`
    // }
    // 在请求拦截器统一统一加
    needToken: true
  })
}
function auEdit (data) {
  return _fetch({
    url: '/au/edit',
    method: 'post',
    needToken: true,
    data: data
  })
}
function upload (data) {
  return _fetch({
    url: '/upload',
    method: 'post',
    needToken: true,
    data: data
  })
}
export { auInfo, auEdit, upload }
