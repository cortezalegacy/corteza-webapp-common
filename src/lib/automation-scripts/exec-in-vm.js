import { NodeVM } from 'vm2'
import path from 'path'
import resultProcessor from './result-proc'
import { sharedContext } from './context'

export const allowedExternalModules = Object.freeze([
  'axios',
  'request',
  'lodash',
  'papaparse',
])

export default async (code, ctx = {}, opt = {}) => {
  return new Promise(async (resolve, reject) => {
    const {
      basedir = path.join(path.resolve(), 'node_modules'),
      async = false,
      timeout,
    } = opt

    if (async) {
      // Async call, resolve right away
      resolve()
    }

    ctx = sharedContext(ctx)

    try {
      const vm = new NodeVM({
        sandbox: ctx,

        // Disallow require()
        require: {
          external: {
            modules: allowedExternalModules,
          },
        },

        // timeout after ??
        timeout,

        // Allow console use
        console: opt.console || 'off',

        // No wrapper - we need the result
        // from the script
        wrapper: 'none',
      })

      resolve(resultProcessor(ctx, await vm.run(code, basedir)))
    } catch (e) {
      reject(e)
    }
  })
}
