import { describe, it, beforeEach } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

import execInUA from '../../src/lib/automation-scripts/exec-in-ua'
import execInVM from '../../src/lib/automation-scripts/exec-in-vm'
import Record from '../../src/lib/types/compose/record'
import Module from '../../src/lib/types/compose/module'
import Namespace from '../../src/lib/types/compose/namespace'

chai.use(chaiAsPromised)

describe('script executor', () => {
  let ctx

  beforeEach(() => {
    const $namespace = new Namespace({ namespaceID: 444 })
    const $module = new Module({ moduleID: 555, namespaceID: 444 })

    ctx = {
      $namespace,
      $module,
      $record: new Record($module),

      ComposeAPI: {
        recordRead: sinon.fake(),
        recordCreate: sinon.fake(),
        recordUpdate: sinon.fake(),
        recordDelete: sinon.fake(),
      },
    }
  })

  for (let [name, exec] of [['ua', execInUA], ['vm', execInVM]]) {
    describe(name, () => {
      describe('bad code', () => {
        it('syntax error #1', async () => {
          expect(exec('returnz!')).to.be.rejectedWith(SyntaxError)
        })
      })

      describe('simple script runner operations', () => {
        it('void/undefined return', async () => {
          expect(await exec('return')).is.equal(true)
        })

        it('falsy return', async () => {
          expect(await exec('return false')).is.equal(false)
        })

        it('true w/o context', async () => {
          expect(await exec('return true')).is.equal(true)
        })

        it('void w/ context', async () => {
          expect(await exec('', ctx)).is.equal(true)
        })

        it('true w/ context', async () => {
          expect(await exec('return true', ctx)).is.equal(true)
        })

        it('rejection with returned promise', () => {
          expect(exec(`return new Promise((resolve,reject) => { reject('niet')})`)).to.be.rejectedWith('niet')
        })

        it.skip('rejection w/o returned promise', () => {
          // @todo skip for now, raises UnhandledPromiseRejectionWarning:
          expect(exec(`new Promise((resolve,reject) => { reject('niet')})`)).to.be.rejectedWith('niet')
        })

        it('throw', () => {
          expect(exec(`throw Error('simple')`)).to.be.rejectedWith(Error, 'simple')
        })
      })

      describe('access to helper functions', () => {
        it('should call recordRead when FindRecordByID is used (explicit module)', async () => {
          ctx.ComposeAPI.recordRead = sinon.fake.resolves(new Record(ctx.$module, { recordID: '555' }))

          let result = await exec(`return Compose.findRecordByID('123', new Module({ moduleID: '321', namespaceID: '99' }))`, ctx)

          sinon.assert.calledWith(ctx.ComposeAPI.recordRead, {
            recordID: '123',
            moduleID: '321',
            namespaceID: '99',
          })

          expect(result).is.equal(true)
        })

        it('should call recordRead when findRecordByID is used (using $module)', async () => {
          ctx.$record = null
          ctx.ComposeAPI.recordRead = sinon.fake.resolves(new Record(ctx.$module, { recordID: '555' }))
          let result = await exec(`return Compose.findRecordByID('123')`, ctx)

          sinon.assert.calledWith(ctx.ComposeAPI.recordRead, {
            recordID: '123',
            moduleID: '555',
            namespaceID: '444',
          })

          expect(result).is.equal(true)
          expect(ctx.$record).is.instanceOf(Record)
        })
      })
    })

    describe('data manipulation', () => {
      let ctx

      beforeEach(() => {
        let $namespace = new Namespace()
        let $module = new Module({ fields: [{ name: 'changes' }, { name: 'alwaysOne' }] })
        let $record = new Record($module, { values: [{ name: 'changes', value: 1 }, { name: 'alwaysOne', value: 1 }] })

        ctx = {
          $namespace,
          $module,
          $record,
        }
      })

      it('simple code, no returning value, results should be picked from context/sandbox', async () => {
        let r = await exec('$record.values.changes = 2', ctx)
        expect(r).is.not.undefined
        expect(ctx.$record.values.changes).to.equal(2)
        expect(ctx.$record.values.alwaysOne).to.equal(1)
      })

      it('async wrap, no returning value, results should be picked from context/sandbox', async () => {
        let r = await exec('(async () => {$record.values.changes = 3})()', ctx)
        expect(r).is.not.undefined
        expect(ctx.$record.values.changes).to.equal(3)
        expect(ctx.$record.values.alwaysOne).to.equal(1)
      })

      it('explicitly returning record', async () => {
        let rval = await exec('let r = new Record($module); r.values.changes = 4; r.values.alwaysOne = 1; return r', ctx)
        expect(rval).to.equal(true)
        expect(ctx.$record.values.changes).to.equal(4)
        expect(ctx.$record.values.alwaysOne).to.equal(1)
      })

      it('rejecting a promise', async () => {
        expect(exec('return new Promise((resolve, reject) => {reject()})', ctx)).to.be.rejected
      })
    })
  }
})
