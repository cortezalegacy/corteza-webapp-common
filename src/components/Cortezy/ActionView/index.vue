<template>
  <div>
    <component
      :is="component"
      v-bind="action"
      />

      <button @click="createAction">
        Create
      </button>
  </div>
</template>

<script>
import * as types from './types'
import { ActionPayload } from 'corteza-webapp-common/src/lib/extensions/Cortezy/types'

export default {
  props: {
    action: {
      type: ActionPayload,
      required: true,
      default: undefined,
    },
  },

  computed: {
    component () {
      return types[this.action.action.kind]
    }
  },

  methods: {
    createAction () {
      console.log('act.create', this.action)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}

.association-remove {
  position: absolute;
  right: 0;
  top: 0;
}

</style>
