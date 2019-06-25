import axios from 'axios'

/* eslint-disable */

// This is a generated file.
// See README.md file for update instructions

export default class Messaging {
  constructor ({baseURL, headers, jwt} = {}) {
    this.jwt = null
    this.baseURL = baseURL

    this.headers = {
      'Content-Type': 'application/json',
    }

    this.setHeaders(headers)

    jwt = jwt || localStorage.getItem('auth.jwt')

    if (this.isValidJWT(jwt)) {
      this.setJWT(jwt)
    }
  }

  setJWT (jwt) {
    if (this.isValidJWT(jwt)) {
      this.jwt = jwt
      this.headers['Authorization'] = 'Bearer ' + jwt
    } else {
      throw new Error('JWT value too short', {
        jwt,
      })
    }

    return this
  }

  setHeaders (headers) {
    if (typeof headers === 'object') {
      this.headers = headers
    }

    return this
  }

  isValidJWT (jwt) {
    return jwt && jwt.length > 100
  }

  stdReject (reject) {
    return (error) => {
      reject(error)
    }
  }

  stdResolve (resolve, reject) {
    return (response) => {
      if (response.data.error) {
        reject(response.data.error)
      } else {
        resolve(response.data.response)
      }
    }
  }

  api () {
    return axios.create({
      withCredentials: true,
      baseURL: this.baseURL,
      headers: this.headers,
    })
  }

