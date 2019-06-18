import Messaging from './rest-api-client/messaging.js'

const { MessagingAPI, CortezaMessagingAPI, CrustMessagingAPI } = window
const baseURL = MessagingAPI || CortezaMessagingAPI || CrustMessagingAPI

export default new Messaging({ baseURL })
