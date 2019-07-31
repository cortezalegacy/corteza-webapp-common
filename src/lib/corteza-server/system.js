import System from './rest-api-client/system'

const { SystemAPI, CortezaSystemAPI, CrustSystemAPI } = window

const opt = {
  baseURL: SystemAPI || CortezaSystemAPI || CrustSystemAPI,
  jwt: localStorage.getItem('auth.jwt'),
}

export default new System(opt)
