/**
 * TagMatch class represents a match
 */
class TagMatch {
  constructor ({ from, to, text, tag, associations }) {
    this.from = from
    this.to = to
    this.text = text
    this.tag = tag
    this.associations = associations
  }
}

/**
 * Tagganator will attempt to guess the tags that occur inside the input.
 */
export default class Taganator {
  constructor ({ tags = [] }) {
    this.tags = tags
  }

  /**
   * Helper to find a tag from the given model
   * @todo improve
   * @param {String} tag Tag to find
   * @returns {Tag|undefined}
   */
  findTag (tag) {
    return this.tags.find(t => t.tag === tag)
  }

  /**
   * Helper to update a tag in a given model
   * @param {String} tag Tag to update
   * @param {Tag} nt New tag
   */
  updateTag (tag, nt) {
    const i = this.tags.findIndex(t => t.tag === tag)
    console.log({ i })
    if (i <= -1) {
      return
    }

    this.tags.splice(i, 1, nt)
  }

  /**
   * Helper to add a tag to a given model
   * @todo improve
   * @param {String} tag Tag to update
   * @param {Tag} nt New tag
   */
  addTag (tag) {
    this.tags.push(tag)
  }

  // @todo improve this!!
  /**
   * Helper to find all tags from this model from a given string
   * @todo improve this
   * @param {String} text Text that should be processed
   * @returns {Array<TagMatch>}
   */
  findAll (text = '') {
    text = text.toLowerCase()
    const matches = []

    for (const tag of this.tags) {
      let i = 0
      let index = 0
      while (i > -1) {
        const match = tag.matcher(text)
        if (!match) {
          break
        }

        const { from, to } = match
        i = match.i
        matches.push(new TagMatch({
          from,
          to,
          associations: tag.associations.map(({ kind }) => kind),
          tag: tag.tag,
          text: text.slice(from, to),
        }))

        index = to
        text = text.substring(index)
      }
    }

    return matches
  }
}
