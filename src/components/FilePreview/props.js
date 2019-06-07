export default {
  props: {
    src: {
      required: true,
      default: null,
    },

    meta: {
      type: Object,
      default: () => ({}),
    },

    name: {
      required: false,
      default: null,
    },

    alt: {
      required: false,
      default: null,
    },

    title: {
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

    mime: {
      required: false,
      default: undefined,
    },

    maxPages: {
      required: false,
      default: 5,
    },

    initialScale: {
      required: false,
      default: 1,
    },

    inline: {
      type: Boolean,
      default: false,
    },
  },
}
