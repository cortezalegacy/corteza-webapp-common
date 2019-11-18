<template>
  <b-button
    v-bind="options"
    @click="$emit('action')"
  >
    <span v-html="label" />
  </b-button>
</template>

<script>
import base from './base'

export default {
  extends: base,
}
</script>
