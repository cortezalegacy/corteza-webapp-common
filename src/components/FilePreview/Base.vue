<script>
import { getComponent } from './'

export default {
  inheritAttrs: false,

  computed: {
    previewType () {
      const component = getComponent({ type: this.$attrs.mime, src: this.$attrs.src, name: this.$attrs.name })
      if (!component) {
        this.$emit('previewUnavailable', { type: this.$attrs.mime })
      } else {
        return component
      }
    },
  },
}
</script>
