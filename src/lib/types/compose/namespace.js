import { ComposeObject } from './common'
import { ID, ISO8601, PropCast } from '../common'

export default class Namespace extends ComposeObject {
  constructor (n = {}) {
    super()
    this.namespaceID = PropCast(ID, n.namespaceID)
    this.name = PropCast(String, n.name, '')
    this.slug = PropCast(String, n.slug, '')
    this.enabled = !!n.enabled

    this.meta = {
      'subtitle': '',
      'description': '',
    }

    if (n.meta) {
      Object.keys(this.meta).forEach(k => {
        this.meta[k] = n.meta[k] || undefined
      })
    }

    this.createdAt = PropCast(ISO8601, n.createdAt)
    this.updatedAt = PropCast(ISO8601, n.updatedAt)
    this.deletedAt = PropCast(ISO8601, n.deletedAt)

    this.canCreateChart = !!n.canCreateChart
    this.canCreateModule = !!n.canCreateModule
    this.canCreatePage = !!n.canCreatePage
    this.canCreateAutomationScript = !!n.canCreateAutomationScript
    this.canDeleteNamespace = !!n.canDeleteNamespace
    this.canUpdateNamespace = !!n.canUpdateNamespace
    this.canManageNamespace = !!n.canManageNamespace
    this.canGrant = !!n.canGrant
  }
}
