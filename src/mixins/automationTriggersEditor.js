import AutomationTrigger from '../lib/types/shared/automation-trigger'

function key (res, ev, c) {
  return `${res} ${ev} ${c}`
}

/**
 * Automation Triggers Editor mixin helps automation triggers editing
 *
 * Provides trigger index for fast lookus and methods for checking and enabling
 * triggers
 *
 * Example:
 *    <b-form-checkbox
 *      :checked="isValid(resource, ev, m.moduleID)"
 *      @change="enable(resource, ev, m.moduleID)" />
 */
export default {
  computed: {
    index () {
      // lookup index (<event+condition>:<trigger pos>)
      return this.triggers.reduce((index, t) => {
        let { resource, event, condition } = t
        index[key(resource, event, condition)] = t
        return index
      }, {})
    },
  },

  methods: {
    isValid (resource, event, condition) {
      let t = this.index[key(resource, event, condition)]

      return t && t.isValid()
    },

    // @todo add tests & refactor all below methods
    setByIndex (resource, event, condition, index, enabled = true) {
      let t = this.triggers.filter(({ resource: r, event: e, enabled: en }) =>
        en && r === resource && e === event)[index]

      if (!t) {
        if (!enabled) {
          return
        }
        // Trigger not found, make new
        this.$emit('update:triggers', [...this.triggers, new AutomationTrigger({
          condition,
          event,
          resource,
          enabled,
        })])
        return
      }

      t.merge({
        event,
        resource,
        enabled,
        condition,
      })

      this.$emit('update:triggers', this.triggers)
    },

    enableByIndex (resource, event, condition, index) {
      this.setByIndex(resource, event, condition, index, true)
    },

    disableByIndex (resource, event, index) {
      this.setByIndex(resource, event, undefined, index, false)
    },

    enable (resource, event, condition) {
      let t = this.index[key(resource, event, condition)]

      if (!t) {
        // Trigger not found, make new
        this.$emit('update:triggers', [...this.triggers, new AutomationTrigger({
          condition,
          event,
          resource,
          enabled: true,
        })])
      } else {
        // Toggle enabled status
        t.enabled = !t.enabled

        this.$emit('update:triggers', this.triggers)
      }
    },
  },
}
