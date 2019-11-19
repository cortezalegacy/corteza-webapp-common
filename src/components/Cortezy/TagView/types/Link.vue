<template>
  <div
    :style="genStyle"
    class="association-edit"
  >
    <h3>Link</h3>
    <div
      v-for="(e, i) of entries"
      :key="i"
      class="location-entry"
    >
      <input
        v-model="e.value"
        type="text"
        @change="emtTagUpdate"
      >
    </div>

    <button @click="addEntry">
      +
    </button>
  </div>
</template>

<script>
import base from './base'

export default {
  extends: base,
}
</script>
