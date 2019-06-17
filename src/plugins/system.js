import SystemAPI from '../lib/corteza-server/system.js'

export default {
  install (Vue) {
    Vue.prototype.$SystemAPI = SystemAPI
  },
}
