<template>
  <div>
    <b-modal
      v-model="showModal"
      hide-footer
      size="xl"
      @hide="onHide"
      :title="title"
      lazy>
      <permissions-form v-if="resource" :resource="resource" />
    </b-modal>
  </div>
</template>
<script>
import { modalOpenEventName } from './def'
import PermissionsForm from './Form.vue'

export default {
  name: 'permissions-modal',

  components: {
    PermissionsForm,
  },

  data () {
    return {
      resource: undefined,
      title: undefined,
    }
  },

  computed: {
    showModal: {
      get () {
        return !!this.resource
      },

      set (open) {
        if (!open) {
          this.clear()
        }
      },
    },
  },

  mounted () {
    this.$root.$on(modalOpenEventName, ({ resource, title }) => {
      this.resource = resource
      this.title = title
    })
  },

  destroyed () {
    this.$root.$off(modalOpenEventName)
  },

  methods: {
    onHide () {
      this.clear()
    },

    clear () {
      this.resource = undefined
      this.title = undefined
    },
  },
}
</script>
