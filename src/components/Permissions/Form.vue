<template>
  <b-form  @submit.prevent="onSubmit">
    <b-row>
      <b-col class="role-list" cols="3">
        <b-list-group>
          <b-list-group-item
            button
            v-for="r in roles" :key="r.roleID"
            :active="r.roleID === currentRoleID"
            active-class="info"
            variant="outline-info"
            @click="onRoleChange(r)" >

            {{ r.name || r.handle || r.roleID || $t('role.unnamed') }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col class="rule-list" cols="9">
        <rules :rules.sync="rules" />
      </b-col>
    </b-row>
    <b-row class="footer">
      <b-col class="rule-list text-right" cols="9" offset="3">
        <b-button type="submit" variant="primary" :disabled="disabled">
          {{ $t('permission.saveChanges') }}
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>
<script>
import Rules from './Form/Rules'

export default {
  components: {
    Rules,
  },

  props: {
    resource: {
      type: String,
      required: true,
    },

    target: {
      type: String,
      required: false,
    },

    backendServiceName: {
      type: String,
      default () {
        // Assuming backend service will
        // be equal to (first part of) resource
        return this.resource.split(':')[0]
      },
    },
  },

  data () {
    return {
      processing: false,

      // List of available permissions (for a specific resource)
      permissions: [],

      // List of rules for the current role
      rules: [],

      // List of all available roles
      roles: [],

      // ID of the current role
      currentRoleID: undefined,
    }
  },

  computed: {
    dirty () {
      return this.collectChangedRules().length > 0
    },

    disabled () {
      return !this.dirty
    },

    api () {
      return this['$' + this.backendServiceName]
    },
  },

  created () {
    this.fetchPermissions()
    this.fetchRoles()
  },

  methods: {
    onRoleChange ({ roleID }) {
      this.currentRoleID = roleID
      this.fetchRules(roleID)
    },

    onSubmit () {
      this.processing = true
      const rules = this.collectChangedRules()
      const roleID = this.currentRoleID

      this.api.permissionsUpdate({ roleID, rules }).then((rules) => {
        this.fetchRules(this.currentRoleID)
        this.processing = false
      })
    },

    async fetchPermissions () {
      // clean loaded rules
      this.rules = []
      this.permissions = []
      this.processing = true

      return this.api.permissionsList().then((pp) => {
        this.permissions = this.filterPermissions(pp)
        this.processing = false
      })
    },

    async fetchRules (roleID) {
      this.processing = true
      return this.api.permissionsRead({ roleID }).then((rules) => {
        this.rules = this.normalizeRules(rules)
        this.processing = false
      })
    },

    async fetchRoles () {
      this.processing = true
      // Roles are always fetched from $system.
      return this.$system.roleList().then(rr => {
        this.roles = rr.sort((a, b) => a.roleID.localeCompare(b.roleID))

        if (rr.length > 0) {
          this.onRoleChange(rr[0])
        }
        this.processing = false
      })
    },

    normalizeRules (rr) {
      // merges roleRules (subset) with list of all permissions
      const findCurrent = ({ resource, operation }) => {
        return (rr.find(r => r.resource === resource && r.operation === operation) || {}).access || 'inherit'
      }

      return this.permissions.map((p) => {
        const current = findCurrent(p)
        return { ...p, access: current, current }
      })
    },

    // Removes unneeded permissions (ones that do not match resource prop)
    // and translates the rest
    filterPermissions (pp) {
      let out = []
      const resourceType = this.resource.replace(/:(\d+|\*)$/, ':')
      const isService = !!resourceType.match(/[^:]$/)

      pp.forEach(({ resource, operation }) => {
        if (isService && resource !== resourceType) {
          // Test if service
          return
        }

        if (!isService && resource.indexOf(resourceType) !== 0) {
          // test if resource type
          return
        }

        // Describe, translate
        let p = this.describePermission({ resource, operation })

        // Now, override resource-type with the actual resource-ID
        p.operation = operation
        p.resource = this.resource

        out.push(p)
      })

      return out
    },

    collectChangedRules () {
      return this.rules.filter(r => r.access !== r.current).map(({ resource, operation, access }) => {
        return { resource, operation, access }
      })
    },

    describePermission ({ resource, operation }) {
      resource = resource.replace(/:/g, '-')
      operation = operation.replace(/\./g, '-')

      if (resource.slice(-1) === '-') {
        resource = resource.slice(0, -1)
      }

      const tString = `permission.${resource}.${operation}`
      let title = ''
      if (this.target) {
        title = this.$t(`${tString}.specific`, { target: this.target })
      } else {
        title = this.$t(`${tString}.title`)
      }

      return {
        title,
        description: this.$t(`${tString}.description`),
      }
    },
  },
}
</script>
