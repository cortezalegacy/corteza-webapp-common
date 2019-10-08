import { ID, PropCast } from '../common'

// @todo improve this when refactored to a single module field class
export function nameValid () {
  return !!(this.name && this.name.length > 1 && /^\w{1,}$/.test(this.name))
}

export function labelValid () {
  return !!(this.label && this.label.length > 0)
}

export function fieldValid () {
  return !!(this.nameValid() && this.labelValid())
}

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

  get nameValid () {
    return nameValid
  }

  get labelValid () {
    return labelValid
  }

  get fieldValid () {
    return fieldValid
  }
}
