export class Settings {
  constructor ({ api } = {}) {
    if (!api) {
      throw new Error('settings.noApi')
    }

    this.current = {}
    this.api = api
  }

  async init () {
    return this.api.settingsCurrent()
  }
}

export default {
  install (Vue, opts) {
    Vue.prototype.$Settings = new Settings(opts)
  },
}
