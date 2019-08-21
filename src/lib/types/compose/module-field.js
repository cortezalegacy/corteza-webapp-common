import { ID, PropCast } from '../common'

export default class ModuleField {
  constructor (m = {}) {
    this.fieldID = PropCast(ID, m.fieldID)
    this.name = PropCast(String, m.name)
    this.kind = PropCast(String, m.kind)
    this.isMulti = !!m.isMulti

    // this.label = PropCast(String, m.label)
    // this.helpText = PropCast(String, m.helpText)
    // this.defaultValue = m.defaultValue
    // this.maxLength = PropCast(Number, m.maxLength)
    // this.isRequired = PropCast(Boolean, m.isRequired)
    // this.isPrivate = PropCast(Boolean, m.isPrivate)
    // this.isMulti = PropCast(Boolean, m.isMulti)
    // this.isSystem = PropCast(Boolean, m.isSystem)
    //
    // if (this.isSystem) {
    //   this.canUpdateRecordValue = true
    //   this.canReadRecordValue = true
    // } else {
    //   this.canUpdateRecordValue = PropCast(Boolean, m.canUpdateRecordValue)
    //   this.canReadRecordValue = PropCast(Boolean, m.canReadRecordValue)
    // }
    //
    // this.kind = m.kind
    // this.options = m.options
  }
}
