<template>
  <div class="inline">
    <main>
      <component
        :is="previewType"
        inline
        v-bind="$attrs"
        :max-pages="1"
        :initial-scale="2"
        v-on="$listeners"
      />
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
