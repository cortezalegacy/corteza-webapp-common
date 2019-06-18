import System from './rest-api-client/system.js'

const { SystemAPI, CortezaSystemAPI, CrustSystemAPI } = window
const baseURL = SystemAPI || CortezaSystemAPI || CrustSystemAPI

export default new System({ baseURL })
