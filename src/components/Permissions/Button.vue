<template>
    <a v-if="link" class="pointer" @click="onClick">
      <font-awesome-icon :icon="['fas', 'lock']"></font-awesome-icon>
    </a>
    <b-button v-else @click="onClick" :variant="buttonVariant">
      <slot><font-awesome-icon :icon="['fas', 'lock']"></font-awesome-icon></slot>
    </b-button>
</template>
<script>
import { modalOpenEventName } from './def'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faLock)

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
<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>
