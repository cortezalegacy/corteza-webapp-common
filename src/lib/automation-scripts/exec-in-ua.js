import { sharedContext, uiContext } from './context'
import resultProcessor from './result-proc'

/**
 * Runs (through eval) script and resolves the results
 *
 * Inside scripts we use $record, $module, $namespace (...) for variables
 * that hold current record/module/namespace.
 *
 * @param {String} code
 * @param {Object} ctx
 * @returns {Promise}
 */
export default async (code, ctx = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      ctx = sharedContext(ctx)
      ctx = uiContext(ctx)

      let evalClassLoader = ''
      for (let k in ctx) {
        evalClassLoader += `let ${k} = ctx.${k};`
      }

      const source = `${evalClassLoader}(() => {\n'use strict'; ${code};\n})()`

      /* eslint-disable no-eval */
      resolve(resultProcessor(ctx, await eval(source)))
    } catch (e) {
      return reject(e)
    }
  })
}
