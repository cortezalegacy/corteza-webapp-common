import ModuleField from './module-field'
import { ComposeObject } from './common'
import { ID, ArrayOf, ISO8601, PropCast } from '../common'

const defMeta = () => Object.assign({}, {
  admin: {
    recordList: {
      columns: [],
    },
  },
})

const systemFields = [
  { name: 'ownedBy', label: `Owned by`, kind: 'User' },
  { name: 'createdBy', label: `Created by`, kind: 'User' },
  { name: 'createdAt', label: `Created at`, kind: 'DateTime' },
  { name: 'updatedBy', label: `Updated by`, kind: 'User' },
  { name: 'updatedAt', label: `Updated at`, kind: 'DateTime' },
  { name: 'deletedBy', label: `Deleted by`, kind: 'User' },
  { name: 'deletedAt', label: `Deleted at`, kind: 'DateTime' },
].map(f => new ModuleField({ ...f, isSystem: true }))

export default class Module extends ComposeObject {
  constructor (m = {}) {
    super()

    /**
     * @type {string}
     */
    this.moduleID = PropCast(ID, m.moduleID)

    /**
     * @type {string}
     */
    this.namespaceID = PropCast(ID, m.namespaceID)

    /**
     * @type {string}
     */
    this.name = PropCast(String, m.name)

    /**
     * @type {ModuleField[]}
     */
    this.fields = PropCast(ArrayOf(ModuleField), m.fields, [])

    /**
     * @type {Object}
     */
    this.meta = Object()

    // Properly convert old meta data that contained fields:
    if (Array.isArray(m.meta)) {
      m.meta = defMeta()
    }

    if (typeof m.meta === 'object') {
      this.meta = { ...m.meta }
    }

    if (this.meta.admin && this.meta.admin.recordList) {
      // @todo check if and where do we
      //       need this and remove if it is obsolete
      if ((this.meta.admin.recordList.columns || {}).length === 0) {
        // Copy fields into columns
        this.meta.admin.recordList.columns = this.fields.slice()
      }
    }

    /**
     * @type {string}
     */
    this.createdAt = PropCast(ISO8601, m.createdAt)

    /**
     * @type {string}
     */
    this.updatedAt = PropCast(ISO8601, m.updatedAt)

    /**
     * @type {string}
     */
    this.deletedAt = PropCast(ISO8601, m.deletedAt)

    /**
     * @type {boolean}
     */
    this.canUpdateModule = !!m.canUpdateModule

    /**
     * @type {boolean}
     */
    this.canDeleteModule = !!m.canDeleteModule

    /**
     * @type {boolean}
     */
    this.canCreateRecord = !!m.canCreateRecord

    /**
     * @type {boolean}
     */
    this.canReadRecord = !!m.canReadRecord

    /**
     * @type {boolean}
     */
    this.canUpdateRecord = !!m.canUpdateRecord

    /**
     * @type {boolean}
     */
    this.canDeleteRecord = !!m.canDeleteRecord

    /**
     * @type {boolean}
     */
    this.canManageAutomationTriggers = !!m.canManageAutomationTriggers

    /**
     * @type {boolean}
     */
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

  systemFields () {
    return systemFields
  }

  export () {
    return this
  }

  import () {
    return this
  }
}
