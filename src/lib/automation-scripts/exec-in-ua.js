import { sharedContext, uiContext } from './context'
import castResult from './cast'

/**
 * Runs (through eval) script and resolves the results
 *
 * Function is async because we have no idea what happens inside the script.
 * Async allows us to resolve returned promises properly.
 *
 * Inside scripts we use $record, $module, $namespace for variables
 * that hold current record/module/namespace.
 *
 * @param {String} code
 * @param {Object} ctx
 * @param {Namespace} ctx.namespace
 * @param {Module} ctx.module
 * @param {Record} ctx.record
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
      let rval = await eval(source)

      resolve(castResult(rval, ctx))
    } catch (e) {
      return reject(e)
    }
  })
}
