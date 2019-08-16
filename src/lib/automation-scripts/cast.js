import { ComposeObject } from '../types/compose/common'
import Record from '../types/compose/record'
import Module from '../types/compose/module'
import Namespace from '../types/compose/namespace'

export default function castResult (rval, ctx) {
  if (rval === false) {
    // Script was explicitly aborted,
    // let the caller know

    return false
  }

  // Script was not explicitly aborted
  if (rval instanceof Promise) {
    return rval.then((v) => {
      // cast resolved value
      return castResult(v, ctx)
    })
  }

  if (rval instanceof ComposeObject) {
    // Value explicitly returned
    return rval
  }

  // Value was not explicitly returned,
  // pick one of ctx values (by order of importance)
  if (ctx.$record instanceof Record) {
    return ctx.$record
  }
  if (ctx.$module instanceof Module) {
    return ctx.$module
  }
  if (ctx.$namespace instanceof Namespace) {
    return ctx.$namespace
  }

  // Script was not aborted but there is really nothing
  // that we could return, so return undefined (and not false)
  return undefined
}
