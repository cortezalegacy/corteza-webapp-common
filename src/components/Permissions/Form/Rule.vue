<template>
  <b-row no-gutters class="mb-1">
    <b-col cols="4">
      <access :access="access"
              :current="current"
              :enabled="enabled"
              @update="onUpdate" />

      <b-button
        variant="link"
        @click="onReset"
        v-show="isChanged">
        {{ $t('permission.resetBack', {current}) }}
      </b-button>
    </b-col>
    <b-col cols="8" class="mb-4">
      <b v-html="title || `${operation} on ${resource}`"/>
      <div>{{ description || '&nbsp;' }}</div>
    </b-col>
  </b-row>
</template>

<script>
import Access from './Access'

export default {
  components: {
    Access,
  },

  props: {
    resource: {
      type: String,
      required: true,
    },

    operation: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },

    enabled: {
      type: Boolean,
      default: true,
    },

    access: {
      type: String,
      required: false,
      default: 'inherit',
    },

    current: {
      type: String,
      required: false,
      default: 'inherit',
    },
  },

  computed: {
    isChanged () {
      return this.access !== this.current
    },
  },

  methods: {
    onUpdate (access) {
      console.log('Updating rule to', this.current)
      this.emit(access)
    },

    onReset () {
      console.log('Resetting rule to', this.current)
      this.emit(this.current)
    },

    emit (access) {
      this.$emit('update', {
        resource: this.resource,
        operation: this.operation,
        access,
      })
    },
  },
}
</script>
