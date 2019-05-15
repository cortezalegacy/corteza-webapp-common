<template>
  <b-form-radio-group buttons
                      v-model="selected"
                      :disabled="!enabled"
                      :button-variant="variant"
                      :options="permissionOptions" />
</template>

<script>
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },

    access: {
      type: String,
      required: false,
    },

    current: {
      type: String,
      required: false,
    },
  },

  data () {
    return {
      permissionOptions: [
        { text: 'Allow', value: 'allow' },
        { text: 'Inherit', value: 'inherit' },
        { text: 'Deny', value: 'deny' },
      ],
    }
  },

  computed: {
    isChanged () {
      return this.selected !== this.current
    },

    variant () {
      return this.isChanged ? 'outline-warning' : 'outline-info'
    },

    selected: {
      get () {
        return this.access
      },

      set (sel) {
        if (this.access !== sel) {
          this.$emit('update', sel)
        }

        this.$emit('update:access', sel)
      },
    },
  },
}
</script>
