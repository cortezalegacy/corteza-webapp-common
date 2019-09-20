<template>
  <b-form-group :label="label">
    <b-form-select v-model="cValue"
                   class="d-inline w-50"
                   :options="cOptions"></b-form-select>

    <b-form-input v-if="!simple"
                  type="text"
                  class="d-inline w-50"
                  v-model="cValue" />

  </b-form-group>
</template>
<script>
import base from './base'

export default {
  extends: base,

  props: {
    simple: Boolean,
    options: {
      type: Array,
      default: () => [],
    },
    optionsAppend: {
      type: Array,
      default: () => [],
    },
  },

  data () {
    return {
      intervalOptions: [
        // @todo somehow add to i18
        { text: 'Every Minute', value: '0 * * * * * *' },
      ],
    }
  },

  computed: {
    cOptions () {
      if (this.options.length) {
        return this.options
      }

      return this.intervalOptions.concat(this.optionsAppend)
    },

    cValue: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      },
    },
  },
}
</script>
