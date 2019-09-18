<template>
  <span>
    <span v-if="!inConfirmation">
      <b-button pill
                :variant="variant"
                :size="size"
                @click.prevent="onPrompt"
                :disabled="disabled"
                :class="[ borderless && 'border-0' ]">

      <slot />
    </b-button>

    </span>
    <span v-else>
      <b-button pill
                :variant="variantOk"
                :size="sizeConfirm"
                class="mr-1"
                :class="[ borderless && 'border-0' ]"
                @click.prevent="onConfirmation()">

        <slot name="yes" />
      </b-button>
      <b-button pill
                :variant="variantCancel"
                :size="sizeConfirm"
                :class="[ borderless && 'border-0' ]"
                @click.prevent="inConfirmation=false">

        <slot name="no" />
      </b-button>
    </span>
  </span>
</template>
<script>
export default {
  props: {
    ctaClass: { type: String, default: 'btn-danger' },
    disabled: Boolean,
    noPrompt: Boolean,

    borderless: {
      type: Boolean,
      default: true,
    },
    variant: {
      type: String,
      default: 'outline-danger',
    },
    size: {
      type: String,
      default: 'sm',
    },
    variantOk: {
      type: String,
      default: 'danger',
    },
    variantCancel: {
      type: String,
      default: undefined,
    },
    sizeConfirm: {
      type: String,
      default: 'sm',
    },
  },

  data () {
    return {
      inConfirmation: false,
    }
  },

  computed: {
    btnClass () {
      if (this.disabled) {
        return 'btn-disabled'
      }

      return this.ctaClass
    },
  },

  methods: {
    onPrompt () {
      if (this.noPrompt) {
        this.$emit('confirmed')
      } else {
        this.inConfirmation = true
      }
    },

    onConfirmation () {
      this.inConfirmation = false
      this.$emit('confirmed')
    },
  },
}
</script>
