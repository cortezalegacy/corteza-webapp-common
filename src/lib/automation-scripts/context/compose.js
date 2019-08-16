import Record from '../../types/compose/record'
import Module from '../../types/compose/module'
import { extractID } from './shared'

/**
 * ComposeHelper provides layer over Compose API and utilities that simplify automation script writing
 */
export default class ComposeHelper {
  /**
   * @hideconstructor
   */
  constructor (ctx = {}) {
    this.ComposeAPI = ctx.ComposeAPI
    this.$namespace = ctx.$namespace
    this.$module = ctx.$module
    this.$record = ctx.$record
  }

  /**
   * Creates new Record object
   *
   * This record is "in-memory" only.
   * To store it, use saveRecord
   *
   * @see  {@link saveRecord}
   * @param {Object} values
   * @param {Module} module, defaults to current module
   * @returns {Record}
   */
  makeRecord (values = {}, module) {
    module = this.extractModule(module, this.$module)

    let record = new Record(module)

    // Set record values
    record.setValues(values)

    return record
  }

  /**
   * Saves a record
   *
   * @param {Record} record
   * @returns {Promise<Record | *>}
   */
  async saveRecord (record) {
    if (!(record instanceof Record)) {
      throw Error('expecting Record type')
    }

    if (!record.recordID) {
      return this.ComposeAPI.recordCreate(record).then(r => new Record(record.module, r))
    } else {
      return this.ComposeAPI.recordUpdate(record).then(r => new Record(record.module, r))
    }
  }

  /**
   * Deletes a record
   *
   * @param record
   * @param force
   * @returns {Promise<*>}
   */
  async deleteRecord (record) {
    if (!(record instanceof Record)) {
      throw Error('expecting Record type')
    }

    if (record.recordID !== '') {
      return this.ComposeAPI.recordDelete(record)
    }
  }

  /**
   * Searches for records
   *
   * @param {string|Object} filter - filter query (when string) or filter object
   * @param {Module} [module] - if not set, defaults to filter.module and this.$module
   * @returns {Promise<{filter: *, records: Record[]}>|Promise<*>}
   */
  async findRecords (filter, module = null) {
    module = this.extractModule(module, (filter || {}).module, this.$module)

    let params = this.extractIDsFromModule(module)

    if (typeof filter === 'string') {
      params.filter = filter
    } else if (typeof filter === 'object') {
      params = { ...params, ...filter }
    }

    return this.ComposeAPI.recordList(params).then((rval) => {
      // Casting all we got to to Record
      rval.set = rval.set.map(m => new Record(module, m))
      return rval
    })
  }

  /**
   * Finds last (created) record in the module
   * @param {Module} module
   * @returns {Promise<*>}
   * @constructor
   */
  async findLastRecord (module = null) {
    return this.findRecords({ sort: 'recordID DESC', page: 1, perPage: 1 }, module).then(({ set, filter }) => {
      console.log({ set, filter })
      if (filter.count > 0) {
        return set[0]
      }
    })
  }

  /**
   * Finds first (created) record in the module
   *
   * @param {Module} module
   * @returns {Promise<T>}
   */
  async findFirstRecord (module = null) {
    return this.findRecords({ sort: 'recordID ASC', page: 1, perPage: 1 }, module).then(({ set, filter }) => {
      console.log({ set, filter })
      if (filter.count > 0) {
        return set[0]
      }
    })
  }

  /**
   * Finds one record by ID
   *
   * @param {string|Object|Record} record
   * @param {Module} module
   * @returns {Promise<*>}
   */
  async findRecordByID (record, module = null) {
    module = this.extractModule(module, (record || {}).module, this.$module)

    return this.ComposeAPI.recordRead({
      // extracts namespaceID, moduleID
      ...this.extractIDsFromModule(module),

      recordID: extractID(record, 'recordID'),
    }).then(r => new Record(module, r))
  }

  /**
   * Searches for modules
   * @param {string|Object} filter
   * @param {string|Namespace|Object} [namespace]
   * @returns {Promise<Promise<*>|Promise<Module | *>>}
   */
  async findModules (filter, namespace = null) {
    if (typeof filter === 'string') {
      filter = { query: filter }
    }

    const namespaceID = extractID(namespace || this.$namespace, 'namespaceID')
    return this.ComposeAPI.moduleList({ namespaceID, ...filter }).then(rval => {
      // Casting all we got to to Module
      rval.set = rval.set.map(m => new Module(m))
      return rval
    })
  }

  /**
   * Finds module by ID
   *
   * @param {string|Module|Object} module
   * @param {string|Namespace|Object} [namespace]
   * @returns {Promise<Module | *>}
   * @constructor
   */
  async findModuleByID (module, namespace = null) {
    const moduleID = extractID(module, 'moduleID')
    const namespaceID = extractID(namespace || this.$namespace || module, 'namespaceID')

    return this.ComposeAPI.moduleRead({ namespaceID, moduleID }).then(m => new Module(m))
  }

  /**
   * Sends email message
   *
   * @param to
   * @param subject
   * @param html
   * @param cc
   * @returns {Promise<void>}
   */
  async sendEmail (to, subject, { html }, { cc = [] } = {}) {
    return this.ComposeAPI.notificationEmailSend({
      to: Array.isArray(to) ? to : [to],
      cc: Array.isArray(cc) ? cc : [cc],
      subject,
      content: { html },
    })
  }

  /**
   * Creates a simple HTML table from the record values
   *
   * @param {Record} record
   * @returns {string}
   */
  recordToHTML (record = this.$record) {
    let rows = record.module.fields.map(f => {
      const v = record.values[f.name]
      return `<tr><td>${f.label || f.name}</td><td>${v || ''}</td></tr>`
    })

    return `<table>${rows.join('')}</table>`
  }

  /**
   * Scans all given arguments and returns first one that resembles a module
   *
   * @private
   * @returns {Module}
   */
  extractModule () {
    for (let module of arguments) {
      if (!module || typeof module !== 'object') {
        continue
      }

      if (module.set && module.filter) {
        // We got a result set with modules
        module = module.set
      }

      if (Array.isArray(module)) {
        // We got array of modules
        if (module.length === 0) {
          // Empty array
          continue
        } else {
          // Use first module from the list
          module = module.shift()
        }
      }

      if (!(module instanceof Module)) {
        // not module? is it an object with moduleID & namespaceID?
        if (module.moduleID === undefined || module.namespaceID === undefined) {
          break
        }

        return new Module(module)
      }

      return module
    }

    throw Error(`unexpected value type for module type (expecting Module class or object with moduleID and namespaceID properties)`)
  }

  /**
   * Expecting at least one of the arguments to represent valid module struct
   *
   * @private
   * @returns {{namespaceID: *, moduleID: *}}
   */
  extractIDsFromModule () {
    const module = this.extractModule.apply(this, arguments)

    return {
      moduleID: extractID(module, 'moduleID'),
      namespaceID: extractID(module, 'namespaceID'),
    }
  }
}
