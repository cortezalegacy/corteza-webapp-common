import { NodeVM } from 'vm2'
import resultProcessor from './result-proc'
import { sharedContext } from './context'

export default async (code, ctx = {}, opt = {}) => {
  return new Promise(async (resolve, reject) => {
    const {
      console = 'off',
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
        require: false,

        // timeout after ??
        timeout,

        // Allow console use
        console,

        // No wrapper - we need the result
        // from the script
        wrapper: 'none',
      })

      resolve(resultProcessor(ctx, await vm.run(code)))
    } catch (e) {
      reject(e)
    }
  })
}
