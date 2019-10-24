import { CortezaObject, ID, ISO8601, PropCast } from '../common'

export default class AutomationTrigger extends CortezaObject {
  constructor (m = {}) {
    super()
    this.merge(m)
  }

  merge (m) {
    this.scriptID = PropCast(ID, m.scriptID, this.scriptID)
    this.resource = PropCast(String, m.resource, this.resource)
    this.event = PropCast(String, m.event, this.event)
    this.condition = PropCast(String, m.condition, this.condition)
    this.scriptID = PropCast(ID, m.scriptID, this.scriptID)
    this.enabled = PropCast(Boolean, m.enabled, this.enabled)
    this.weight = PropCast(Number, m.weight, this.weight)

    this.createdBy = PropCast(ID, m.createdBy, this.createdBy)
    this.updatedBy = PropCast(ID, m.updatedBy, this.updatedBy)
    this.deletedBy = PropCast(ID, m.deletedBy, this.deletedBy)

    this.createdAt = PropCast(ISO8601, m.createdAt, this.createdAt)
    this.updatedAt = PropCast(ISO8601, m.updatedAt, this.updatedAt)
    this.deletedAt = PropCast(ISO8601, m.deletedAt, this.deletedAt)

    this.canRun = !!m.canRun
  }

  isValid () {
    return this.enabled && !this.deletedAt
  }

  isDeferred () {
    return this.event === 'interval' || this.event === 'deferred'
  }
}
