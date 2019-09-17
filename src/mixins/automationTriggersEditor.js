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
    enableByIndex (resource, event, condition, index) {
      let t = this.triggers.filter(({ resource: r, event: e }) => r === resource && e === event)[index]

      if (!t) {
        // Trigger not found, make new
        this.$emit('update:triggers', [...this.triggers, new AutomationTrigger({
          condition,
          event,
          resource,
          enabled: true,
        })])
      } else {
        t.merge({
          condition,
          event,
          resource,
          enabled: true,
        })

        this.$emit('update:triggers', this.triggers)
      }
    },

    removeByIndex (resource, event, index) {
      let ctr = -1
      let rm = -1
      this.triggers.forEach(({ resource: r, event: e }, i) => {
        if (r === resource && e === event) {
          ctr++
          if (ctr === index) {
            rm = i
          }
        }
      })
      if (rm <= -1) {
        return
      }

      this.$emit('update:triggers', [
        ...this.triggers.slice(0, rm),
        ...this.triggers.slice(rm + 1),
      ])
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
