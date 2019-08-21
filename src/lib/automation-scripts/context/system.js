import { extractID } from './shared'

/**
 * SystemHelper provides layer over System API and utilities that simplify automation script writing
 */
class SystemHelper {
  constructor (ctx = {}) {
    this.SystemAPI = ctx.SystemAPI
  }

  /**
   * Searches for users
   *
   * @param filter
   * @returns {Promise<{filter: Object, set: Object[]}>}
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
   * @param {string|Object} user
   * @return {Promise<Object>}
   */
  async findUserByID (user) {
    // @todo convert to User obj
    return this.SystemAPI.userRead({ ...extractID(user, 'userID') })
  }
}

export default SystemHelper
