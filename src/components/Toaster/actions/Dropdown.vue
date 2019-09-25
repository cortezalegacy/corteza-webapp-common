<template>
  <b-dropdown v-bind="options">
    <template v-slot:button-content>
      <span v-html="label" />
    </template>

    <component v-for="(opt, i) in options.items || []"
               :key="i"
               @click="$emit('action', opt.value)"
               v-bind="opt"
               :is="fromKind(opt)">

      <span v-html="opt.label" />
    </component>
  </b-dropdown>
</template>

<script>
import base from './base'

export default {
  extends: base,

  methods: {
    fromKind ({ kind }) {
      return `b-dropdown-${kind}`
    },
  },
}

</script>
