import { extractID } from './shared'

export default class SystemHelper {
  constructor (ctx = {}) {
    this.SystemAPI = ctx.SystemAPI
  }

  /**
   * Searches for users
   *
   * @param filter
   * @returns {Promise<*>}
   */
  findUsers (filter) {
    if (typeof filter === 'string') {
      filter = { query: filter }
    }

    return this.SystemAPI.userList(filter).then(rval => {
      // @todo convert set array to []User
      return rval
    })
  }

  /**
   * Finds user by ID
   *
   * @param {userID|Object|User}
   * @returns {Promise<*>}
   */
  async findRecordByID (user) {
    // @todo convert to User obj
    return this.SystemAPI.userRead({ ...extractID(user, 'userID') })
  }
}
