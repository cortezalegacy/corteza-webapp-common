export class ActionPayload {
  constructor (ap = {}) {
    this.merge(ap)
  }

  merge ({ params = {}, action = undefined }) {
    this.params = params || this.params
    this.action = action || this.action
  }
}

export class Action {
  static KIND_REMINDER = 'reminder'
  static KIND_EVENT = 'event'

  constructor ({ meta = {}, kind, label, icon }, cb) {
    this.cb = cb
    this.meta = meta
    this.kind = kind
    this.meta = meta
    this.label = label
    this.icon = icon
  }
}
