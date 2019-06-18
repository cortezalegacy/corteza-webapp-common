<template>
  <div class="inline">
    <main>
      <component
        inline
        :is="previewType"
        v-on="$listeners"
        v-bind="$props"
        :max-pages="1"
        :initial-scale="2" />

    </main>
  </div>
</template>

<script>
import props from './props'
import { PDF, IMG } from './Types'
import { getComponent } from '../../lib/filePreview'

export default {
  components: {
    PDF,
    IMG,
  },

  mixins: [ props ],

  computed: {
    previewType () {
      const component = getComponent({ type: this.mime, src: this.src, name: this.name })
      if (!component) {
        this.$emit('preview.unavailable', { type: this.mime })
      } else {
        return component
      }
    },
  },
}
</script>

<style scoped>
.inline {
  z-index: 1;
}

</style>
