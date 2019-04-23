import Auth from './../lib/auth'

export default {
  install (Vue) {
    Vue.prototype.$auth = new Auth()
  },
}
