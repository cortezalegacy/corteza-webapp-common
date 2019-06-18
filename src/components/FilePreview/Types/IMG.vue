<template>
  <div :class="{ inline }">
    <div :class="{ inline }">
      <img ref="image" @click="$emit('openPreview', {})" :key="src" :src="src" :title="title" :alt="alt" :class="getClass" :style="previewStyle" @error.once="reloadBrokenImage" @load="loaded=true">
    </div>
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
      window.setTimeout(() => {
        ev.target.src = ev.target.src
      }, 500)
    },
  },
}
</script>

<style scoped>
div {
  margin: 0 auto;
  object-fit: contain;
}
div:not(.inline) {
  margin: 20px auto;
  max-width: 500px;
}
div:not(.inline) > div {
  margin: 0 20px;
}
img {
  box-shadow: 0 0 3px #1E1E1E41;
  box-sizing: border-box;
}
div.inline img {
  width: 100%;
}
div:not(.inline) img {
  max-width: 100%;
}

div.inline img {
  cursor: zoom-in;
}
img.loaded {
  width: 100%;
  height: 100%;
}
</style>
