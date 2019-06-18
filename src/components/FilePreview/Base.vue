<script>
import { PDF, IMG } from './Types'
import { getComponent } from '../../lib/file_preview'

export default {
  components: {
    PDF,
    IMG,
  },

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
