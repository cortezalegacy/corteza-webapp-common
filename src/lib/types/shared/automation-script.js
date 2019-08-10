import { CortezaObject, ID, ISO8601, PropCast } from '../common'

export default class AutomationScript extends CortezaObject {
  constructor (m = {}) {
    super()
    this.scriptID = PropCast(ID, m.scriptID)
    // this.namespaceID = PropCast(String, m.namespaceID) // @todo
    this.name = PropCast(String, m.name)
    this.sourceRef = PropCast(String, m.sourceRef)
    this.source = PropCast(String, m.source)
    this.runAs = PropCast(ID, m.runAs)

    this.runInUA = !!m.runInUA
    this.async = !!m.async
    this.critical = !!m.critical
    this.enabled = !!m.enabled

    this.timeout = PropCast(Number, m.timeout)

    this.createdBy = PropCast(ID, m.createdBy)
    this.updatedBy = PropCast(ID, m.updatedBy)
    this.deletedBy = PropCast(ID, m.deletedBy)

    this.createdAt = PropCast(ISO8601, m.createdAt)
    this.updatedAt = PropCast(ISO8601, m.updatedAt)
    this.deletedAt = PropCast(ISO8601, m.deletedAt)

    this.canGrant = !!m.canGrant
    this.canUpdate = !!m.canUpdate
    this.canDelete = !!m.canDelete
  }
}
