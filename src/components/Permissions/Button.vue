<template>
    <a v-if="link" class="action" @click="onClick">
      <i class="icon-fatlock" />
    </a>
    <b-button v-else @click="onClick" :variant="buttonVariant">
      <slot><i class="action icon-fatlock" /></slot>
    </b-button>
</template>
<script>
import { modalOpenEventName } from './def'

export default {
  props: {
    link: {
      type: Boolean,
    },

    buttonVariant: {
      type: String,
    },

    resource: {
      type: String,
      required: true,
    },

    title: {
      type: String,
    },

    modalOpenEvent: {
      type: String,
      default: modalOpenEventName,
    },
  },

  methods: {
    onClick () {
      this.$root.$emit(this.modalOpenEvent, {
        resource: this.resource,
        title: this.title,
      })
    },
  },
}
</script>
