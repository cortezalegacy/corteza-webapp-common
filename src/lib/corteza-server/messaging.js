import Messaging from './rest-api-client/messaging'

const { MessagingAPI, CortezaMessagingAPI, CrustMessagingAPI } = window

const opt = {
  baseURL: MessagingAPI || CortezaMessagingAPI || CrustMessagingAPI,
  jwt: localStorage.getItem('auth.jwt'),
}

export default new Messaging(opt)
