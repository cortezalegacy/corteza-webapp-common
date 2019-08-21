import Record from '../../types/compose/record'
import Module from '../../types/compose/module'
import { extractID } from './shared'

const emailStyle = `
body { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #3A393C; font-family: Verdana,Arial,sans-serif; font-size: 14px; height: 100%; margin: 0; padding: 0; width: 100% !important; }
table { margin: 20px auto; background: #ffffff; border-collapse: collapse; max-width: 100%; }
table tr { height: 40px; }
table td { padding-top: 10px; padding-left: 20px; width:100%; max-width:100%; min-width:100%; width:100%; vertical-align: top; }
table tbody { border-top: 3px solid #808080; }
tbody tr:nth-child(even) { background-color: #F3F3F4; }
tbody td:first-child { width: 30%; color: #808080; }
tbody td:nth-child(2) { width: 70%; }
h2, p { padding: 10px 20px; }
p { text-align: justify; line-height: 1.4;}
`

/**
 * ComposeHelper provides layer over Compose API and utilities that simplify automation script writing
 *
 * Initiated as Compose object and provides a few handy shortcuts and fallback that will enable you
 * to rapidly develop your automation scripts.
 */
class ComposeHelper {
  /**
   * @param {Namespace} ctx.$namespace - Current namespace
   * @param {Module} ctx.$module - Current module
   * @param {Record} ctx.$record - Current record
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
   * <p>
   *   Created record is "in-memory" only. To store it, use saveRecord() method
   * </p>
   *
   * @example
   * // Simple record creation (new record of current module - $module)
   * let myLead = await Compose.makeRecord()
   * myLead.values.Title = 'My Lead Title'
   *
   * // Create record of type Lead and copy values from another Record
   * // This will copy only values that have the same name in both modules
   * let myLead = await Compose.makeRecord(myContact, 'Lead')
   *
   * // Or use promises:
   * Compose.makeRecord(myContact, 'Lead').then(myLead => {
   *   myLead.values.Title = 'My Lead Title'
   *
   *   // ...
   *
   *   // return record when finished
   *   return myLead
   * }).catch(err => {
   *   // solve the problem
   *   console.error(err)
   * })
   *
   * @param {Object} values
   * @param {Module} module - defaults to current $module
   * @return {Promise<Record>}
   */
  async makeRecord (values = {}, module = null) {
    return this.resolveModule(module, this.$module).then(module => {
      let record = new Record(module)

      // Set record values
      record.setValues(values)

      return record
    })
  }

  /**
   * Saves a record
   *
   * Please note that there is no need to explicitly save (current record) on before/after events,
   * internal systems take care of that.
   *
   * @example
   * // Quick example how to make and save new Lead:
   * let mySavedLead = await Compose.saveRecord(Compose.makeRecord({Title: 'Lead title'}, 'Lead'))
   * if (mySavedLead) {
   *   console.log('Record saved, new ID', mySavedLead.recordID)
   * } else {
   *   // solve the problem
   *   console.error(err)
   * }
   *
   * // Or with promises:
   * Compose.makeRecord({Title: 'Lead title'}, 'Lead')).then(myLead => {
   *   return Compose.saveRecord(myLead)
   * }).then(mySavedLead => {
   *   console.log('Record saved, new ID', mySavedLead.recordID)
   * }).catch(err => {
   *   // solve the problem
   *   console.error(err)
   * })
   *
   * @param {Record|Promise<Record>} record
   * @return {Promise<Record>}
   */
  async saveRecord (record) {
    return Promise.resolve(record).then(record => {
      if (!(record instanceof Record)) {
        throw Error('expecting Record type')
      }

      if (!record.recordID) {
        return this.ComposeAPI.recordCreate(record).then(r => new Record(record.module, r))
      } else {
        return this.ComposeAPI.recordUpdate(record).then(r => new Record(record.module, r))
      }
    })
  }

