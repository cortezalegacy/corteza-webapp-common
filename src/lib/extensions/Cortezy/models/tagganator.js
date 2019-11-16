/**
 * TagMatch class represents a match
 */
class TagMatch {
  constructor ({ from, to, text, associations }) {
    this.from = from
    this.to = to
    this.text = text
    this.associations = associations
  }
}

/**
 * Tagganator will attempt to guess the tags that occur inside the input.
 */
export default class Taganator {
  static init (tags = []) {
    Taganator.tags = tags
  }

  // @todo improve this!!
  static findAll (text = '') {
    text = text.toLowerCase()
    const matches = []

    for (const tag of Taganator.tags) {
      let i = 0
      let index = 0
      while (i > -1) {
        i = tag.matcher(text)
        console.log({ tag, i })
        if (i === -1) {
          break
        }

        const from = index + i
        const to = index + i + tag.label.length
        matches.push(new TagMatch({
          from,
          to,
          associations: tag.associations.map(({ kind }) => kind),
          text: text.slice(from, to),
        }))

        index = to
        text = text.substring(index)
      }
    }

    return matches
  }
}
