import _fetch from './request'
function auCode (data) {
  return _fetch({
    method: 'post',
    url: '/au/code',
    data: data
  })
}
function auLogin (data) {
  return _fetch({
    method: 'post',
    url: '/au/login',
    data
  })
}
export { auCode, auLogin }
