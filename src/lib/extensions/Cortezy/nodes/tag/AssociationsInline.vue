<template>
  <transition name="fade">
    <span
      v-show="show"
      class="associations"
    >
      <div
        v-for="asc in associations"
        :key="asc"
        class="association"
        :class="asc"
        :style="style(asc)"
      />

    </span>
  </transition>
</template>

<script>
import { Association } from 'corteza-webapp-common/src/lib/extensions/Cortezy/types'

/**
 * This component should be used within node view to display what association
 * kinds are active. It does a nice little inline display
 */
export default {
  name: 'associations-inline',
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true,
    },
    associations: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  methods: {
    /**
     * Determines what color to use for given association kind
     * @param {String} kind Association's kind
     * @returns {String}
     */
    style (kind) {
      return {
        backgroundColor: Association.KIND_COLOR_CODE[kind],
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$asc-mark-line-height: 5px;

.associations {
  position: absolute;
  transform: translateY(-50%);
  line-height: $asc-mark-line-height;
  right: 0;

  .association {
    height: $asc-mark-line-height;
    width: $asc-mark-line-height;
    box-shadow: 0 0 1px #1e1d1da0;
    display: inline-block;
    margin-right: 2px;
    border-radius: 100%;

    &:last-of-type {
      margin-right: 0;
    }
  }
}

// Vue transition
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
