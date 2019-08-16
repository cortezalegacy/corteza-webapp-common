export default class MessagingHelper {
  constructor (ctx = {}) {
    this.MessagingAPI = ctx.MessagingAPI
  }

  /**
   * Sends message to Messaging channel
   *
   * @param channel
   * @param message
   */
  // async SendMessageToChannel (channel, message) {
  //   this.MessagingAPI.messageCreate({
  //     ...extractID(channel, 'channelID'),
  //     message,
  //   })
  // }

  /**
   * Sends direct message to Corteza Messaging user
   *
   * @todo Implementation
   *
   * @returns {Promise<void>}
   */
  // async SendDirectMessageToUses  () {
  //   throw Error('not implemented')
  // }
}
