function setLocal (value, token = 'token') {
  window.localStorage.setItem(token, value)
}
function getLocal (token = 'token') {
  return window.localStorage.getItem(token)
}
function removeLocal (token = 'token') {
  window.localStorage.removeItem(token)
}

export { setLocal, getLocal, removeLocal }
