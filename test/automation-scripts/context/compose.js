import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import ComposeHelper from '../../../src/lib/automation-scripts/context/compose'
import Module from '../../../src/lib/types/compose/module'
import Record from '../../../src/lib/types/compose/record'
import ModuleField from '../../../src/lib/types/compose/module-field'
import sinon from 'sinon'

describe('compose', () => {
  let h
  beforeEach(() => {
    h = new ComposeHelper()
    sinon.restore()
  })

  describe('supporting functions', () => {
    describe('findValidModule', () => {
      it('should first valid module', () => {
        const m = new Module({ moduleID: '1', namespaceID: '2' })
        expect(h.extractModule(undefined, null, false, 0, '', 'abc', m)).to.deep.equal(m)
      })
    })

    describe('extractIDsFromModule', () => {
      it('should extract IDs from Module', () => {
        expect(h.extractIDsFromModule(new Module({ moduleID: '1', namespaceID: '2' }))).to.deep.equal({ moduleID: '1', namespaceID: '2' })
      })

      it('should extract IDs from Object', () => {
        expect(h.extractIDsFromModule({ moduleID: '1', namespaceID: '2' })).to.deep.equal({ moduleID: '1', namespaceID: '2' })
      })

      it('should throw error on invalid input', () => {
        expect(() => h.extractIDsFromModule()).to.throw()
      })
    })
  })

  describe('helpers', () => {
    const $module = new Module({
      moduleID: '1',
      namespaceID: '2',
      fields: [
        new ModuleField({ name: 'str', kind: 'String' }),
        new ModuleField({ name: 'num', kind: 'Number' }),
        new ModuleField({ name: 'multi', kind: 'String', isMulti: true }),
      ],
    })

    describe('MakeRecord', () => {
      it('should make a record', () => {
        expect(h.makeRecord({}, $module)).to.instanceof(Record)
        expect(h.makeRecord({ str: 'foo' }, $module).values.str).to.equal('foo')
      })
    })

    describe('saveRecord', () => {
      it('should save new record')
      it('should update existing record')
      it('should throw when updating $record')
      it('should throw when creating $record')
      it('should allow to update $record when forced')
      it('should allow to create $record when forced')
    })

    describe('deleteRecord', () => {
      it('should throw when input is not a record')
      it('should delete record')
      it('should throw when deleting $record')
      it('should allow to delete $record when forced')
    })

    describe('findRecords', () => {
      it('should find records on $module')
      it('should find records on a different module')
      it('should properly translate filter to ID when numeric')
      it('should properly translate filter to query when string')
      it('should cast retrieved objects to Record')
    })

    describe('findRecordByID', () => {
      it('should find record on $module')
      it('should find record on a different module')
      it('should find by ID when given a Record object')
      it('should cast retrieved objects to Record')
    })

    describe('findModules', () => {
      it('should find modules on $namespace')
      it('should find modules on a different namespace')
      it('should properly translate filter to query when string')
      it('should cast retrieved objects to Module')
    })

    describe('findModuleByID', () => {
      it('should find module on $module')
      it('should find by ID when given a Module object')
      it('should cast retrieved objects to Module')
    })

    describe('findUsers', () => {
      // @todo move to system.js
      it('should find users on $namespace')
      it('should find users on a different namespace')
      it('should properly translate filter to query when string')
      it('should cast retrieved objects to User')
    })

    describe('findUserByID', () => {
      // @todo move to system.js
      it('should find user on $module')
      it('should find by ID when given a User object')
      it('should cast retrieved objects to User')
    })

    describe('sendEmail', () => {
      it('should write some tests')
    })

    describe('sendMessageToChannel', () => {
      // @todo move to messaging.js
      it('should write some tests')
    })

    describe('sendDirectMessageToUser', () => {
      // @todo move to messaging.js
      it('should write some tests')
    })
  })
})
