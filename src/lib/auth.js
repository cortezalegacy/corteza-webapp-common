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
      return Promise.reject(new Error('invalid or empty JWT value'))
    }

    return systemAPI.setJWT(_jwt).authCheck().then(({ user, jwt = _jwt }) => {
      if (!user) {
        return Promise.reject(new Error('unexpected resposne'))
      }

      this.JWT = jwt
      this.user = user
      return Promise.resolve(user)
    })
  }

  is () {
    return !!this.JWT
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
