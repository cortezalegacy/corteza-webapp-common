import MessagingAPI from '../lib/corteza-server/messaging.js'

export default {
  install (Vue) {
    Vue.prototype.$MessagingAPI = MessagingAPI
  },
}
