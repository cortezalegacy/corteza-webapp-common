import Compose from './rest-api-client/compose'

const { ComposeAPI, CortezaComposeAPI, CrustComposeAPI } = window

const opt = {
  baseURL: ComposeAPI || CortezaComposeAPI || CrustComposeAPI,
  jwt: localStorage.getItem('auth.jwt'),
}

export default new Compose(opt)
