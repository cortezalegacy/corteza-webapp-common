import { extractID } from './shared'

const success = { variant: 'success', countdown: 5 }
const warning = { variant: 'warning', countdown: 120 }

/**
 * ComposeUIHelper provides helpers for accessing Compose's UI
 *
 */
class ComposeUIHelper {
  /**
   *
   * @param {Namespace} ctx.$namespace - Current namespace
   * @param {Module} ctx.$module - Current module
   * @param {Record} ctx.$record - Current record
   * @param {Page[]} ctx.pages - Array of Page objects
   * @param {function} ctx.emitter - Event emitter (vm.$emit)
   * @param {function} ctx.routePusher - Route pusher (vm.$route.push)
   */
  constructor (ctx = {}) {
    this.$record = ctx.$record
    this.$module = ctx.$module
    this.pages = ctx.pages
    this.emitter = ctx.emitter
    this.routePusher = ctx.routePusher
  }

  /**
   * Reload current page
   *
   * @example
   * ComposeUI.reload()
   */
  reloadPage () {
    this.emitter('reload')
  }

  /**
   * Open record viewer page
   *
   * It searches for page that matches record's module and redirects
   * user to the view mode on that page
   *
   * @example
   * // Edit current record
   * ComposeUI.gotoRecordViewer($record)
   *
   * // Edit current record ($record can be omitted)
   * ComposeUI.gotoRecordViewer()
   *
   * @param {Record} record
   */
  gotoRecordViewer (record = this.$record) {
    this.gotoRecordPage('page.record', record)
  }

  /**
   * Open record editor page
   *
   * It searches for page that matches record's module and redirects
   * user to the edit mode on that page.
   *
   * @example
   * // Edit current record
   * ComposeUI.gotoRecordEditor($record)
   *
   * // Edit current record ($record can be omitted)
   * ComposeUI.gotoRecordEditor()
   *
   * @param {Record} record
   */
  gotoRecordEditor (record = this.$record) {
    this.gotoRecordPage('page.record.edit', record)
  }

  /**
   * Open record page
   *
   * @private
   * @param {string} name
   * @param {Record} record
   * @param {string} record.recordID
   * @param {string} record.moduleID
   */
  gotoRecordPage (name, record = this.$record) {
    let { pageID } = this.getRecordPage(record)
    let { recordID } = record

    if (!pageID) {
      throw Error('record page does not exist')
    }

    if (!recordID) {
      throw Error('invalid record')
    }

    this.goto(name, { pageID, recordID })
  }

  /**
   * Returns record page
   *
   * @private
   * @param {Object} module
   * @param {string} module.moduleID
   * @returns {Page}
   */
  getRecordPage (module = this.$module) {
    const moduleID = extractID(module, 'moduleID')
    return this.pages.find(p => p.moduleID === moduleID)
  }

  /**
   * Go to a specific route
   *
   * @private
   * @param {string} name
   * @param {Object} params for $router.push
   */
  goto (name, params) {
    this.routePusher({ name, params })
  }

  /**
   * Show a success alert
   *
   * @example
   * ComposeUI.success('Change was successful')
   *
   * @param message
   */
  success (message) {
    this.emitter('alert', { ...success, message })
  }

  /**
   * Show a warning alert
   *
   * @example
   * ComposeUI.success('Could not save your changes')
   *
   * @param message
   */
  warning (message) {
    this.emitter('alert', { ...warning, message })
  }
}

export default ComposeUIHelper