  /**
   * Deletes a record
   *
   * Please note that there is no need to explicitly delete (current record) on before/after events.
   *
   * @example
   * Compose.deleteRecord(myLead)
   *
   * @param {Record} record
   * @returns {Promise<void>}
   */
  async deleteRecord (record) {
    return Promise.resolve(record).then(record => {
      if (!(record instanceof Record)) {
        throw Error('expecting Record type')
      }

      if (record.recordID !== '') {
        return this.ComposeAPI.recordDelete(record)
      }
    })
  }

  /**
   * Searches for records of a specific record
   *
   * @example
   * // Find all records (of the current module)
   * Compose.findRecords()
   *
   * // Find Projects where ROI is more than 15%
   * // (assuming we have Project module with netProfit and totalInvestment numeric fields)
   * Compose.findRecords('netProfit / totalInvestment > 0.15', 'Project')
   *
   * // Find Projects where ROI is more than 15%
   * // (assuming we have Project module with netProfit and totalInvestment numeric fields)
   * Compose.findRecords('netProfit / totalInvestment > 0.15', 'Project')
   *
   * // More complex query with sorting:
   * // Returns top 5 Projects with more than 15% ROI in the last year
   * Compose.findRecords({
   *   filter: '(netProfit / totalInvestment > 0.15) AND (YEAR(createdAt) = YEAR(NOW()) - 1)'
   *   sort: 'netProfit / totalInvestment DESC',
   *   perPage: 5,
   * }, 'Project')
   *
   * // Accessing returned records
   * Compose.findRecords().then(({ set, filter }) => {
   *    // set: array of records
   *    // filter: object with filter specs, aso returns `count` with total number of all records that accross all pages
   *
   *    Use internal Array functions
   *    set.forEach(r => {
   *      // r, one of the records each iteration
   *    })
   *
   *    // Or standard for-loop
   *    for (let r of set) {
   *       // r...
   *    }
   * })
   *
   * @param {string|Object} filter - filter object (or filtering conditions when string)
   * @param {string} filter.filter - filtering conditions
   * @param {string} filter.sort - sorting rules
   * @param {number} filter.perPage - max returned records per page
   * @param {number} filter.page - page to return (1-based)
   * @param {Module} [module] - if not set, defaults to filter.module and this.$module
   * @returns {Promise<{filter: Object, set: Record[]}>}
   */
  async findRecords (filter = '', module = null) {
    return this.resolveModule(module, (filter || {}).module, this.$module).then((module) => {
      let { moduleID, namespaceID } = module

      let params = {
        moduleID,
        namespaceID,
      }

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
    })
  }

  /**
   * Finds last (created) record in the module
   *
   * @example
   * Compose.findLastRecord('Settings').then(lastSettingRecord => {
   *   // handle lastSettingRecord
   * })
   *
   * @param {Module} module
   * @returns {Promise<Record>}
   */
  async findLastRecord (module = null) {
    return this.findRecords({ sort: 'recordID DESC', page: 1, perPage: 1 }, module).then(({ set, filter }) => {
      if (filter.count > 0) {
        return set[0]
      }

      return null
    })
  }

  /**
   * Finds first (created) record in the module
   *
   * @example
   * Compose.findFirstRecord('Settings').then(firstSettingRecord => {
   *   // handle this firstSettingRecord
   * })
   *
   * @param {Module} module
   * @returns {Promise<Record>}
   */
  async findFirstRecord (module = null) {
    return this.findRecords({ sort: 'recordID ASC', page: 1, perPage: 1 }, module).then(({ set, filter }) => {
      if (filter.count > 0) {
        return set[0]
      }

      return null
    })
  }

