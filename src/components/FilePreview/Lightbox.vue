<template>
  <div class="lightbox">
    <header>
      <div class="left">
        <slot name="header.left"></slot>
      </div>
      <div class="right">
        <slot name="header.right"></slot>
        <button class="closer" @click="$emit('close')">&times;</button>
      </div>
    </header>
    <main :class="getClass">
      <component
        :is="previewType"
        v-on="$listeners"
        v-bind="$props" />

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
        this.$emit('preview.unavailable', { type })
      } else {
        return component
      }
    },
    getClass () {
      if (this.previewType === 'IMG') {
        return [ 'no-scroll' ]
      }
    },
  }
}
</script>

<style scoped>
.lightbox {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  /* $mainbgcolor      : #EEF1F3; */
  background-color: #EEF1F3;
  z-index: 2000;
}

.lightbox header {
  display: flex;
  justify-content: space-between;
  /* $appcream  : #F3F3F5; */
  background-color: #FFFFFF;
  box-shadow: 0 0px 5px #FFFFFF;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  box-shadow: 0 0 3px #1E1E1E41;
  z-index: 1000;
  height: 50px;
}

.lightbox header .left {
  margin-left: 10px;
}
.lightbox header .right {
  margin-right: 10px;
}

.lightbox header > div {
  display: flex;
  align-items: center;
}

.lightbox main {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  z-index: 1;
}

.lightbox main.no-scroll {
  overflow: unset;
}

.lightbox header button {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
  cursor: pointer;
  height: 30px;
  box-sizing: border-box;
}

.lightbox header button:last-of-type {
  margin-right: 0;
}

</style>
