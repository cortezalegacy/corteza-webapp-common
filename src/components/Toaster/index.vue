<template>
  <div>
    <b-toast v-for="t in toasts"
             :key="t.id"
             visible
             v-bind="t.options || {}"
             :title="t.payload.title"
             :no-close-button="!t.actions.hide"
             @hide="t.actions.hide ? t.actions.hide.cb(t) : evtSink">

      <b-card header-bg-variant="transparent"
              bg-variant="transparent"
              border-variant="transparent"
              header-border-variant="transparent"
              footer-border-variant="transparent"
              body-border-variant="transparent"
              body-class="p-0">

        <b-card-text>
          {{ t.payload.notes }}
        </b-card-text>

        <b-button v-for="([name, act]) in extraActions(t)"
                  :key="name"
                  class="mr-1"
                  v-bind="act.options || {}"
                  @click="act.cb || evtSink">

          {{ act.label }}
        </b-button>
      </b-card>
    </b-toast>
  </div>
</template>

<script>
export default {
  props: {
    toasts: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  methods: {
    extraActions ({ actions = {} }) {
      const { hide, ...act } = actions
      return Object.entries(act)
    },

    evtSink () {},
  },
}
</script>

<style scoped lang="scss">
// @note Couldn't get this bootstrap prop to work, so here it is for now.
.border-transparent {
  border-color: transparent!important;
}
</style>
