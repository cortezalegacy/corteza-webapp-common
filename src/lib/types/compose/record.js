// import Module from './module'
import { ComposeObject } from './common'
import { ID, ISO8601, PropCast } from '../common'

const fields = Symbol('moduleFieldIndex')
const resetValues = Symbol('resetValues')
const hooks = Symbol('hooks')

const reservedFieldNames = [
  'toJSON',
]

// Record class
export default class Record extends ComposeObject {
  constructor (m, r = {}) {
    super()

    this[hooks] = []

    if (m instanceof Record) {
      // Trying to copy a record
      r = { ...m }
      m = r.module
    }

    // this is a temp solution that works around dual-module system we have (common + compose)
    // @todo when we migrate to common's module, enable freeze w/ typed Module and remove freeze w/ { ...m }
    // this.module = Object.freeze(new Module(m))
    this.module = Object.freeze({ ...m })

    if (!this.module) {
      throw new Error('invalid module used to initialize a record')
    } else if (!this.module.fields || !Array.isArray(this.module.fields) || this.module.fields.length === 0) {
      throw new Error('module used to initialize a record does not contain any fields')
    }

    this.moduleID = PropCast(ID, this.module.moduleID)
    this.namespaceID = PropCast(ID, this.module.namespaceID)

    this[fields] = {}
    this.module.fields.forEach(({ name, isMulti, kind, defaultValue }) => {
      if (reservedFieldNames.includes(name)) {
        throw new Error('can not use reserved field name ' + name)
      }

      this[fields][name] = { isMulti, kind }
    })

    Object.freeze(this[fields])

    this[resetValues]()
    this.compareToValues = {}

    this.recordID = PropCast(ID, r.recordID)

    this.ownedBy = PropCast(ID, r.ownedBy)
    this.createdBy = PropCast(ID, r.createdBy)
    this.updatedBy = PropCast(ID, r.updatedBy)
    this.deletedBy = PropCast(ID, r.deletedBy)

    this.createdAt = PropCast(ISO8601, r.createdAt)
    this.updatedAt = PropCast(ISO8601, r.updatedAt)
    this.deletedAt = PropCast(ISO8601, r.deletedAt)

    if (r.values !== undefined) {
      this.prepareValues(r.values, this.values)
      this.prepareValues(r.values, this.compareToValues)
    }
  }

  [resetValues] () {
    let values = {
      toJSON: () => {
        // Remove unneeded properties
        return this.serializeValues()
      },
    }

    this.module.fields.forEach(({ name, isMulti, kind }) => {
      values[name] = isMulti ? [] : undefined
    })

    this.values = values
  }

  serializeValues () {
    let arr = []
    // console.log({
    //   entries: Object.entries(this[fields]),
    //   fields: this[fields],
    //   values: this.values,
    // })
    for (let [name, { isMulti = false }] of Object.entries(this[fields])) {
      if (!this.values.hasOwnProperty(name)) {
        continue
      }

      if (isMulti) {
        if (Array.isArray(this.values[name])) {
          for (let i = 0; i < this.values[name].length; i++) {
            if (this.values[name][i] !== undefined) {
              arr.push({ name, value: this.values[name][i].toString() })
            }
          }
        }
      } else if (this.values[name] !== undefined) {
        arr.push({ name, value: this.values[name].toString() })
      }
    }

    return arr
  }

  setValues (input = []) {
    this.prepareValues(input, this.values)
  }

  /**
   * Updates record's values object with provided input
   * @param {Array|Object} input Values to use
   * @param {Object} values Record's values object to update
   */
  prepareValues (input = [], values = this.values) {
    if (Array.isArray(input)) {
      input.filter(({ name }) => this[fields][name] !== undefined && !reservedFieldNames.includes(name)).forEach(({ name, value }) => {
        const { isMulti = false } = this[fields][name]
        if (isMulti) {
          if (!Array.isArray(values[name])) {
            values[name] = []
          }
          values[name].push(value)
        } else {
          values[name] = value
        }
      })
    } else if (typeof input === 'object') {
      const vv = (input instanceof Record) ? input.values : input

      for (let p in input) {
        if (!reservedFieldNames.includes(p)) {
          values[p] = vv[p]
        }
      }
    } else {
      throw Error('expecting array of values')
    }
  }

  isValid () {
    return this.module.fields
      .map(f => f.validate(this.values[f.name], this.compareToValues[f.name]).length === 0)
      .filter(v => !v).length === 0
  }
}
