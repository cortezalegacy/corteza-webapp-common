<script>
import { Association, AssociationEntry } from 'corteza-webapp-common/src/lib/extensions/Cortezy/types'

/**
 * Defines base functionality for association managers
 */
export default {
  props: {
    association: {
      type: Association,
      required: true,
      default: undefined,
    },
  },

  computed: {
    /**
     * Helper to provide association's entries
     * @returns {Array<AssociationEntry>}
     */
    entries () {
      return this.association.entries
    },

    /**
     * Helper to generate a style based on association's kind
     * @returns {Object}
     */
    genStyle () {
      return {
        'border-color': Association.KIND_COLOR_CODE[this.association.kind],
        'background-color': `${Association.KIND_COLOR_CODE[this.association.kind]}10`,
      }
    },
  },

  methods: {
    /**
     * Helper to add a new association entry
     */
    addEntry () {
      this.association.entries.push(new AssociationEntry({}))
      this.emtTagUpdate()
    },

    /**
     * Helper to remove an association entry
     * @param {Number} i Index
     */
    removeEntry (i) {
      this.association.entries.splice(i, 1)
      this.emtTagUpdate()
    },

    /**
     * Helper to emit tag entry update
     */
    emtTagUpdate () {
      this.$emit('entryUpdate', this.association)
    },
  },
}
</script>

<style lang="scss" scoped>
.association-edit {
  border-left: 5px solid transparent;
  padding: 7px 5px;
  margin-bottom: 7px;
}

</style>
