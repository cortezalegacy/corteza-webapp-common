<template>
  <div :class="{ inline }">
    <div :class="{ inline }">
      <img v-on="$listeners" :key="src" :src="src" :title="title" :alt="alt" :class="getClass" :style="previewStyle" @error.once="reloadBrokenImage">
    </div>
  </div>
</template>

<script>
import props from '../props'

export default {
  mixins: [ props ],

  methods: {
    reloadBrokenImage (ev) {
      window.setTimeout(() => {
        ev.target.src = ev.target.src
      }, 500)
    },
  },

  computed: {
    getClass () {
      const rtr = [...this.previewClass]
      if (this.$listeners.click) {
        return rtr.concat('clickable')
      }
      return rtr
    }
  }
}
</script>

<style scoped>
div {
  margin: 0 auto;
  text-align: center;
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

img.clickable {
  cursor: pointer;
}
</style>
