/* eslint-disable accessor-pairs */
import { SystemObject } from './common'
import { ID, ISO8601, PropCast } from '../common'

class Role extends SystemObject {
  constructor (r = {}) {
    super()

    /** @type {string} roleID */
    this.roleID = PropCast(ID, r.roleID)

    /** @type {string} handle */
    this.handle = PropCast(String, r.handle)

    /** @type {string} name */
    this.name = PropCast(String, r.name)

    /** @type {string} createdAt */
    this.createdAt = PropCast(ISO8601, r.createdAt)

    /** @type {string} updatedAt */
    this.updatedAt = PropCast(ISO8601, r.updatedAt)

    /** @type {string} archivedAt */
    this.archivedAt = PropCast(ISO8601, r.archivedAt)

    /** @type {string} deletedAt */
    this.deletedAt = PropCast(ISO8601, r.deletedAt)
  }
}

export default Role
