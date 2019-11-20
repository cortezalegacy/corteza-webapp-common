<template>
  <div
    class="action-create"
  >
    <h3>Reminder</h3>
    <div
      class="fields"
    >
      <div class="field dt">
        <input
          v-model="getDate"
          type="date"
        >
        <input
          v-model="getTime"
          type="time"
        >
      </div>

      <input
        class="field"
        v-model="params.label"
        type="text"
      >

      <textarea
        class="field ta"
        v-model="params.note"
      />
    </div>
  </div>
</template>

<script>
import base from './base'
import moment from 'moment'

export default {
  extends: base,

  computed: {
    getDateTime () {
      if (!this.params.remindAt) {
        return
      }

      return moment(this.params.remindAt)
    },

    getDate: {
      get () {
        return this.getDateTime.format('YYYY-MM-DD')
      },
      set (d) {
        const dd = moment(d, 'YYYY-MM-DD')
        const b = (this.getDateTime || moment()).year(dd.year()).month(dd.month()).date(dd.date())
        this.params.remindAt = b.toISOString()
      }
    },

    getTime: {
      get () {
        return this.getDateTime.format('hh:mm:ss')
      },
      set (d) {
        const dd = moment(d, 'hh:mm:ss')
        const b = (this.getDateTime || moment()).hour(dd.hour()).minute(dd.minute()).second(dd.second())
        this.params.remindAt = b.toISOString()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.fields .field {
  width: 100%;
  margin-bottom: 7px;
  min-height: 30px;

  &.dt {
    display: inline-flex;
    input {
      flex-grow: 1;
    }
  }

  &.ta {
    min-height: 100px;
    resize: vertical;
  }
}

</style>
