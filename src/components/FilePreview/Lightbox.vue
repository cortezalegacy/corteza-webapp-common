<template>
  <lightbox v-on="$listeners">
    <!-- Proxy slots -->
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" v-on="$listeners"/>
    </template>

    <component
      slot="main"
      :class="getClass"
      :is="previewType"
      v-on="$listeners"
      v-bind="$attrs" />

  </lightbox>
</template>

<script>
import Lightbox from '../Lightbox'
import Base from './Base'

export default {
  components: {
    Lightbox,
  },

  extends: Base,
  inheritAttrs: false,

  computed: {
    getClass () {
      if (this.previewType === 'IMG') {
        return [ 'no-scroll' ]
      }
    },
  },
}
</script>
