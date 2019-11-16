export class Association {
  static KIND_LOCATION = 'location'
  static KIND_LINK = 'link'
  static KIND_USER = 'user'
  static KIND_TIME = 'time'
  static KIND_FILE = 'file'

  static KIND_COLOR_CODE = {
    [Association.KIND_LOCATION]: '#0b132b',
    [Association.KIND_LINK]: '#134571',
    [Association.KIND_USER]: '#346da0',
    [Association.KIND_TIME]: '#84828f',
    [Association.KIND_FILE]: '#6a687a',
  }

  constructor (e) {
    this.merge(e)
  }

  merge ({ entries, kind, label, meta }) {
    this.kind = kind || this.kind
    this.label = label || this.label || ''
    this.meta = meta || this.meta || {}

    this.entries = (entries || this.entries || []).map(e => e instanceof AssociationEntry ? e : new AssociationEntry(e))
  }
}

export class AssociationEntry {
  constructor (e) {
    this.merge(e)
  }

  merge ({ value, meta }) {
    this.value = value || this.value
    this.meta = meta || this.meta || {}
  }
}
