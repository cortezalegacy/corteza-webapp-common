import { SystemObject } from './common'
import { PropCast, ISO8601, ID } from '../common'

class User extends SystemObject {
  /** @type {string} fti Full Text Search index */
  get fts () {
    return (this.name + ' ' + this.username + ' ' + this.handle + ' ' + this.email + ' ' + this.userID).toLocaleLowerCase()
  }

  /**
   *
   * @param u
   */
  constructor (u = {}) {
    super()

    /** @type {string} userID */
    this.userID = PropCast(ID, u.userID)

    /** @type {string} handle */
    this.handle = PropCast(String, u.handle)

    /** @type {string} username */
    this.username = PropCast(String, u.username)

    /** @type {string} email */
    this.email = PropCast(String, u.email)

    /** @type {string} name */
    this.name = PropCast(String, u.name)

    /** @type {string} kind */
    this.kind = PropCast(String, u.kind)

    /** @type {string} createdAt */
    this.createdAt = PropCast(ISO8601, u.createdAt)

    /** @type {string} updatedAt */
    this.updatedAt = PropCast(ISO8601, u.updatedAt)

    /** @type {string} suspendedAt */
    this.suspendedAt = PropCast(ISO8601, u.suspendedAt)

    /** @type {string} deletedAt */
    this.deletedAt = PropCast(ISO8601, u.deletedAt)
  }
}

export default User
