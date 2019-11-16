import { Association } from './Association'

export class TagPayload {
  constructor ({ tagID = '', content = '', associations = [] }) {
    this.tagID = tagID
    this.content = content
    this.associations = associations
  }
}

export class Tag {
  constructor (t) {
    this.merge(t)
  }

  merge ({ tagID, label, matcher, associations }) {
    this.tagID = tagID || this.tagID

    this.matcher = matcher || this.matcher || (() => -1)
    this.label = label || this.label || ''
    this.associations = (associations || this.associations || []).map(asc => new Association(asc))
  }

  update ({ associations = [] }) {
    const ascs = this.associations.filter(({ kind }) => associations.includes(kind))
    associations.forEach(kind => {
      if (!ascs.find(asc => asc.kind === kind)) {
        ascs.push(new Association({ kind }))
      }
    })
    this.merge({ associations: ascs })
  }
}
