import { MessagingObject } from './common'
import { PropCast, ISO8601, ID } from '../common'

// @todo port fuzkeys, normalizers
// @todo migrate channel from messaging  webapp to this

class Channel extends MessagingObject {
  /** @type {string} fti Full Text Search index */
  get fts () {
    return (this.name + ' ' + this.username + ' ' + this.handle + ' ' + this.email + ' ' + this.userID).toLocaleLowerCase()
  }

  /**
   *
   * @param c
   */
  constructor (c = {}) {
    super()

    /** @type {string} channelID */
    this.channelID = PropCast(ID, c.channelID)

    /** @type {string} name */
    this.name = PropCast(String, c.name)

    /** @type {string} topic */
    this.topic = PropCast(String, c.topic)

    /** @type {string} type */
    this.type = PropCast(String, c.type)

    /** @type {string[]} members */
    this.members = c.members

    /** @type {string} membershipFlag */
    this.membershipFlag = PropCast(String, c.membershipFlag)

    /** @type {string} membershipPolicy */
    this.membershipPolicy = PropCast(String, c.membershipPolicy)

    /** @type {boolean} canJoin */
    this.canJoin = !!c.canJoin

    /** @type {boolean} canPart */
    this.canPart = !!c.canPart

    /** @type {boolean} canObserve */
    this.canObserve = !!c.canObserve

    /** @type {boolean} canSendMessages */
    this.canSendMessages = !!c.canSendMessages

    /** @type {boolean} canDeleteMessages */
    this.canDeleteMessages = !!c.canDeleteMessages

    /** @type {boolean} canChangeMembers */
    this.canChangeMembers = !!c.canChangeMembers

    /** @type {boolean} canChangeMembershipPolicy */
    this.canChangeMembershipPolicy = !!c.canChangeMembershipPolicy

    /** @type {boolean} canUpdate */
    this.canUpdate = !!c.canUpdate

    /** @type {boolean} canArchive */
    this.canArchive = !!c.canArchive

    /** @type {boolean} canDelete */
    this.canDelete = !!c.canDelete

    /** @type {string} createdAt */
    this.createdAt = PropCast(ISO8601, c.createdAt)

    /** @type {string} updatedAt */
    this.updatedAt = PropCast(ISO8601, c.updatedAt)

    /** @type {string} archivedAt */
    this.archivedAt = PropCast(ISO8601, c.archivedAt)

    /** @type {string} deletedAt */
    this.deletedAt = PropCast(ISO8601, c.deletedAt)
  }

  suggestionLabel () {
    return this.name || this.channelID || ''
  }

  isMember (userID) {
    return this.members.indexOf(userID) !== -1
  }

  isFeatured () {
    return (this.membershipPolicy === 'featured')
  }

  removeMember (user) {
    const ID = (user || {}).userID || user
    this.members = this.members.filter(m => m !== ID)
  }

  isDirectMessage () {
    return this.type === 'group' && this.name === '' && this.members.length === 2
  }

  isPinned () {
    return this.membershipFlag === 'pinned'
  }

  isGroup () {
    return this.type === 'group'
  }

  isPrivate () {
    return this.type === 'private'
  }

  isPublic () {
    return this.type === 'public'
  }

  isValid () {
    return !this.deletedAt && !this.archivedAt
  }
}

export default Channel
