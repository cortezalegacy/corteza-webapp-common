import Role from '../system/role'
import User from '../system/user'
import Channel from '../messaging/channel'
import Namespace from '../compose/namespace'
import Module from '../compose/module'
import { isFresh } from '../../automation-scripts/context/shared'

const pResource = Symbol('resource')
const pRole = Symbol('role')

const INHERIT = 'inherit'
const DENY = 'deny'
const ALLOW = 'allow'

export default class PermissionRule {
  set resource (resource) {
    this[pResource] = objectToResource(resource)
  }

  get resource () {
    return this[pResource]
  }

  set role (role) {
    if (!(role instanceof Role)) {
      throw new Error(`Expecting Role object for role`)
    }

    this[pRole] = role
  }

  get role () {
    return this[pRole]
  }

  constructor (role, resource, operation, access = INHERIT) {
    this.role = role
    this.operation = operation
    this.resource = resource
    this.access = access
  }

  toJSON () {
    return {
      resource: this.resource,
      operation: this.operation,
      access: String(this.access),
    }
  }
}

export class AllowAccess extends PermissionRule {
  constructor (role, resource, operation) {
    super(role, resource, operation, ALLOW)
  }
}

export class DenyAccess extends PermissionRule {
  constructor (role, resource, operation) {
    super(role, resource, operation, DENY)
  }
}

// Helper for resource wildcarding
export class WildcardResource {
  constructor (r) {
    this.inner = r
  }
}

function objectToResource (res) {
  let wildcardResource = false
  if (res instanceof WildcardResource) {
    res = res.inner
    wildcardResource = true
  }

  // Resource ID maker
  const rIDm = (prefix, ID) => {
    if (!wildcardResource && isFresh(ID)) {
      throw new Error(`Expecting valid resource (ID != 0)`)
    }

    return `${prefix}:${wildcardResource ? '*' : ID}`
  }

  switch (true) {
    case res instanceof Channel:
      return rIDm('messaging:channel', res.channelID)

    case res instanceof Module:
      return rIDm('compose:module', res.moduleID)

    case res instanceof Namespace:
      return rIDm('compose:namespace', res.namespaceID)

    case res instanceof Role:
      return rIDm('system:role', res.roleID)

    case res instanceof User:
      return rIDm('system:user', res.userID)

    default:
      throw new Error(`Expecting instance of CortezaObject for resource`)
  }
}
