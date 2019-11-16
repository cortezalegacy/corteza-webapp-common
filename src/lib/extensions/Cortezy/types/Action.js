export class Action {
  static KIND_REMINDER = 'reminder'

  constructor ({ meta = {}, kind, label, icon }, cb) {
    this.cb = cb
    this.meta = meta
    this.kind = kind
    this.meta = meta
    this.label = label
    this.icon = icon
  }
}
