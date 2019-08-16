import { NodeVM } from 'vm2'
import castResult from './cast'
import { sharedContext } from './context'

export default async (code, ctx = {}, opt = {}) => {
  return new Promise((resolve) => {
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

    resolve(castResult(vm.run(code), ctx))
  })
}
