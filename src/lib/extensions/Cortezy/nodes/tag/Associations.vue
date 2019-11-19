<template>
  <div class="associations">
    <button
      v-for="asc of associations"
      :key="asc"
      class="association"
      :class="getClass(asc)"
      :style="getStyle(asc)"
      @mousedown.stop.prevent="onClick(asc)"
    >
      <font-awesome-icon :icon="icon(asc)" />
    </button>
  </div>
</template>

<script>
import { Association } from '../../types'

/**
 * This component should be used within a tooltip to show available
 * associations and show what associations are active.
 */
export default {
  name: 'associations',
  props: {
    associations: {
      type: Array,
      required: true,
      default: () => [],
    },
    selection: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  methods: {
    /**
     * Determines if given association kind is active
     * @param {String} kind Association's kind
     * @returns {Boolean}
     */
    isActive (kind) {
      return this.selection.includes(kind)
    },

    /**
     * Determines what icon should be used for a given association
     * @param {String} kind Association's kind
     * @returns {String|undefined}
     */
    icon (kind) {
      switch (kind) {
        case Association.KIND_LOCATION:
          return 'map-marker'
        case Association.KIND_LINK:
          return 'angle-right'
        case Association.KIND_USER:
          return 'user'
        case Association.KIND_TIME:
          return ['far', 'clock']
        case Association.KIND_FILE:
          return 'file'
      }
    },

    getClass (kind) {
      return {
        active: this.isActive(kind),
      }
    },

    getStyle (kind) {
      return {
        color: Association.KIND_COLOR_CODE[kind],
      }
    },

    onClick (asc) {
      this.$emit('associate', { kind: asc, active: !this.isActive(asc) })
    },
  },
}
</script>

<style lang="scss" scoped>
.association {
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color .3s;
  margin: 0 2px;
  font-size: 10px;
  border-radius: 4px;
  outline: none;
  width: 15px;
  height: 15px;
  padding: 0;

  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-left: 0;
  }

  &:hover {
    background-color: #1e1e1e15;
    border-radius: 4px;
  }

  &.active {
    background-color: #00800035;
  }
}

</style>
