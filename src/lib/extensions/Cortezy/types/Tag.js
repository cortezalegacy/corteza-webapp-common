import { Association } from './Association'

export class TagPayload {
  constructor ({ tagID = '', content = '', associations = [] }) {
    this.tagID = tagID
    this.content = content
    this.associations = associations
  }
}

/**
 * Helper to create a tag matcher for the given tag
 * @param {String} tag Tag to match for
 * @returns {Function}
 */
function makeTagMatcher (tag) {
  return h => {
    const i = h.toLowerCase().indexOf(tag)
    if (i > -1) {
      return {
        i,
        from: i,
        to: i + tag.length,
      }
    }
    return undefined
  }
}

export class Tag {
  constructor (t = {}) {
    this.merge(t)
  }

  /**
   * Helper to generate a tag string from a given label
   * @todo improve this
   * @param {String} l Label
   * @returns {String}
   */
  static tagFromLabel (l) {
    return l.trim().toLowerCase()
  }

  /**
   * Helper to convert a given set of associations or association kinds into
   * a set of associations
   * @param {Array} ascs Association objects or kinds
   */
  toAssociationSet (ascs) {
    return ascs.map(asc => {
      if (typeof asc === 'string') {
        return new Association({ kind: asc })
      } else {
        return new Association(asc)
      }
    })
  }

  merge ({ tagID, tag, matcher, associations }) {
    this.tagID = tagID || this.tagID

    this.tag = tag || this.tag || ''

    this.matcher = matcher || this.matcher
    if (!this.matcher) {
      this.matcher = makeTagMatcher(this.tag)
    }

    this.associations = this.toAssociationSet((associations || this.associations || []))
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

  /**
   * Helper method to determine what associations differ
   * @param {Array} cmp Associations to compare to
   * @returns {Array} If diff is empty, the array is empty
   */
  diffAssociations (cmp) {
    const cAscs = this.associationKinds()
    const base = cAscs.length > cmp.length ? cAscs : cmp
    return base.filter(k => !(cmp.includes(k) && cAscs.includes(k)))
  }

  /**
   * Helper method to get a set of association kinds
   * @returns {Array}
   */
  associationKinds () {
    return this.associations.map(({ kind }) => kind)
  }
}
