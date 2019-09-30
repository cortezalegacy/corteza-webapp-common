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
