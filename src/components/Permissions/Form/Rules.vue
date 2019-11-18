<template>
  <b-container>
    <rule
      v-for="p in rules"
      :key="p.resource + p.operation"
      v-bind="p"
      @update="onUpdate"
    />
  </b-container>
</template>

<script>
import Rule from './Rule'

export default {
  components: {
    Rule,
  },

  props: {
    rules: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onUpdate ({ resource, operation, access }) {
      let rr = this.rules
      let ri = rr.findIndex(r => r.resource === resource && r.operation === operation)
      if (ri > -1) {
        rr[ri].access = access
        this.$emit('update:rules', rr)
      }
    },
  },
}
</script>
