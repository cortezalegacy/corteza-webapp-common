<template>
  <div class="inline">
    <main>
      <component
        inline
        :is="previewType"
        v-on="$listeners"
        v-bind="$attrs"
        :max-pages="1"
        :initial-scale="2" />

    </main>
  </div>
</template>

<script>
import { IMG, PDF } from './types'
import Base from '../Base'

export default {
  components: {
    IMG,
    PDF,
  },

  extends: Base,
}
</script>
