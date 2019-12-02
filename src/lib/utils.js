import mime from 'mime-types'

/**
 * Non-blocking timeout for t time; useful for pooling and such.
 * @param {Number} t Time in ms
 */
export async function sleep (t) {
  return new Promise(resolve => setTimeout(resolve, t))
}

export function intervalToMS (from, to) {
  if (!from || !to) {
    throw new Error('intervalToMS.invalidArgs')
  }
  return to.diff(from)
}

/**
 * Checks if given file
 * @param {String} fileName File in question
 * @param {Array<String>} accepted Array of accepted mime types
 * @returns {Boolean} If this file is acceptable
 */
export function validateFileType (fileName = '', accepted = ['*/*']) {
  const t = mime.lookup(fileName)
  return !!accepted.find(at => {
    at = at.split('/')
    at[0] = at[0] === '*' ? '.*?' : at[0]
    at[1] = at[1] === '*' ? '.*?' : at[1]
    return (new RegExp(at.join('\\/'))).exec(t)
  })
}
