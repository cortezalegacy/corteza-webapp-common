import ModuleField from './module-field'
import { ComposeObject } from './common'
import { ID, ArrayOf, ISO8601, PropCast } from '../common'

export default class Module extends ComposeObject {
  constructor (m = {}) {
    super()
    this.moduleID = PropCast(ID, m.moduleID)
    this.namespaceID = PropCast(ID, m.namespaceID)
    this.name = PropCast(String, m.name)

    this.fields = PropCast(ArrayOf(ModuleField), m.fields, [])

    this.createdAt = PropCast(ISO8601, m.createdAt)
    this.updatedAt = PropCast(ISO8601, m.updatedAt)
    this.deletedAt = PropCast(ISO8601, m.deletedAt)

    this.canUpdateModule = !!m.canUpdateModule
    this.canDeleteModule = !!m.canDeleteModule
    this.canCreateRecord = !!m.canCreateRecord
    this.canReadRecord = !!m.canReadRecord
    this.canUpdateRecord = !!m.canUpdateRecord
    this.canDeleteRecord = !!m.canDeleteRecord
    this.canManageAutomationTriggers = !!m.canManageAutomationTriggers
    this.canGrant = !!m.canGrant
  }

  // Returns array of fields from this module that are in requested list (array of field object or string).
  // Returned fields are orderd in the same way as requested
  filterFields (requested = []) {
    return requested
      .map(r =>
        this.fields.find(f => (r.name || r) === f.name))
      .filter(f => f)
  }

  fieldNames () {
    return this.fields.map(f => f.name)
  }
}
