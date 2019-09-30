import { ID, ISO8601, PropCast } from '../common'
import moment from 'moment'

export default class Reminder {
  constructor (r = {}) {
    /**
     * @type {string}
     */
    this.reminderID = PropCast(ID, r.reminderID)

    /**
     * @type {string}
     */
    this.resource = PropCast(ID, r.resource)

    /**
     * Generic object; what it is is up to the receiver to decide
     * @type {Object}
     */
    this.payload = PropCast(Object, r.payload)

    /**
     * @type {string}
     */
    this.snoozeCount = PropCast(Number, r.snoozeCount)

    /**
     * @type {string}
     */
    this.assignedTo = PropCast(ID, r.assignedTo)

    /**
     * @type {string}
     */
    this.assignedBy = PropCast(ID, r.assignedBy)

    /**
     * @type {string}
     */
    this.assignedAt = PropCast(ISO8601, r.assignedAt)

    /**
     * @type {string}
     */
    this.dismissedBy = PropCast(ID, r.dismissedBy)

    /**
     * @type {string}
     */
    this.dismissedAt = PropCast(ISO8601, r.dismissedAt)

    /**
     * @type {string}
     */
    this.remindAt = PropCast(ISO8601, r.remindAt)

    /**
     * @type {Moment}
     */
    this.remindAtTime = this.remindAt ? moment(this.remindAt) : undefined

    /**
     * @type {string}
     */
    this.createdAt = PropCast(ISO8601, r.createdAt)

    /**
    * @type {Boolean}
    * @private
    */
    this.processed = false

    /**
    * @type {Object}
    * @private
    */
    this.actions = PropCast(Object, r.actions, {})

    /**
    * @type {Object}
    * @private
    */
    this.options = PropCast(Object, r.options, {})
  }

  // Used by our Toaster component
  get id () {
    return this.reminderID
  }

  addAction (k, v) {
    this.actions[k] = v
  }

  removeAction (k) {
    delete this.actions[k]
  }

  toJSON () {
    return this
  }
}
