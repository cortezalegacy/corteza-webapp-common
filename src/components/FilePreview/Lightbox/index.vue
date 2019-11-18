<template>
  <lightbox v-on="$listeners">
    <!-- Proxy slots -->
    <template
      v-for="(_, slot) of $scopedSlots"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
        v-on="$listeners"
      />
    </template>

    <component
      :is="previewType"
      slot="main"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </lightbox>
</template>

<script>
import { IMG, PDF } from './types'
import Lightbox from '../../Lightbox'
import Base from '../Base'

export default {
  components: {
    Lightbox,
    IMG,
    PDF,
  },

  extends: Base,
}
</script>
