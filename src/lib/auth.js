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
  async check (systemAPI, jwt = this.JWT) {
    if (!jwt) {
      return Promise.reject(new Error('invalid or empty JWT value'))
    }

    return systemAPI.setJWT(jwt).authCheck().then(({ user }) => {
      console.log({ user })
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

  set JWT (jwt) {
    if (!jwt) {
      this[jwt] = null
      localStorage.removeItem(lsAuthJWTKey)
    } else if (this[jwt] !== jwt) {
      this[jwt] = jwt
      localStorage.setItem(lsAuthJWTKey, jwt)
    }
  }

  get user () {
    if (this[user] === null) {
      this[user] = JSON.parse(localStorage.getItem(lsAuthUserKey))
    }

    return this[user] || {}
  }

  set user (user) {
    if (!user) {
      this[user] = null
      localStorage.removeItem(lsAuthUserKey)
    } else if (this[user] !== user) {
      this[user] = user
      localStorage.setItem(lsAuthUserKey, JSON.stringify(user))
    }
  }
}