  // List of available commands
  async commandsList () {


    let cfg = {
      method: 'get',
      url: this.commandsListEndpoint({  }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  commandsListEndpoint () {
    return `/commands/`
  }

  // See all current statuses
  async statusList () {


    let cfg = {
      method: 'get',
      url: this.statusListEndpoint({  }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  statusListEndpoint () {
    return `/status/`
  }

  // Set user&#x27;s status
  async statusSet ({icon, message, expires, } = {}) {


    let cfg = {
      method: 'post',
      url: this.statusSetEndpoint({  }),
    }

    cfg.data = {
      icon,
      message,
      expires,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  statusSetEndpoint () {
    return `/status/`
  }

  // Clear status
  async statusDelete () {


    let cfg = {
      method: 'delete',
      url: this.statusDeleteEndpoint({  }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  statusDeleteEndpoint () {
    return `/status/`
  }

  // Sends user&#x27;s activity to all subscribers; globally or per channel/message.
  async activitySend ({channelID, messageID, kind, } = {}) {
    if (!kind) {
      throw Error('Field kind is empty')
    }

    let cfg = {
      method: 'post',
      url: this.activitySendEndpoint({  }),
    }

    cfg.data = {
      channelID,
      messageID,
      kind,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  activitySendEndpoint () {
    return `/activity/`
  }

  // List channels
  async channelList ({query, } = {}) {


    let cfg = {
      method: 'get',
      url: this.channelListEndpoint({  }),
    }
    cfg.params = {
      query,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelListEndpoint () {
    return `/channels/`
  }

  // Create new channel
  async channelCreate ({name, topic, type, members, } = {}) {


    let cfg = {
      method: 'post',
      url: this.channelCreateEndpoint({  }),
    }

    cfg.data = {
      name,
      topic,
      type,
      members,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelCreateEndpoint () {
    return `/channels/`
  }

  // Update channel details
  async channelUpdate ({channelID, name, topic, type, organisationID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }

    let cfg = {
      method: 'put',
      url: this.channelUpdateEndpoint({
        channelID,
      }),
    }

    cfg.data = {
      name,
      topic,
      type,
      organisationID,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelUpdateEndpoint ({channelID, } = {}) {
    return `/channels/${channelID}`
  }

  // Update channel state
  async channelState ({channelID, state, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!state) {
      throw Error('Field state is empty')
    }

    let cfg = {
      method: 'put',
      url: this.channelStateEndpoint({
        channelID,
      }),
    }

    cfg.data = {
      state,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelStateEndpoint ({channelID, } = {}) {
    return `/channels/${channelID}/state`
  }

  // Update channel membership flag
  async channelSetFlag ({channelID, flag, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!flag) {
      throw Error('Field flag is empty')
    }

    let cfg = {
      method: 'put',
      url: this.channelSetFlagEndpoint({
        channelID,
      }),
    }

    cfg.data = {
      flag,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelSetFlagEndpoint ({channelID, } = {}) {
    return `/channels/${channelID}/flag`
  }

  // Remove channel membership flag
  async channelRemoveFlag ({channelID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.channelRemoveFlagEndpoint({
        channelID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelRemoveFlagEndpoint ({channelID, } = {}) {
    return `/channels/${channelID}/flag`
  }

  // Read channel details
  async channelRead ({channelID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.channelReadEndpoint({
        channelID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelReadEndpoint ({channelID, } = {}) {
    return `/channels/${channelID}`
  }

  // List channel members
  async channelMembers ({channelID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.channelMembersEndpoint({
        channelID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelMembersEndpoint ({channelID, } = {}) {
    return `/channels/${channelID}/members`
  }

  // Join channel
  async channelJoin ({channelID, userID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }

    let cfg = {
      method: 'put',
      url: this.channelJoinEndpoint({
        channelID,
        userID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelJoinEndpoint ({channelID, userID, } = {}) {
    return `/channels/${channelID}/members/${userID}`
  }

  // Remove member from channel
  async channelPart ({channelID, userID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.channelPartEndpoint({
        channelID,
        userID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelPartEndpoint ({channelID, userID, } = {}) {
    return `/channels/${channelID}/members/${userID}`
  }

  // Join channel
  async channelInvite ({channelID, userID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }

    let cfg = {
      method: 'post',
      url: this.channelInviteEndpoint({
        channelID,
      }),
    }

    cfg.data = {
      userID,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelInviteEndpoint ({channelID, } = {}) {
    return `/channels/${channelID}/invite`
  }

  // Attach file to channel
  async channelAttach ({channelID, replyTo, upload, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!upload) {
      throw Error('Field upload is empty')
    }

    let cfg = {
      method: 'post',
      url: this.channelAttachEndpoint({
        channelID,
      }),
    }

    cfg.data = {
      replyTo,
      upload,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  channelAttachEndpoint ({channelID, } = {}) {
    return `/channels/${channelID}/attach`
  }

  // Post new message to the channel
  async messageCreate ({channelID, message, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!message) {
      throw Error('Field message is empty')
    }

    let cfg = {
      method: 'post',
      url: this.messageCreateEndpoint({
        channelID,
      }),
    }

    cfg.data = {
      message,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messageCreateEndpoint ({channelID, } = {}) {
    return `/channels/${channelID}/messages/`
  }

  // Execute command
  async messageExecuteCommand ({channelID, command, input, params, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!command) {
      throw Error('Field command is empty')
    }

    let cfg = {
      method: 'post',
      url: this.messageExecuteCommandEndpoint({
        channelID,
        command,
      }),
    }

    cfg.data = {
      input,
      params,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messageExecuteCommandEndpoint ({channelID, command, } = {}) {
    return `/channels/${channelID}/messages/command/${command}/exec`
  }

  // Manages read/unread messages in a channel or a thread
  async messageMarkAsRead ({channelID, threadID, lastReadMessageID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.messageMarkAsReadEndpoint({
        channelID,
      }),
    }
    cfg.params = {
      threadID,
      lastReadMessageID,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messageMarkAsReadEndpoint ({channelID, } = {}) {
    return `/channels/${channelID}/messages/mark-as-read`
  }

  // Edit existing message
  async messageEdit ({channelID, messageID, message, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!messageID) {
      throw Error('Field messageID is empty')
    }
    if (!message) {
      throw Error('Field message is empty')
    }

    let cfg = {
      method: 'put',
      url: this.messageEditEndpoint({
        channelID,
        messageID,
      }),
    }

    cfg.data = {
      message,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messageEditEndpoint ({channelID, messageID, } = {}) {
    return `/channels/${channelID}/messages/${messageID}`
  }

  // Delete existing message
  async messageDelete ({channelID, messageID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!messageID) {
      throw Error('Field messageID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.messageDeleteEndpoint({
        channelID,
        messageID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messageDeleteEndpoint ({channelID, messageID, } = {}) {
    return `/channels/${channelID}/messages/${messageID}`
  }

  // Reply to a message
  async messageReplyCreate ({channelID, messageID, message, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!messageID) {
      throw Error('Field messageID is empty')
    }
    if (!message) {
      throw Error('Field message is empty')
    }

    let cfg = {
      method: 'post',
      url: this.messageReplyCreateEndpoint({
        channelID,
        messageID,
      }),
    }

    cfg.data = {
      message,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messageReplyCreateEndpoint ({channelID, messageID, } = {}) {
    return `/channels/${channelID}/messages/${messageID}/replies`
  }

  // Pin message to channel (public bookmark)
  async messagePinCreate ({channelID, messageID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!messageID) {
      throw Error('Field messageID is empty')
    }

    let cfg = {
      method: 'post',
      url: this.messagePinCreateEndpoint({
        channelID,
        messageID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messagePinCreateEndpoint ({channelID, messageID, } = {}) {
    return `/channels/${channelID}/messages/${messageID}/pin`
  }

  // Pin message to channel (public bookmark)
  async messagePinRemove ({channelID, messageID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!messageID) {
      throw Error('Field messageID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.messagePinRemoveEndpoint({
        channelID,
        messageID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messagePinRemoveEndpoint ({channelID, messageID, } = {}) {
    return `/channels/${channelID}/messages/${messageID}/pin`
  }

  // Bookmark a message (private bookmark)
  async messageBookmarkCreate ({channelID, messageID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!messageID) {
      throw Error('Field messageID is empty')
    }

    let cfg = {
      method: 'post',
      url: this.messageBookmarkCreateEndpoint({
        channelID,
        messageID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messageBookmarkCreateEndpoint ({channelID, messageID, } = {}) {
    return `/channels/${channelID}/messages/${messageID}/bookmark`
  }

  // Remove boomark from message (private bookmark)
  async messageBookmarkRemove ({channelID, messageID, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!messageID) {
      throw Error('Field messageID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.messageBookmarkRemoveEndpoint({
        channelID,
        messageID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messageBookmarkRemoveEndpoint ({channelID, messageID, } = {}) {
    return `/channels/${channelID}/messages/${messageID}/bookmark`
  }

  // React to a message
  async messageReactionCreate ({channelID, messageID, reaction, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!messageID) {
      throw Error('Field messageID is empty')
    }
    if (!reaction) {
      throw Error('Field reaction is empty')
    }

    let cfg = {
      method: 'post',
      url: this.messageReactionCreateEndpoint({
        channelID,
        messageID,
        reaction,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messageReactionCreateEndpoint ({channelID, messageID, reaction, } = {}) {
    return `/channels/${channelID}/messages/${messageID}/reaction/${reaction}`
  }

  // Delete reaction from a message
  async messageReactionRemove ({channelID, messageID, reaction, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!messageID) {
      throw Error('Field messageID is empty')
    }
    if (!reaction) {
      throw Error('Field reaction is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.messageReactionRemoveEndpoint({
        channelID,
        messageID,
        reaction,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  messageReactionRemoveEndpoint ({channelID, messageID, reaction, } = {}) {
    return `/channels/${channelID}/messages/${messageID}/reaction/${reaction}`
  }

  // Serves attached file
  async attachmentOriginal ({attachmentID, name, sign, userID, download, } = {}) {
    if (!attachmentID) {
      throw Error('Field attachmentID is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }
    if (!sign) {
      throw Error('Field sign is empty')
    }
    if (!userID) {
      throw Error('Field userID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.attachmentOriginalEndpoint({
        attachmentID,
        name,
      }),
    }
    cfg.params = {
      sign,
      userID,
      download,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  attachmentOriginalEndpoint ({attachmentID, name, } = {}) {
    return `/attachment/${attachmentID}/original/${name}`
  }

  // Serves preview of an attached file
  async attachmentPreview ({attachmentID, ext, sign, userID, } = {}) {
    if (!attachmentID) {
      throw Error('Field attachmentID is empty')
    }
    if (!ext) {
      throw Error('Field ext is empty')
    }
    if (!sign) {
      throw Error('Field sign is empty')
    }
    if (!userID) {
      throw Error('Field userID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.attachmentPreviewEndpoint({
        attachmentID,
        ext,
      }),
    }
    cfg.params = {
      sign,
      userID,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  attachmentPreviewEndpoint ({attachmentID, ext, } = {}) {
    return `/attachment/${attachmentID}/preview.${ext}`
  }

  // Search for messages
  async searchMessages ({query, channelID, afterMessageID, beforeMessageID, fromMessageID, toMessageID, threadID, userID, type, pinnedOnly, bookmarkedOnly, limit, } = {}) {


    let cfg = {
      method: 'get',
      url: this.searchMessagesEndpoint({  }),
    }
    cfg.params = {
      query,
      channelID,
      afterMessageID,
      beforeMessageID,
      fromMessageID,
      toMessageID,
      threadID,
      userID,
      type,
      pinnedOnly,
      bookmarkedOnly,
      limit,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  searchMessagesEndpoint () {
    return `/search/messages`
  }

  // Search for threads
  async searchThreads ({query, channelID, limit, } = {}) {


    let cfg = {
      method: 'get',
      url: this.searchThreadsEndpoint({  }),
    }
    cfg.params = {
      query,
      channelID,
      limit,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  searchThreadsEndpoint () {
    return `/search/threads`
  }

  // List created webhooks
  async webhooksList ({channelID, userID, } = {}) {


    let cfg = {
      method: 'get',
      url: this.webhooksListEndpoint({  }),
    }
    cfg.params = {
      channelID,
      userID,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  webhooksListEndpoint () {
    return `/webhooks/`
  }

  // Create webhook
  async webhooksCreate ({channelID, kind, userID, trigger, url, username, avatar, avatarURL, } = {}) {
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!kind) {
      throw Error('Field kind is empty')
    }
    if (!userID) {
      throw Error('Field userID is empty')
    }

    let cfg = {
      method: 'post',
      url: this.webhooksCreateEndpoint({  }),
    }

    cfg.data = {
      channelID,
      kind,
      userID,
      trigger,
      url,
      username,
      avatar,
      avatarURL,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  webhooksCreateEndpoint () {
    return `/webhooks/`
  }

  // Attach file to channel
  async webhooksUpdate ({webhookID, channelID, kind, userID, trigger, url, username, avatar, avatarURL, } = {}) {
    if (!webhookID) {
      throw Error('Field webhookID is empty')
    }
    if (!channelID) {
      throw Error('Field channelID is empty')
    }
    if (!kind) {
      throw Error('Field kind is empty')
    }
    if (!userID) {
      throw Error('Field userID is empty')
    }

    let cfg = {
      method: 'post',
      url: this.webhooksUpdateEndpoint({
        webhookID,
      }),
    }

    cfg.data = {
      channelID,
      kind,
      userID,
      trigger,
      url,
      username,
      avatar,
      avatarURL,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  webhooksUpdateEndpoint ({webhookID, } = {}) {
    return `/webhooks/${webhookID}`
  }

  // Get webhook details
  async webhooksGet ({webhookID, } = {}) {
    if (!webhookID) {
      throw Error('Field webhookID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.webhooksGetEndpoint({
        webhookID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  webhooksGetEndpoint ({webhookID, } = {}) {
    return `/webhooks/${webhookID}`
  }

  // Delete webhook
  async webhooksDelete ({webhookID, } = {}) {
    if (!webhookID) {
      throw Error('Field webhookID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.webhooksDeleteEndpoint({
        webhookID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  webhooksDeleteEndpoint ({webhookID, } = {}) {
    return `/webhooks/${webhookID}`
  }

  // Delete webhook
  async webhooksPublicDelete ({webhookID, webhookToken, } = {}) {
    if (!webhookID) {
      throw Error('Field webhookID is empty')
    }
    if (!webhookToken) {
      throw Error('Field webhookToken is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.webhooksPublicDeleteEndpoint({
        webhookID,
        webhookToken,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  webhooksPublicDeleteEndpoint ({webhookID, webhookToken, } = {}) {
    return `/webhooks/${webhookID}/${webhookToken}`
  }

  // Create a message from a webhook payload
  async webhooksPublicCreate ({webhookID, webhookToken, username, avatarURL, content, } = {}) {
    if (!webhookID) {
      throw Error('Field webhookID is empty')
    }
    if (!webhookToken) {
      throw Error('Field webhookToken is empty')
    }
    if (!content) {
      throw Error('Field content is empty')
    }

    let cfg = {
      method: 'post',
      url: this.webhooksPublicCreateEndpoint({
        webhookID,
        webhookToken,
      }),
    }
    cfg.params = {
      username,
      avatarURL,
      content,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  webhooksPublicCreateEndpoint ({webhookID, webhookToken, } = {}) {
    return `/webhooks/${webhookID}/${webhookToken}`
  }

  // Retrieve defined permissions
  async permissionsList () {


    let cfg = {
      method: 'get',
      url: this.permissionsListEndpoint({  }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsListEndpoint () {
    return `/permissions/`
  }

  // Effective rules for current user
  async permissionsEffective ({resource, } = {}) {


    let cfg = {
      method: 'get',
      url: this.permissionsEffectiveEndpoint({  }),
    }
    cfg.params = {
      resource,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsEffectiveEndpoint () {
    return `/permissions/effective`
  }

  // Retrieve role permissions
  async permissionsRead ({roleID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.permissionsReadEndpoint({
        roleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsReadEndpoint ({roleID, } = {}) {
    return `/permissions/${roleID}/rules`
  }

  // Remove all defined role permissions
  async permissionsDelete ({roleID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.permissionsDeleteEndpoint({
        roleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsDeleteEndpoint ({roleID, } = {}) {
    return `/permissions/${roleID}/rules`
  }

  // Update permission settings
  async permissionsUpdate ({roleID, rules, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }
    if (!rules) {
      throw Error('Field rules is empty')
    }

    let cfg = {
      method: 'patch',
      url: this.permissionsUpdateEndpoint({
        roleID,
      }),
    }

    cfg.data = {
      rules,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsUpdateEndpoint ({roleID, } = {}) {
    return `/permissions/${roleID}/rules`
  }

}
