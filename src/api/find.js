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
export { articlesTechnic, chartDataHot, articlesShare, articlesShareTopSearch }
