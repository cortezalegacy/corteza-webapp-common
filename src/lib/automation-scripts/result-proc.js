import Record from '../types/compose/record'
import Module from '../types/compose/module'
import Namespace from '../types/compose/namespace'
import { CortezaObject } from '../types/common'

/**
 * Processes results and finds appropriate place in the context for it
 *
 * @param {Object} ctx
 * @param {*} rval
 * @returns {boolean}
 */
export default function resultProcessor (ctx, rval) {
  if (rval === false) {
    // Script was explicitly aborted,
    // let the caller know
    return false
  }

  if (rval instanceof CortezaObject) {
    // Value explicitly returned
    switch (true) {
      case rval instanceof Record:
        ctx.$record = rval
        break
      case rval instanceof Module:
        ctx.$module = rval
        break
      case rval instanceof Namespace:
        ctx.$namespace = rval
        break
    }
  }

  // Script was not aborted but there is really nothing
  // that we could return, so return undefined (and not false)
  return true
}
