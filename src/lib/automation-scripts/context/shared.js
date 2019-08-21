/**
 * Extracts ID-like (numeric) value from string or object
 *
 * @ignore
 * @param {string|Object} value
 * @param key
 * @returns {*}
 */
export function extractID (value, key) {
  if (typeof value === 'object') {
    value = value[key]
  }

  if (typeof value === 'number') {
    return String(value)
  }

  if (typeof value !== 'string') {
    throw Error(`unexpected value type for ${key} type (got '${typeof value}', expecting string)`)
  }

  if (!/^[0-9]+$/.test(value)) {
    throw Error(`unexpected value format for ${key} type (got '${value}', expecting digits)`)
  }

  return value
}