  /**
   * Finds one record by ID
   *
   * @example
   * Compose.findRecordByID("23957823957").then(specificRecord => {
   *   // handle this specificRecord
   * })
   *
   * @param {string|Object|Record} record
   * @param {Module} module
   * @returns {Promise<Record>}
   */
  async findRecordByID (record, module = null) {
    return this.resolveModule(module, (record || {}).module, this.$module).then((module) => {
      const { moduleID, namespaceID } = module
      return this.ComposeAPI.recordRead({
        moduleID,
        namespaceID,

        recordID: extractID(record, 'recordID'),
      }).then(r => new Record(module, r))
    })
  }

  /**
   * Searches for modules
   *
   * @private
   * @param {string|Object} filter
   * @param {string|Namespace|Object} [namespace]
   * @returns {Promise<{filter: Object, set: Module[]}>}
   */
  async findModules (filter = '', namespace = null) {
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
   * @example
   * // Explicitly load module and so something with it
   * Compose.findModuleByID('2039248239042').then(myModule => {
   *   // do something with myModule
   *   return Compose.findLastRecord(myModule)
   * }).then((lastRecord) => {})
   *
   * // or
   * Compose.findLastRecord(Compose.findModuleByID('2039248239042')).then(....)
   *
   * // even shorter
   * Compose.findLastRecord('2039248239042').then(....)
   *
   * @param {string|Module|Record} module - accepts Module, moduleID (when string string) or Record
   * @param {string|Namespace|Object} [namespace]
   * @returns {Promise<Module>}
   */
  async findModuleByID (module, namespace = null) {
    const moduleID = extractID(module, 'moduleID')
    const namespaceID = extractID(namespace || this.$namespace || module, 'namespaceID')

    return this.ComposeAPI.moduleRead({ namespaceID, moduleID }).then(m => new Module(m))
  }

  /**
   * Finds module by name
   *
   * @example
   * // Explicitly load module and so something with it
   * Compose.findModuleByName('SomeModule').then(myModule => {
   *   // do something with myModule
   *   return Compose.findLastRecord(myModule)
   * }).then((lastRecord) => {})
   *
   * // or
   * Compose.findLastRecord(Compose.findModuleByName('SomeModule')).then(....)
   *
   * // even shorter
   * Compose.findLastRecord('SomeModule').then(....)
   *
   * @param {string} name - name of the module
   * @param {null|string|Namespace|Object} namespace - defaults to current $namespace
   * @returns {Promise<Module>}
   */
  async findModuleByName (name, namespace = null) {
    const namespaceID = extractID(namespace || this.$namespace, 'namespaceID')
    return this.ComposeAPI.moduleList({ namespaceID, name }).then(({ set, filter }) => {
      if (filter.count === 0) {
        return null
      }

      return new Module(set[0])
    })
  }

  /**
   * Sends a simple email message
   *
   * @example
   * Compose.sendMail('some-address@domain.tld', 'subject...', { html: 'Hello!' })
   *
   * @param {string|string[]} to - Recipient(s)
   * @param {string} subject - Mail subject
   * @param {Object} body
   * @param {string} body.html - HTML body to be sent
   * @param {string|string[]} Any additional addresses we want this to be sent to (carbon-copy)
   * @returns {Promise<void>}
   */
  async sendMail (to, subject, { html } = {}, { cc = [] } = {}) {
    if (!to) {
      throw Error('expecting to email address')
    }

    if (!subject) {
      throw Error('expecting subject')
    }

    if (!html) {
      throw Error('expecting HTML body')
    }

    return this.ComposeAPI.notificationEmailSend({
      to: Array.isArray(to) ? to : [to],
      cc: Array.isArray(cc) ? cc : [cc],
      subject,
      content: { html },
    })
  }

  /**
   * Generates HTML with all records fields and sends it to
   *
   * @example
   * // Simplified version, sends current email with generated
   * // subject (<module name> + 'record' +  'update'/'created')
   * Compose.sendRecordToMail('example@domain.tld')
   *
   * // Complex notification with custom subject, intro and outro text and custom record
   * Compose.sendRecordToMail(
   *   'asignee@domain.tld',
   *   'New lead assigned to you',
   *   {
   *      intro: '<h1>New lead was created and assigned to you</h1>',
   *      outro: 'Review and confirm',
   *      cc: [ 'sales@domain.tld' ],
   *      fields: ['name', 'country', 'amount'],
   *   },
   *   newLead
   * )
   *
   * @param {string|string[]} to - Recipient(s)
   * @param {string} subject - Mail subject
   * @param {Object} options - Various options for body & email
   * @param {string} options.intro - Text (HTML) before the record table
   * @param {string} options.outro - Text (HTML) after the record table
   * @param {string} options.style - Custom CSS styles for the email
   * @param {string[]|null} options.fields - List of record fields we want to output
   * @param {object} options.header - Additional mail headers (cc)
   * @param {Promise|Record} record - record to be converted (or leave for the current $record)
   * @return {Promise<void>}
   */
  async sendRecordToMail (
    to,
    subject = '',
    { intro = '', outro = '', style = emailStyle, fields = null, ...mailHeader } = {},
    record = this.$record
  ) {
    // Wait for the record if we got a promise

    record = await record

    let wb = `<div style="width: 800px; margin: 20px auto;">`
    let wa = `</div>`

    intro = `${wb}${intro}${wa}`
    outro = `${wb}${outro}${wa}`
    style = `<style type="text/css">${style}</style>`

    let html = style + intro + this.recordToHTML(fields, record) + outro

    if (!subject) {
      subject = record.module.name + ' '
      subject += record.updatedAt ? 'record updated' : 'record created'
    }

    return this.sendMail(
      to,
      subject,
      { html },
      { ...mailHeader },
    )
  }

  /**
   * Sends a simple record report as HTML
   *
   * @example
   * // generates report for current $record with all fields
   * let report = recordToHTML()
   *
   * // generates report for current $record from a list of fields
   * let report = recordToHTML(['fieldA', 'fieldB', 'fieldC'])
   *
   * // generates report for current  from a list of fields
   * let report = recordToHTML(['fieldA', 'fieldB', 'fieldC'])
   *
   * @param {null|Array|Record} fwl - field white list (or leave empty/null/false for all fields)
   * @param {Record} record - record to be converted (or leave for the current $record)
   * @returns {string}
   */
  recordToHTML (fwl = null, record = this.$record) {
    if (fwl instanceof Record) {
      record = fwl
      fwl = undefined
    }

    if (Array.isArray(fwl) && fwl.length === 0) {
      fwl = null
    }

    let rows = record.module.fields
      .filter(f => !fwl || fwl.indexOf(f.name) > -1)
      .map(f => {
        const v = record.values[f.name]
        return `<tr><td>${f.label || f.name}</td><td>${(Array.isArray(v) ? v : [v]).join(', ') || '&nbsp;'}</td></tr>`
      })
      .join('')

    return `<table width="800" cellspacing="0" cellpadding="0" border="0">${rows}</table>`
  }

  /**
   * Scans all given arguments and returns first one that resembles something like a valid module, its name or ID
   *
   * @private
   * @returns {Promise}
   */
  async resolveModule () {
    for (let module of arguments) {
      if (!module) {
        continue
      }

      if (typeof module === 'string') {
        if (/^[0-9]+$/.test(module)) {
          // Looks like an ID
          return this.findModuleByID(module)
        }

        // Assume name
        return this.findModuleByName(module)
      }

      if (typeof module !== 'object') {
        continue
      }

      // resolve whatever object we have (maybe it's a promise?)
      // and wait for results
      module = await module

      if (module instanceof Record) {
        return this.resolveModule(module.module, module.moduleID)
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

        return Promise.resolve(new Module(module))
      }

      return Promise.resolve(module)
    }

    return Promise.reject(Error(`unexpected input type for module resolver`))
  }
}

export default ComposeHelper
