/**
 * ActionMatch represents a found action.
 * @todo
 */
class ActionMatch {
  constructor ({ from, to, kind, text }) {
    this.from = from
    this.to = to
    this.text = text
    this.kind = kind
  }
}

/**
 * Actioner is a model that will attempt to determine if an action can be created
 * from the current state. Operations should be defined as static functions.
 * @todo
 */
export default class Actioner {
  /**
   * This method checks the current doc, if an action can be created.
   * @param {Document} doc Doc from the current state
   * @returns {ActionMatch|undefined}
   */
  static check (doc) {
    return new ActionMatch({})
  }
}
