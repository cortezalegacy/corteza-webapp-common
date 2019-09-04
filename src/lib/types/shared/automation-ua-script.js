import { CortezaObject, ID, PropCast } from '../common'

// A helper Class for user-agent scripts data we get
// from the API
export default class UserAgentScript extends CortezaObject {
  constructor (s = {}) {
    super()
    this.scriptID = PropCast(ID, s.scriptID)
    this.name = PropCast(String, s.name)
    this.source = PropCast(String, s.source)

    this.events = s.events

    this.runInUA = !!s.runInUA
    this.async = !!s.async
  }

  Match (event, condition = '0') {
    // Is there any code to run?
    if (!this.source || this.source.trim().length === 0) {
      return false
    }

    if (!this.events[event] || Array.isArray(this.events[event].length)) {
      return false
    }

    // Are script's events & conditions compatible?
    return this.events[event].findIndex((c) => c === condition) > -1
  }
}
