import Module from './module'
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

    this.module = Object.freeze(new Module(m))
    this.moduleID = PropCast(ID, this.module.moduleID)
    this.namespaceID = PropCast(ID, this.module.namespaceID)

    this[fields] = {}
    this.module.fields.forEach(({ name, isMulti, kind }) => {
      if (reservedFieldNames.includes(name)) {
        throw new Error('can not use reserved field name ' + name)
      }

      this[fields][name] = { isMulti, kind }
    })

    Object.freeze(this[fields])

    this[resetValues]()

    this.recordID = PropCast(ID, r.recordID)

    this.ownedBy = PropCast(ID, r.ownedBy)
    this.createdBy = PropCast(ID, r.createdBy)
    this.updatedBy = PropCast(ID, r.updatedBy)
    this.deletedBy = PropCast(ID, r.deletedBy)

    this.createdAt = PropCast(ISO8601, r.createdAt)
    this.updatedAt = PropCast(ISO8601, r.updatedAt)
    this.deletedAt = PropCast(ISO8601, r.deletedAt)

    if (r.values !== undefined) {
      this.setValues(r.values)
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

    for (let name in this.values) {
      if (!this.values.hasOwnProperty(name)) {
        continue
      }

      if (this[fields][name] === undefined) {
        continue
      }

      const { isMulti = false } = this[fields][name]

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
    if (Array.isArray(input)) {
      input.filter(({ name }) => this[fields][name] !== undefined).forEach(({ name, value }) => {
        const { isMulti = false } = this[fields][name]
        if (isMulti) {
          this.values[name].push(value)
        } else {
          this.values[name] = value
        }
      })
    } else if (typeof input === 'object') {
      const values = (input instanceof Record) ? input.values : input

      for (let p in input) {
        this.values[p] = values[p]
      }
    } else {
      throw Error('expecting array of values')
    }
  }

  isValid () {
    return this.module.fields
      .map(f => f.validate(this.values[f.name]).length === 0)
      .filter(v => !v).length === 0
  }
}
