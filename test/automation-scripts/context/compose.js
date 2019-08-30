
import { describe, it, beforeEach } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import ComposeHelper from '../../../src/lib/automation-scripts/context/compose'
import Namespace from '../../../src/lib/types/compose/namespace'
import Module from '../../../src/lib/types/compose/module'
import Record from '../../../src/lib/types/compose/record'
import ModuleField from '../../../src/lib/types/compose/module-field'
import sinon from 'sinon'

chai.use(chaiAsPromised)

describe('compose', () => {
  let DummyModule
  let h
  beforeEach(() => {
    DummyModule = new Module({ fields: [{ name: 'dummy' }] })
    h = new ComposeHelper()
    h.ComposeAPI = {}
    sinon.restore()
  })

  describe('supporting functions', () => {
    describe('resolveModule', () => {
      it('should return first valid module', async () => {
        const m = new Module({ moduleID: '1', namespaceID: '2' })
        expect(await h.resolveModule(undefined, null, false, 0, '', m)).to.deep.equal(m)
      })

      it('should resolve ID', async () => {
        const m = new Module({ moduleID: '444', namespaceID: '555' })

        h.findModuleByID = sinon.fake.resolves(m)
        expect(await h.resolveModule(m.moduleID)).to.deep.equal(m)

        sinon.assert.calledOnce(h.findModuleByID)
        sinon.assert.calledWith(h.findModuleByID, m.moduleID)
      })

      it('should resolve name', async () => {
        const m = new Module({ name: 'm-name' })

        h.findModuleByName = sinon.fake.resolves(m)
        expect(await h.resolveModule(m.name)).to.deep.equal(m)

        sinon.assert.calledOnce(h.findModuleByName)
        sinon.assert.calledWith(h.findModuleByName, m.name)
      })

      it('should resolve numeric name', async () => {
        const m = new Module({ name: '555' })

        h.findModuleByID = sinon.fake.rejects(Error('compose.repository.ModuleNotFound'))
        h.findModuleByName = sinon.fake.resolves(m)

        expect(await h.resolveModule(m.name)).to.deep.equal(m)

        sinon.assert.calledOnce(h.findModuleByID)
        sinon.assert.calledWith(h.findModuleByID, m.name)

        sinon.assert.calledOnce(h.findModuleByName)
        sinon.assert.calledWith(h.findModuleByName, m.name)
      })
    })

    describe('resolveNamespace', () => {
      it('should return first valid namespace', async () => {
        const ns = new Namespace({ namespaceID: '2' })
        expect(await h.resolveNamespace(undefined, null, false, 0, '', ns)).to.deep.equal(ns)
      })

      it('should resolve ID', async () => {
        const ns = new Namespace({ namespaceID: '555' })

        h.findNamespaceByID = sinon.fake.resolves(ns)
        expect(await h.resolveNamespace(ns.namespaceID)).to.deep.equal(ns)

        sinon.assert.calledOnce(h.findNamespaceByID)
        sinon.assert.calledWith(h.findNamespaceByID, ns.namespaceID)
      })

      it('should resolve slug', async () => {
        const ns = new Namespace({ slug: 'ns-slug' })

        h.findNamespaceBySlug = sinon.fake.resolves(ns)
        expect(await h.resolveNamespace(ns.slug)).to.deep.equal(ns)

        sinon.assert.calledOnce(h.findNamespaceBySlug)
        sinon.assert.calledWith(h.findNamespaceBySlug, ns.slug)
      })

      it('should resolve numeric slug', async () => {
        const ns = new Namespace({ slug: '555' })

        h.findNamespaceByID = sinon.fake.rejects(Error('compose.repository.NamespaceNotFound'))
        h.findNamespaceBySlug = sinon.fake.resolves(ns)

        expect(await h.resolveNamespace(ns.slug)).to.deep.equal(ns)

        sinon.assert.calledOnce(h.findNamespaceByID)
        sinon.assert.calledWith(h.findNamespaceByID, ns.slug)

        sinon.assert.calledOnce(h.findNamespaceBySlug)
        sinon.assert.calledWith(h.findNamespaceBySlug, ns.slug)
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

    describe('makeRecord', () => {
      it('should make a record', async () => {
        expect(await h.makeRecord({}, $module)).to.instanceof(Record)
        expect((await h.makeRecord({ str: 'foo' }, $module)).values.str).to.equal('foo')
      })
    })

    describe('saveRecord', () => {
      it('should validate input', async () => {
        expect(h.saveRecord(null)).to.be.rejectedWith(Error)
        expect(h.saveRecord(false)).to.be.rejectedWith(Error)
        expect(h.saveRecord(true)).to.be.rejectedWith(Error)
        expect(h.saveRecord({})).to.be.rejectedWith(Error)
        expect(h.saveRecord(DummyModule)).to.be.rejectedWith(Error)
        expect(h.saveRecord(Promise.resolve(DummyModule))).to.be.rejectedWith(Error)
      })

      it('should create new', async () => {
        h.$module = DummyModule
        const record = await h.makeRecord({})

        h.ComposeAPI.recordCreate = sinon.fake.resolves(record)

        await h.saveRecord(record)
        sinon.assert.calledWith(h.ComposeAPI.recordCreate, record)
      })

      it('should update existing', async () => {
        h.$module = DummyModule
        const record = new Record(h.$module, { recordID: '222' })

        h.ComposeAPI.recordUpdate = sinon.fake.resolves(record)

        await h.saveRecord(record)
        sinon.assert.calledWith(h.ComposeAPI.recordUpdate, record)
      })
    })

    describe('deleteRecord', () => {
      it('should validate input', async () => {
        expect(h.deleteRecord(null)).to.be.rejectedWith(Error)
        expect(h.deleteRecord(false)).to.be.rejectedWith(Error)
        expect(h.deleteRecord(true)).to.be.rejectedWith(Error)
        expect(h.deleteRecord({})).to.be.rejectedWith(Error)
        expect(h.deleteRecord(DummyModule)).to.be.rejectedWith(Error)
        expect(h.deleteRecord(Promise.resolve(DummyModule))).to.be.rejectedWith(Error)
      })

      it('should delete existing record', async () => {
        const record = new Record(DummyModule, { recordID: '222' })
        h.ComposeAPI.recordDelete = sinon.fake.resolves(record)
        await h.deleteRecord(record)
        sinon.assert.calledWith(h.ComposeAPI.recordDelete, record)
      })

      it('should not delete fresh record', async () => {
        const record = new Record(DummyModule)
        h.ComposeAPI.recordDelete = sinon.fake()
        await h.deleteRecord(record)
        sinon.assert.notCalled(h.ComposeAPI.recordDelete)
      })

      it('should delete record')
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

    describe('makeModule', () => {
      it('should make new', async () => {
        h.$namespace = new Namespace()
        let module = await h.makeModule({ name: 'MyModule' })
        expect(module).to.be.instanceOf(Module)
        expect(module.name).to.equal('MyModule')
      })
    })

    describe('saveModule', async () => {
      it('should create new', async () => {
        const module = DummyModule
        h.$namespace = new Namespace()
        h.ComposeAPI.moduleCreate = sinon.fake.resolves(module)
        await h.saveModule(module)
        sinon.assert.calledWith(h.ComposeAPI.moduleCreate, module)
      })

      it('should update existing', async () => {
        const module = new Module({ 'moduleID': '555' })
        h.$namespace = new Namespace()
        h.ComposeAPI.moduleUpdate = sinon.fake.resolves(module)
        await h.saveModule(module)
        sinon.assert.calledWith(h.ComposeAPI.moduleUpdate, module)
      })
    })

    describe('findModules', () => {
      it('should find modules on $namespace')
      it('should find modules on a different namespace')
      it('should properly translate filter to query when string')
      it('should cast retrieved objects to Module')
    })

    describe.only('findModuleByID', () => {
      it('should find module on $namespace', async () => {
        const module = new Module({ moduleID: '555' })
        h.$namespace = new Namespace({ namespaceID: '444' })
        h.ComposeAPI.moduleRead = sinon.fake.resolves({ ...module })
        expect(await h.findModuleByID('555')).to.be.instanceOf(Module)
        sinon.assert.calledWith(h.ComposeAPI.moduleRead, { moduleID: '555', namespaceID: h.$namespace.namespaceID })
      })
    })

    describe('findModuleByName', () => {
      it('should find module on $namespace', async () => {
        const module = new Module({ moduleID: '555' })
        h.$namespace = new Namespace({ namespaceID: '444' })
        h.ComposeAPI.moduleList = sinon.fake.resolves({ filter: { count: 1 }, set: [module] })
        expect(await h.findModuleByName('some-module')).to.be.instanceOf(Module)
        sinon.assert.calledWith(h.ComposeAPI.moduleList, { name: 'some-module', namespaceID: h.$namespace.namespaceID })
      })
    })

    describe('makeNamespace', () => {
      it('should make active namespace', async () => {
        // eslint-disable-next-line no-unused-expressions
        expect((await h.makeNamespace()).enabled).to.be.true
      })

      it('should use slug as name', async () => {
        let ns = await h.makeNamespace({ slug: 'sluggy-slug' })
        expect(ns.slug).to.equal('sluggy-slug')
        expect(ns.name).to.equal('sluggy-slug')
      })
    })

    describe('saveNamespace', async () => {
      it('should create new', async () => {
        const ns = new Namespace()
        h.ComposeAPI.namespaceCreate = sinon.fake.resolves(ns)
        await h.saveNamespace(ns)
        sinon.assert.calledWith(h.ComposeAPI.namespaceCreate, ns)
      })

      it('should update existing', async () => {
        const ns = new Namespace({ 'namespaceID': '555' })
        h.ComposeAPI.namespaceUpdate = sinon.fake.resolves(ns)
        await h.saveNamespace(ns)
        sinon.assert.calledWith(h.ComposeAPI.namespaceUpdate, ns)
      })
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
