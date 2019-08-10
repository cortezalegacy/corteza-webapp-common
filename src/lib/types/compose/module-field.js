import { ID, PropCast } from '../common'

export default class ModuleField {
  constructor (m = {}) {
    this.fieldID = PropCast(ID, m.fieldID)
    this.name = PropCast(String, m.name)
    this.kind = PropCast(String, m.kind)
    this.isMulti = !!m.isMulti
  }
}
