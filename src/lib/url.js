import qs from 'qs'

const baseQsConfig = {
  arrayFormat: 'brackets',
  encode: false,
}

export function make ({ url = '', query = {}, hash, ref = window.location.toString(), config = {} }) {
  let u
  if (/^http(s)?:\/\//.test(url)) {
    u = new URL(url)
  } else if (/^\/\//.test(url)) {
    u = new URL(ref)
    u.href = `${u.protocol}${url}`
  } else {
    // Construct full relative URL from path
    u = new URL(ref)
    u.pathname = url
  }

  if (hash) {
    u.hash = hash
  }

  u.search = qs.stringify(query, {
    ...baseQsConfig,
    ...config,
  })

  return u.toString()
}
