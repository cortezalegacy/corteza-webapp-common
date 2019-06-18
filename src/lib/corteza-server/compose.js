import Compose from './rest-api-client/compose.js'

const { ComposeAPI, CortezaComposeAPI, CrustComposeAPI } = window
const baseURL = ComposeAPI || CortezaComposeAPI || CrustComposeAPI

export default new Compose({ baseURL })
