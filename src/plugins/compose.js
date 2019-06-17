import ComposeAPI from '../lib/corteza-server/compose.js'

export default {
  install (Vue) {
    Vue.prototype.$ComposeAPI = ComposeAPI
  },
}
