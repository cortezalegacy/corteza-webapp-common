<template>
  <div>
    <div>
      <img :key="src" :src="src" :title="title" :alt="alt" :class="previewClass" :style="previewStyle">
    </div>
  </div>
</template>

<script>
import props from '../props'

export default {
  mixins: [ props ],
}
</script>

<style scoped>
div {
  margin: 20px auto;
  text-align: center;
  object-fit: contain;
  max-width: 500px;
}
div > div {
  margin: 0 20px;
}
img {
  box-shadow: 0 0 3px #1E1E1E41;
  box-sizing: border-box;
  max-width: 100%;
}
</style>
