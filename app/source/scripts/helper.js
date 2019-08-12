import * as Cookies from 'js-cookie'

const Cookie = {
  setCookie(name, value, expires, path) {
    Cookies.set(name, value, { expires: expires, path: path })
  },

  getCookie(name) {
    if (!name)
      return false

    Cookies.get(name)
  },

  deleteCookie(name) {
    Cookies.remove(name)
  }
}

export { Cookie }
