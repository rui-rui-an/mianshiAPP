import _fetch from './request'
function articlesTechnic (params) {
  return _fetch({
    url: '/articles/technic',
    params
  })
}
function chartDataHot () {
  return _fetch({
    url: '/chart-data/hot'
  })
}
function articlesShare (params) {
  return _fetch({
    url: '/articles/share',
    params
  })
}
function articlesShareTopSearch () {
  return _fetch({
    url: '/articles/shareTopSearch'
  })
}
function articlesShareId (id) {
  return _fetch({
    url: '/articles/share/' + id
  })
}
function articlesCommentsId (params, id) {
  return _fetch({
    url: '/articles/comments/' + id,
    params
  })
}
function articlesComments (data) {
  return _fetch({
    url: '/articles/comments',
    needToken: true,
    method: 'post',
    data
  })
}
export {
  articlesTechnic,
  chartDataHot,
  articlesShare,
  articlesShareTopSearch,
  articlesShareId,
  articlesCommentsId,
  articlesComments
}
