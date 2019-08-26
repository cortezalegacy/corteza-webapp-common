import { ID, PropCast } from '../common'

export default class ModuleField {
  constructor (m = {}) {
    this.fieldID = PropCast(ID, m.fieldID)
    this.name = PropCast(String, m.name)
    this.kind = PropCast(String, m.kind)

    this.label = PropCast(String, m.label)
    this.helpText = PropCast(String, m.helpText)
    this.defaultValue = m.defaultValue
    this.maxLength = PropCast(Number, m.maxLength)

    this.isRequired = !!m.isRequired
    this.isPrivate = !!m.isPrivate
    this.isMulti = !!m.isMulti
    this.isSystem = !!m.isSystem

    if (this.isSystem) {
      this.canUpdateRecordValue = true
      this.canReadRecordValue = true
    } else {
      this.canUpdateRecordValue = !!m.canUpdateRecordValue
      this.canReadRecordValue = !!m.canReadRecordValue
    }

    this.kind = m.kind
    this.options = m.options
  }
}
