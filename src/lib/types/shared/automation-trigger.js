import { CortezaObject, ID, ISO8601, PropCast } from '../common'

export default class AutomationTrigger extends CortezaObject {
  constructor (m = {}) {
    super()
    this.merge(m)
  }

  merge (m) {
    this.scriptID = PropCast(ID, m.scriptID)
    this.resource = PropCast(String, m.resource)
    this.event = PropCast(String, m.event)
    this.condition = PropCast(String, m.condition)
    this.scriptID = PropCast(ID, m.scriptID)
    this.enabled = !!m.enabled
    this.weight = PropCast(Number, m.weight)

    this.createdBy = PropCast(ID, m.createdBy)
    this.updatedBy = PropCast(ID, m.updatedBy)
    this.deletedBy = PropCast(ID, m.deletedBy)

    this.createdAt = PropCast(ISO8601, m.createdAt)
    this.updatedAt = PropCast(ISO8601, m.updatedAt)
    this.deletedAt = PropCast(ISO8601, m.deletedAt)

    this.canRun = !!m.canRun
  }

  isValid () {
    return this.enabled && !this.deletedAt
  }
}
