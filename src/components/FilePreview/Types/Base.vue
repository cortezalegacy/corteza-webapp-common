<script>
export default {
  props: {
    src: {
      required: true,
      default: null,
    },

    mime: {
      required: false,
      default: undefined,
    },

    meta: {
      type: Object,
      default: () => ({}),
    },

    name: {
      required: false,
      default: null,
    },

    previewStyle: {
      required: false,
      default: () => ({}),
    },

    previewClass: {
      required: false,
      default: () => [],
    },

    inline: {
      type: Boolean,
      default: false,
    },
  },
}

</script>
