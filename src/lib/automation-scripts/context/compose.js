import Record from '../../types/compose/record'
import Module from '../../types/compose/module'
import Namespace from '../../types/compose/namespace'
import AutomationScript from '../../types/shared/automation-script'
import { extractID, genericPermissionUpdater, isFresh } from './shared'
import AutomationTrigger from '../../types/shared/automation-trigger'

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
   * Creates new Page object
   *
   * <p>
   *   Created page is "in-memory" only. To store it, use savePage() method
   * </p>
   *
   * @example
   * // Simple page creation new page on current namespace
   * let myPage = await Compose.makePage({ title: 'My Amazing Page!' })
   *
   * @param {Object} values
   * @param {Namespace} ns - defaults to current $namespace
   * @return {Promise<Page>}
   */
  async makePage (values = {}, ns = this.$namespace) {
    return this.resolveNamespace(ns).then((ns) => {
      // @todo cast to Page
      return { ...values, namespaceID: ns.namespaceID }
      // return new Page({ ...values, namespaceID: ns.namespaceID })
    })
  }

  /**
   * Creates/updates Page
   *
   * @param {Promise<*>|Page} page
   * @returns {Promise<Page>}
   */
  async savePage (page) {
    return Promise.resolve(page).then(page => {
      // @todo cast to Page
      // if (!(page instanceof Page)) {
      //   throw Error('expecting Page type')
      // }
  
      if (isFresh(page.pageID)) {
        return this.ComposeAPI.pageCreate(page)
      } else {
        return this.ComposeAPI.pageUpdate(page)
      }
    })
  }

  /**
   * Deletes a page
   *
   * @example
   * Compose.deletePage(myPage)
   *
   * @param {Page} page
   * @returns {Promise<void>}
   */
  async deletePage (page) {
    return Promise.resolve(page).then(page => {
      // if (!(page instanceof Page)) {
      //   throw Error('expecting Page type')
      // }

      if (!isFresh(page.pageID)) {
        return this.ComposeAPI.pageDelete(page)
      }
    })
  }

  /**
   * Searches for pages
   *
   * @private
   * @param {string|Object} filter
   * @param {Promise<*>|string|Namespace|Object} ns
   * @returns {Promise<{filter: Object, set: Page[]}>}
   */
  async findPages (filter = null, ns = this.$namespace) {
    if (typeof filter === 'string') {
      filter = { query: filter }
    }
  
    return this.resolveNamespace(ns).then((ns) => {
      const namespaceID = extractID(ns, 'namespaceID')
      return this.ComposeAPI.pageList({ namespaceID, ...filter }).then(rval => {
        // @todo cast to Page
        // Casting all we got to to Page
        // rval.set = rval.set.map(m => new Page(m))
        return rval
      })
    })
  }

  /**
   * Finds page by ID
   *
   * @example
   * // Explicitly load page and do something with it
   * Compose.finePageByID('2039248239042').then(myPage => {
   *   // do something with myPage
   *   myPage.title = 'My More Amazing Page!'
   *   return myPage
   * }).then(Compose.savePage)
   *
   * @param {string|Page} page - accepts Page, pageID (when string string)
   * @param {string|Namespace|Object} ns - namespace, defaults to current $namespace
   * @returns {Promise<Page>}
   */
  async findPageByID (page, ns = this.$namespace) {
    return this.resolveNamespace(ns).then((ns) => {
      const pageID = extractID(page, 'pageID')
      const namespaceID = extractID(ns, 'namespaceID')
  
      return this.ComposeAPI.pageRead({ namespaceID, pageID })
        //@todo cast to Page
        .then(p => p)
    })
  }

  /**
   * Helper to construct record page titles
   *
   * @param {String} name
   * @returns {String}
   * @private
   */
  makeRecordPageTitle ({ name }) {
    return `Record page for module \"${name}\"`
  }

  /**
   * Helper to construct page blocks
   *
   * @returns {Object}
   * @private
   */
  makePageBlock ({
    module,
    index = 0,
    x = 0,
    y = 0,
    height = 13,
    width = 13,
    kind = 'Record',
    options = {},
    title = null,
    style = {},
    fields,
  }) {
    return {
      height,
      width,
      kind,
      title,
      x,
      y: y + height * index,
      style,
      options: {
        ...options,
        fields: fields || module.fields,
      },
    }
  }

  /**
   * Creates new AutomationScript object
   *
   * <p>
   *   Created script is "in-memory" only. To store it, use saveAutomationScript() method
   * </p>
   *
   * @example
   * // Simple script creation on current namespace
   * let myScript = await Compose.makeAutomationScript({ name: 'SuperScript' })
   *
   * @param {Object} script
   * @param {Namespace} ns - defaults to current $namespace
   * @return {Promise<AutomationScript>}
   */
  async makeAutomationScript (script = {}, ns = this.$namespace) {
    return this.resolveNamespace(ns).then((ns) => {
      // @todo
      // return new AutomationScript({ ...script, namespaceID: ns.namespaceID })
      return { ...script, namespaceID: ns.namespaceID }
    })
  }

  /**
   * Creates/updates AutomationScript
   *
   * @param {Promise<*>|AutomationScript} script
   * @returns {Promise<AutomationScript>}
   */
  async saveAutomationScript (script) {
    return Promise.resolve(script).then(script => {
      // @todo
      // if (!(script instanceof AutomationScript)) {
      //   throw Error('expecting Script type')
      // }

      if (isFresh(script.scriptID)) {
        return this.ComposeAPI.automationScriptCreate(script)
      } else {
        return this.ComposeAPI.automationScriptUpdate(script)
      }
    })
  }

  /**
   * Searches for automation scripts
   *
   * @private
   * @param {string|Object} filter
   * @param {Promise<*>|string|Namespace|Object} ns
   * @returns {Promise<{filter: Object, set: AutomationScript[]}>}
   */
  async findScripts (filter = null, ns = this.$namespace) {
    if (typeof filter === 'string') {
      filter = { query: filter }
    }

    return this.resolveNamespace(ns).then((ns) => {
      let params = {
        namespaceID: ns.namespaceID,
        ...(filter || {})
      }

      return this.ComposeAPI.automationScriptList(params).then(rval => {
        // Casting all we got to to AutomationScript
        // @todo
        // rval.set = rval.set.map(m => new AutomationScript(m))
        return rval
      })
    })
  }

  /**
   * Creates new AutomationTrigger object
   *
   * <p>
   *   Created trigger is "in-memory" only. To store it, use saveAutomationTrigger() method
   * </p>
   *
   * @example
   * // Simple trigger creation on current namespace
   * let myTrigger = await Compose.makeAutomationTrigger({ resource: 'module:record', condition: $record.recordID })
   *
   * @param {Object} trigger
   * @param {Namespace} ns - defaults to current $namespace
   * @return {Promise<AutomationTrigger>}
   */
  async makeAutomationTrigger (trigger = {}, ns = this.$namespace) {
    return this.resolveNamespace(ns).then((ns) => {
      // @todo
      // return new AutomationTrigger(trigger)
      return { ...trigger, namespaceID: ns.namespaceID }
    })
  }

  /**
   * Creates/updates AutomationTrigger
   *
   * @param {Promise<*>|AutomationTrigger} trigger
   * @returns {Promise<AutomationTrigger>}
   */
  async saveAutomationTrigger (trigger) {
    return Promise.resolve(trigger).then(trigger => {
      // @todo
      // if (!(trigger instanceof AutomationTrigger)) {
      //   throw Error('expecting AutomationTrigger type')
      // }

      if (isFresh(trigger.triggerID)) {
        return this.ComposeAPI.automationTriggerCreate(trigger)
      } else {
        return this.ComposeAPI.automationTriggerUpdate(trigger)
      }
    })
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

      if (isFresh(record.recordID)) {
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

      if (!isFresh(record.recordID)) {
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
   * @property {string} filter.filter - filtering conditions
   * @property {string} filter.sort - sorting rules
   * @property {number} filter.perPage - max returned records per page
   * @property {number} filter.page - page to return (1-based)
   * @param {Module} [module] - if not set, defaults to $module
   * @returns {Promise<{filter: Object, set: Record[]}>}
   */
  async findRecords (filter = '', module = this.$module) {
    return this.resolveModule(module).then((module) => {
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
  async findLastRecord (module = this.$module) {
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
  async findFirstRecord (module = this.$module) {
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
    // We're handling module default a bit differently here
    // because we want to allow users to use record's module
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
   * Finds a single attachment
   *
   * @param {string|Object|Attachment} attachment Attachment to find
   * @param {Namespace} ns
   */
  async findAttachmentByID (attachment, ns = this.$namespace) {
    return this.resolveNamespace(ns).then(namespace => {
      const { namespaceID } = namespace
      return this.ComposeAPI.attachmentRead({
        kind: 'original',
        attachmentID: extractID(attachment, 'attachmentID'),
        namespaceID,
      }).then(att => att)
    })
  }

  /**
   * Creates new Module object
   *
   * @param {Promise<*>|Module} module
   * @param {string|Object|Namespace} ns, defaults to current $namespace
   * @returns {Promise<Module>}
   */
  async makeModule (module = {}, ns = this.$namespace) {
    return this.resolveNamespace(ns).then((ns) => {
      return new Module({ ...module, namespaceID: ns.namespaceID })
    })
  }

  /**
   * Creates/updates Module
   *
   * @param {Promise<*>|Module} module
   * @returns {Promise<Module>}
   */
  async saveModule (module) {
    return Promise.resolve(module).then(module => {
      if (!(module instanceof Module)) {
        throw Error('expecting Module type')
      }

      if (isFresh(module.moduleID)) {
        return this.ComposeAPI.moduleCreate(module)
      } else {
        return this.ComposeAPI.moduleUpdate(module)
      }
    })
  }

  /**
   * Searches for modules
   *
   * @private
   * @param {string|Object} filter
   * @param {Promise<*>|string|Namespace|Object} ns
   * @returns {Promise<{filter: Object, set: Module[]}>}
   */
  async findModules (filter = '', ns = this.$namespace) {
    if (typeof filter === 'string') {
      filter = { query: filter }
    }

    return this.resolveNamespace(ns).then((ns) => {
      const namespaceID = extractID(ns, 'namespaceID')
      return this.ComposeAPI.moduleList({ namespaceID, ...filter }).then(rval => {
        // Casting all we got to to Module
        rval.set = rval.set.map(m => new Module(m))
        return rval
      })
    })
  }

  /**
   * Finds module by ID
   *
   * @example
   * // Explicitly load module and do something with it
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
   * @param {string|Namespace|Object} ns - namespace, defaults to current $namespace
   * @returns {Promise<Module>}
   */
  async findModuleByID (module, ns = this.$namespace) {
    return this.resolveNamespace(ns).then((ns) => {
      const moduleID = extractID(module, 'moduleID')
      const namespaceID = extractID(ns, 'namespaceID')

      return this.ComposeAPI.moduleRead({ namespaceID, moduleID }).then(m => new Module(m))
    })
  }

  /**
   * Finds module by name
   *
   * @example
   * // Explicitly load module and do something with it
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
   * @param {null|string|Namespace|Object} ns - defaults to current $namespace
   * @returns {Promise<Module>}
   */
  async findModuleByName (name, ns = this.$namespace) {
    return this.resolveNamespace(ns).then((ns) => {
      const namespaceID = extractID(ns, 'namespaceID')
      return this.ComposeAPI.moduleList({ namespaceID, name }).then(({ set, filter }) => {
        if (filter && filter.count === 0) {
          return null
        }

        return new Module(set[0])
      })
    })
  }

  /**
   * Creates new Namespace object
   *
   * @example
   * // Creates enabled (!) namespace with slug & name
   * Compose.saveNamespace(Compose.makeNamespace({
   *   slug: 'my-namespace',
   *   name: 'My Namespace',
   * }))
   *
   * @param {Promise<*>|Namespace} namespace
   * @param {string|Object|Namespace} namespace, defaults to current $namespace
   * @returns {Promise<Namespace>}
   */
  async makeNamespace (namespace = {}) {
    return new Namespace({
      name: namespace.name || namespace.slug,
      meta: {},
      enabled: true,
      ...namespace,
    })
  }

  /**
   * Creates/updates Namespace
   *
   * @example
   * Compose.saveNamespace(myNamespace)
   *
   * @param {Promise<*>|Namespace} namespace
   * @returns {Promise<Namespace>}
   */
  async saveNamespace (namespace) {
    return Promise.resolve(namespace).then(namespace => {
      if (!(namespace instanceof Namespace)) {
        throw Error('expecting Namespace type')
      }

      if (isFresh(namespace.namespaceID)) {
        return this.ComposeAPI.namespaceCreate(namespace)
      } else {
        return this.ComposeAPI.namespaceUpdate(namespace)
      }
    })
  }

  /**
   * Searches for namespaces
   *
   * @private
   * @param {string|Object} filter
   * @returns {Promise<{filter: Object, set: Namespace[]}>}
   */
  async findNamespaces (filter = '') {
    if (typeof filter === 'string') {
      filter = { query: filter }
    }

    return this.ComposeAPI.namespaceList({ ...filter }).then(rval => {
      // Casting all we got to to Namespace
      rval.set = rval.set.map(m => new Namespace(m))
      return rval
    })
  }

  /**
   * Finds namespace by ID
   *
   * @example
   * // Explicitly load namespace and do something with it
   * Compose.findNamespaceByID('2039248239042').then(myNamespace => {
   *   // do something with myNamespace
   *   return Compose.findModules(myNamespace)
   * }).then(modules => {})
   *
   * // even shorter
   * Compose.findModules('2039248239042').then(....)
   *
   * @param {string|Namespace|Record} ns - accepts Namespace, namespaceID (when string string) or Record
   * @returns {Promise<Namespace>}
   */
  async findNamespaceByID (ns = this.$namespace) {
    const namespaceID = extractID(ns, 'namespaceID')

    return this.ComposeAPI.namespaceRead({ namespaceID }).then(m => new Namespace(m))
  }

  /**
   * Finds namespace by name
   *
   * @example
   * // Explicitly load namespace and do something with it
   * Compose.findNamespaceBySlug('SomeNamespace').then(myNamespace => {
   *   // do something with myNamespace
   *   return Compose.findModules(myNamespace)
   * }).then(modules => {})
   *
   * // even shorter
   * Compose.findModules('SomeNamespace').then(....)
   *
   * @param {string} slug - name of the namespace
   * @returns {Promise<Namespace>}
   */
  async findNamespaceBySlug (slug) {
    return this.ComposeAPI.namespaceList({ slug }).then(({ set, filter }) => {
      if (filter.count === 0) {
        return Promise.reject(new Error('namespace not found'))
      }

      return new Namespace(set[0])
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
   * @property {string} body.html - HTML body to be sent
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
   * // Complex notification with custom subject, header and footer text and custom record
   * Compose.sendRecordToMail(
   *   'asignee@domain.tld',
   *   'New lead assigned to you',
   *   {
   *      header: '<h1>New lead was created and assigned to you</h1>',
   *      footer: 'Review and confirm',
   *      cc: [ 'sales@domain.tld' ],
   *      fields: ['name', 'country', 'amount'],
   *   },
   *   newLead
   * )
   *
   * @param {string|string[]} to - Recipient(s)
   * @param {string} subject - Mail subject
   * @param {Object} options - Various options for body & email
   * @property {string} options.header - Text (HTML) before the record table
   * @property {string} options.footer - Text (HTML) after the record table
   * @property {string} options.style - Custom CSS styles for the email
   * @param {string[]|null} options.fields - List of record fields we want to output
   * @param {object} options.header - Additional mail headers (cc)
   * @param {Promise|Record} record - record to be converted (or leave for the current $record)
   * @return {Promise<void>}
   */
  async sendRecordToMail (
    to,
    subject = '',
    { header = '', footer = '', style = emailStyle, fields = null, ...mailHeader } = {},
    record = this.$record
  ) {
    // Wait for the record if we got a promise

    record = await record

    let wb = `<div style="width: 800px; margin: 20px auto;">`
    let wa = `</div>`

    header = `${wb}${header}${wa}`
    footer = `${wb}${footer}${wa}`
    style = `<style type="text/css">${style}</style>`

    let html = style + header + this.recordToHTML(fields, record) + footer

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
   * Walks over white listed fields.
   *
   * @param {null|Array|Record} fwl - field white list; if not defined, all fields are used
   * @param {Record} record - record to be walked over
   * @param {Function} formatter
   * @returns {*}
   *
   * @private
   */
  walkFields (fwl, record, formatter) {
    if (!formatter) {
      throw new Error('formatter.undefined')
    }

    if (fwl instanceof Record) {
      record = fwl
      fwl = undefined
    }

    if (Array.isArray(fwl) && fwl.length === 0) {
      fwl = null
    }

    return record.module.fields
      .filter(f => !fwl || fwl.indexOf(f.name) > -1)
      .map(formatter)
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
    const rows = this.walkFields(fwl, record, f => {
      const v = record.values[f.name]
      return `<tr><td>${f.label || f.name}</td><td>${(Array.isArray(v) ? v : [v]).join(', ') || '&nbsp;'}</td></tr>`
    }).join('')

    return `<table width="800" cellspacing="0" cellpadding="0" border="0">${rows}</table>`
  }

  /**
   * Represents a given record as plain text
   *
   * @example
   * // generates report for current $record with all fields
   * let report = recordToPlainText()
   *
   * // generates report for current $record from a list of fields
   * let report = recordToPlainText(['fieldA', 'fieldB', 'fieldC'])
   *
   * @param {null|Array|Record} fwl - field white list (or leave empty/null/false for all fields)
   * @param {Record} record - record to be converted (or leave for the current $record)
   * @returns {string}
   */
  recordToPlainText (fwl = null, record = this.$record) {
    return this.walkFields(fwl, record, f => {
      const v = record.values[f.name]
      return `${f.label || f.name}:\n${(Array.isArray(v) ? v : [v]).join(', ') || '/'}\n\n`
    }).join('').trim('\n')
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
          return this.findModuleByID(module).catch((err = {}) => {
            if (err.message && err.message.indexOf('ModuleNotFound') >= 0) {
              // Not found, let's try if we can find it by slug
              return this.findModuleByName(module)
            }

            return Promise.reject(err)
          })
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

  /**
   * Scans all given arguments and returns first one that resembles something like a valid namespace, its slug or ID
   *
   * @private
   * @returns {Promise}
   */
  async resolveNamespace () {
    for (let ns of arguments) {
      if (!ns) {
        continue
      }

      if (typeof ns === 'string') {
        if (/^[0-9]+$/.test(ns)) {
          // Looks like an ID
          return this.findNamespaceByID(ns).catch((err = {}) => {
            if (err.message && err.message.indexOf('NamespaceNotFound') >= 0) {
              // Not found, let's try if we can find it by slug
              return this.findNamespaceBySlug(ns)
            }

            return Promise.reject(err)
          })
        }

        // Assume namespace slug
        return this.findNamespaceBySlug(ns)
      }

      if (typeof ns !== 'object') {
        continue
      }

      // resolve whatever object we have (maybe it's a promise?)
      // and wait for results
      ns = await ns

      if (ns instanceof Record) {
        return this.resolveNamespace(ns.namespaceID)
      }

      if (ns.set && ns.filter) {
        // We got a result set with modules
        ns = ns.set
      }

      if (Array.isArray(ns)) {
        // We got array of modules
        if (ns.length === 0) {
          // Empty array
          continue
        } else {
          // Use first module from the list
          ns = ns.shift()
        }
      }

      if (!(ns instanceof Namespace)) {
        // not Namespace? is it an object with namespaceID?
        if (ns.namespaceID === undefined) {
          break
        }

        return Promise.resolve(new Namespace(ns))
      }

      return Promise.resolve(ns)
    }

    return Promise.reject(Error(`unexpected input type for namespace resolver`))
  }

  /**
   * Sets permissions on messaging resources
   *
   * @example
   * Compose.setPermissions([
   *   // Allow someRole update to delete newModule
   *   new AllowAccess(someRole, newModule, 'delete'),
   *
   *   // Allow newRole to update any module
   *   new AllowAccess(newRole, new WildcardResource(new Module), 'update')
   * ])
   *
   * @param {PermissionRule[]} rules
   * @returns {Promise<void>}
   */
  async setPermissions (rules) {
    return genericPermissionUpdater(this.ComposeAPI, rules)
  }
}

export default ComposeHelper
