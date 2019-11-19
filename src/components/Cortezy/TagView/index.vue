<template>
  <div>
    <div
      v-for="({ association, component }, i) of associations"
      :key="i"
      class="container"
    >
      <component
        :is="component"
        class="association"
        :association="association"
        @entryUpdate="onEntryUpdate"
        v-on="$listeners"
      />

      <button
        class="association-remove"
        @click="removeAsc(association)"
      >
        -
      </button>
    </div>
  </div>
</template>

<script>
import * as types from './types'

export default {
  props: {
    value: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },

  computed: {
    /**
     * Provides a list of { association, component } objects
     * @returns {Array}
     */
    associations () {
      return (this.value.associations || [])
        .map(association => ({ association, component: types[association.kind] }))
        .filter(({ component }) => component)
    },
  },

  methods: {
    /**
     * Helper to proxy entry update to the data model
     */
    onEntryUpdate () {
      this.$emit('input', this.value)
    },

    /**
     * Helper to remove an association
     * @param {Association} asc Association to remove
     */
    removeAsc (asc) {
      const associations = this.value.associations.filter(a => a.kind !== asc.kind).map(({ kind }) => kind)
      this.value.update({ associations })
      this.$emit('input', this.value)
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
