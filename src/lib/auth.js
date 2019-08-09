const lsAuthJWTKey = 'auth.jwt'
const lsAuthUserKey = 'auth.user'

const jwt = Symbol('jwt')
const user = Symbol('user')

export default class Auth {
  constructor () {
    this[jwt] = null
    this[user] = null
  }

  // check uses system API client verify given/current JWT
  //
  // If JWT is valid, it is stored into local storage alongside
  // loaded user.
  //
  // We're explicitly passing systemAPI to minimize plugin initialization complexity
  async check (systemAPI, _jwt = this.JWT) {
    if (!_jwt) {
      // purge stored jwt and user if any
      this.user = undefined
      this.jwt = undefined
      throw new Error('jwt undefined')
    }

    return systemAPI.setJWT(_jwt).authCheck().then(({ user, jwt = _jwt }) => {
      if (!user) {
        throw new Error('unexpected response')
      }

      this.JWT = jwt

      // @todo cast to User class
      this.user = user
      return user
    })
  }

  async logout (systemAPI) {
    return systemAPI.setJWT(this.JWT).authLogout().finally(() => {
      this.JWT = undefined
      this.user = undefined
    })
  }

  is () {
    return !!this.JWT
  }

  // A friendly little wrapper that helps us navigate
  //
  // This should be used in all cases where we want to do a (relative)
  // redirection.
  //
  // Browsers do not want to play this properly and loose the port if
  // we do a window.location = '/foo'
  goto (url = '/auth', ref = undefined) {
    let u

    if (/^http(s)?:\/\//.test(url)) {
      u = new URL(url)
    } else {
      u = new URL(ref || window.location)
      u.pathname = url
    }

    window.location = u.toString()
  }

  open () {
    this.goto('/auth')
  }

  get JWT () {
    if (!this[jwt]) {
      this[jwt] = localStorage.getItem(lsAuthJWTKey)
    }

    return this[jwt]
  }

  set JWT (JWT) {
    if (!JWT) {
      this[jwt] = null
      localStorage.removeItem(lsAuthJWTKey)
    } else if (this[jwt] !== JWT) {
      this[jwt] = JWT
      localStorage.setItem(lsAuthJWTKey, JWT)
    }
  }

  get user () {
    if (this[user] === null) {
      this[user] = JSON.parse(localStorage.getItem(lsAuthUserKey))
    }

    return this[user] || {}
  }

  set user (u) {
    if (!u) {
      this[user] = null
      localStorage.removeItem(lsAuthUserKey)
    } else if (this[user] !== u) {
      this[user] = u
      localStorage.setItem(lsAuthUserKey, JSON.stringify(u))
    }
  }
}
