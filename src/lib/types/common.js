const iso8601check = /^([\\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([\\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/

const uint64zeropad = '00000000000000000000'

export class CortezaObject {}

/**
 * Is native class?
 *
 * @param thing
 * @returns {boolean}
 */
function isNativeClass (thing) {
  return typeof thing === 'function' && thing.hasOwnProperty('prototype') && !thing.hasOwnProperty('arguments')
}

/**
 * Casts value to <type> or returns default
 *
 * @param {*} type
 * @param {*} value
 * @param {*} [def] default
 * @returns {*}
 */
export function PropCast (type, value, def = undefined) {
  if (value === undefined) {
    return def
  }

  return type(value)
}

/**
 * @return {string}
 */
export function ID (value) {
  if (typeof value === 'string' && /^\d*$/) {
    return value
  } else if (typeof value === 'number') {
    return String(value)
  } else if (typeof value === 'object' && value.toString) {
    return value.toString()
  } else {
    throw new Error('Invalid ID value')
  }
}

/**
 * @return {string}
 */
export function ISO8601 (value) {
  if (!value || !isISO8601(value)) {
    return undefined
  }

  value = String(value)
  return value
}

/**
 * @return {string}
 */
export function isISO8601 (value) {
  return iso8601check.test(value)
}

/**
 * @return {*}
 */
export function ArrayOf (Type) {
  return (vv) => vv.map(v => (isNativeClass(Type) ? new Type(v) : Type(v)))
}

/**
 * @return {string}
 */
export function makeIDSortable (ID) {
  // We're using uint64 for ID and JavaScript does not know how to handle this type
  // natively. We get the value from backend as string anyway and we need to prefix
  // it with '0' to ensure string sorting does what we need it to.
  return uint64zeropad.substr((ID || '').length) + (ID || '')
}
