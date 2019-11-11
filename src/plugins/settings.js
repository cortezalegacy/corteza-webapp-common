export default {
  install (Vue, { api }) {
    Vue.prototype.$Settings = {
      get({ key }) {
        return api.settingsGet({ key })
      },

      list({ prefix }) {
        return api.settingsList({ prefix })
      }
    }
  },
}
