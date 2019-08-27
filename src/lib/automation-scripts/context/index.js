import Namespace from '../../types/compose/namespace'
import Module from '../../types/compose/module'
import Record from '../../types/compose/record'
import ComposeHelper from './compose'
import MessagingHelper from './messaging'
import SystemHelper from './system'
import ComposeUIHelper from './compose-ui'
import { Abort } from './errors'
import Role from '../../types/system/role'
import User from '../../types/system/user'
import Channel from '../../types/messaging/channel'
import PermissionRule, { AllowAccess, DenyAccess, WildcardResource } from '../../types/shared/permission-rule'

/**
 * Extends & modifies context to be used for UA and Corredor automation scripting
 *
 *  Here we convert non-$-prefixed namespace/module/record variables to
 *  script-scope $-prefixed variables.
 *
 * @ignore
 * @param {Object} ctx
 * @property {Object} ctx.authUser (translated to $authUser, frozen)
 * @property {Namespace} [ctx.namespace] (translated to $namespace)
 * @property {Module} [ctx.module] (translated to $module)
 * @property {Record} [ctx.record] (translated to $record)
 */
export function sharedContext (ctx = {}) {
  // Current user
  ctx.$authUser = Object.freeze(new User(ctx.authUser))
  delete ctx.authUser

  ctx.Abort = Abort
  ctx.AllowAccess = AllowAccess
  ctx.DenyAccess = DenyAccess
  ctx.WildcardResource = WildcardResource
  ctx.PermissionRule = PermissionRule

  // Compose classes
  ctx.Namespace = Namespace
  ctx.Module = Module
  ctx.Record = Record

  // System classes
  ctx.User = User
  ctx.Role = Role

  // Messaging
  ctx.Channel = Channel

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
