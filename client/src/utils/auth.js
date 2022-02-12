const TOKEN_KEY = 'Yujie-Token'

export function getToken () {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken (token) {
  return localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken () {
  return localStorage.removeItem(TOKEN_KEY)
}
