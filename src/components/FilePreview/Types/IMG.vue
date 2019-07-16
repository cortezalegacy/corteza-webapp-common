<template>
  <div :class="{ inline }">
    <img ref="image" @click="$emit('openPreview', {})" :key="src" :src="src" :title="title" :alt="alt" :class="getClass" :style="previewStyle" @error.once="reloadBrokenImage" @load="loaded=true">
  </div>
</template>

<script>
import Base from './Base'

export default {
  extends: Base,

  props: {
    alt: {
      required: false,
      default: null,
    },
    title: {
      required: false,
      default: null,
    },
  },

  data () {
    return {
      loaded: false,
    }
  },

  computed: {
    getClass () {
      const rtr = [...this.previewClass]
      if (this.$listeners.click) {
        rtr.push('clickable')
      }
      if (this.loaded) {
        rtr.push('loaded')
      }
      return rtr
    },
  },

  created () {
    this.$nextTick(() => {
      this.$refs.image.width = this.meta.width
      this.$refs.image.height = this.meta.height
    })
  },

  methods: {
    reloadBrokenImage (ev) {
      if (ev.target && ev.target.src) {
        window.setTimeout(() => {
          ev.target.src = ev.target.src
        }, 500)
      }
    },
  },
}
</script>

<style scoped lang="scss">
div {
  margin: 0 auto;
  object-fit: contain;
  img {
    &.loaded {
      width: auto;
      height: auto;
      margin: 0 auto;
      display: block;
    }
  }
  &:not(.inline) {
    margin: 20px auto;
    img {
    }
  }
  &.inline {
    img {
      cursor: zoom-in;
    }
  }
}
</style>
