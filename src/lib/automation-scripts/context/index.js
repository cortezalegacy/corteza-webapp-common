import Namespace from '../../types/compose/namespace'
import Module from '../../types/compose/module'
import Record from '../../types/compose/record'
import ComposeHelper from './compose'
import MessagingHelper from './messaging'
import SystemHelper from './system'
import ComposeUIHelper from './compose-ui'
import { Abort } from './errors'

/**
 * Extends & modifies context to be used for UA and Corredor automation scripting
 *
 *  Here we convert non-$-prefixed namespace/module/record variables to
 *  script-scope $-prefixed variables.
 *
 * @ignore
 * @param {Object} ctx
 */
export function sharedContext (ctx = {}) {
  ctx.Abort = Abort
  ctx.Namespace = Namespace
  ctx.Module = Module
  ctx.Record = Record

  // Transform namespace, module & record to $-prefixed variables
  if (ctx.namespace) {
    ctx.$namespace = new Namespace(ctx.namespace)
    delete ctx.namespace

    if (ctx.module) {
      ctx.$module = new Module(ctx.module)
      delete ctx.module

      if (ctx.record) {
        ctx.$record = new Record(ctx.$module, ctx.record)
        delete ctx.record
      }
    }
  }

  // Helpers
  ctx.Compose = new ComposeHelper(ctx)
  ctx.Messaging = new MessagingHelper(ctx)
  ctx.System = new SystemHelper(ctx)

  return ctx
}

/**
 * Extends & modifies context to be used for UA automation scripting
 *
 * @ignore
 * @param {Object} ctx
 */
export function uiContext (ctx = {}) {
  ctx.ComposeUI = new ComposeUIHelper(ctx)

  return ctx
}
