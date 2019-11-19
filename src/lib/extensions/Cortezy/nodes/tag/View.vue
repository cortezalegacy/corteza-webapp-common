<script>
import AssociationsInline from './AssociationsInline'
import Associations from './Associations'
import { TippyComponent } from 'vue-tippy'

/**
 * Component defines a view component for Tag node.
 * It displays the given tag, it's associations and provides an interface
 * to manage associations.
 */
export default {
  components: {
    AssociationsInline,
    Associations,
    tippy: TippyComponent,
  },

  props: {
    node: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    options: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    updateAttrs: {
      type: Function,
      default: () => {},
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data () {
    return {
      // Tells if inline associations should be shown
      showInline: true,
    }
  },

  methods: {
    onShow () {
      this.toggleAsc(false)
      this.options.onManage(this.node)
    },

    /**
     * Helper method to toggle inline associations display
     * @param {Boolean} s Is shown
     */
    toggleAsc (s) {
      this.showInline = s
    },
  },

  render (ce) {
    // Helper to create/update an association
    const onAssociate = (e) => {
      let associations = this.node.attrs.associations

      // Create/update
      if (e.active) {
        associations = associations.concat([ e.kind ])
      } else {
        associations = associations.filter(k => k !== e.kind)
      }

      this.updateAttrs({ ...this.node.attrs, associations })
    }

    // Available associations
    const ascs = this.options.associations()

    return (
      <tippy
        placement="top"
        hideOnClick="false"
        delay={[0, 500]}
        interactive="true"
        boundary="viewport"
        theme="light"
        onShow={() => this.onShow()}
        onHide={() => this.toggleAsc(true)}>

        <template slot="trigger">
          <span class="tag" data-associations={this.node.attrs.associations}>
            <associations-inline associations={this.node.attrs.associations} show={this.showInline} />
            {this.node.attrs.label}
          </span>
        </template>

        <associations associations={ascs} selection={this.node.attrs.associations} onAssociate={onAssociate} />
      </tippy>
    )
  },
}
</script>

<style lang="scss" scoped>
.tag {
  border-radius: 4px;
  padding: 2px 0;
  background-color: #ECECED;
  position: relative;
}
</style>
