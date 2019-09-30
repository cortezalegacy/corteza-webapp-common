<template>
  <div>
    <a v-if="link.href"
       v-bind="link"
       v-html="linkLabel" />

    <router-link v-else-if="routerLink"
                 v-bind="link"
                 :to="routerLink">

      <span v-html="linkLabel" />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      default: null,
    },
    resource: {
      type: String,
    },
  },

  computed: {
    routerLink () {
      if (!this.resource) {
        return
      }

      if (this.resource.toLowerCase().startsWith('compose:record:')) {
        const recordID = this.resource.split(':')[2]
        if (!recordID) {
          return
        }

        return {
          name: 'page.record',
          params: {
            slug: this.link.namespaceSlug,
            pageID: this.link.pageID,
            recordID,
          },
        }
      }
    },

    linkLabel () {
      return this.link.label || this.link.href || this.fallbackLabel(this.resource)
    },
  },

  methods: {
    fallbackLabel (resource = '') {
      if (resource.toLowerCase().startsWith('compose:record')) {
        return 'Record View'
      }
      return 'Link'
    },
  },
}
</script>
