import { extractID } from './shared'

const success = { variant: 'success', countdown: 5 }
const warning = { variant: 'warning', countdown: 120 }

/**
 * ComposeUIHelper provides helpers for accessing Compose's UI
 */
export default class ComposeUIHelper {
  constructor (ctx = {}) {
    /** @member {Record} */
    this.$record = ctx.$record

    /** @member {Module} */
    this.$module = ctx.$module

    /** @member {function} */
    this.pages = ctx.pages

    /** @member {function} */
    this.emitter = ctx.emitter

    /** @member {function} */
    this.routePusher = ctx.routePusher
  }

  /**
   * Reload current page
   */
  reloadPage () {
    this.emitter('reload')
  }

  /**
   * Open record viewer page
   *
   * @param {Record} record
   */
  gotoRecordEditor (record) {
    this.gotoRecordPage('page.record', record)
  }

  /**
   * Open record editor page
   *
   * @param {Record} record
   */
  gotoRecordViewer (record) {
    this.gotoRecordPage('page.record.edit', record)
  }

  /**
   * Open record page
   *
   * @param {string} name
   * @param {Record} record
   * @param {string} record.recordID
   * @param {string} record.moduleID
   */
  gotoRecordPage (name, record = this.$record) {
    let { pageID } = this.getRecordPage(record)
    let { recordID } = record

    if (!pageID || !recordID) {
      return
    }

    this.goto(name, { pageID, recordID })
  }

  /**
   * Returns record page
   *
   * @param {Object} module
   * @param {string} module.moduleID
   * @returns {Page}
   */
  getRecordPage (module = this.$module) {
    const moduleID = extractID(module, 'moduleID')
    return this.pages.find(p => p.moduleID === moduleID)
  }

  /**
   * Opens a specific route
   *
   * @param {string} name
   * @param {Object} params for $router.push
   */
  goto (name, params) {
    this.routePusher({ name, params })
  }

  /**
   * Shows a success alert
   *
   * @param message
   */
  success (message) {
    this.emitter('alert', { ...success, message })
  }

  /**
   * Shows a warning alert
   *
   * @param message
   */
  warning (message) {
    this.emitter('alert', { ...warning, message })
  }
}
