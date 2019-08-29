import { describe, it, beforeEach } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import SystemHelper from '../../../src/lib/automation-scripts/context/system'
import User from '../../../src/lib/types/system/user'
import Role from '../../../src/lib/types/system/role'

chai.use(chaiAsPromised)

describe('system', () => {
  let h
  beforeEach(() => {
    h = new SystemHelper()
    h.SystemAPI = {}
    sinon.restore()
  })

  describe('supporting functions', () => {
    describe('resolveUser', () => {
      it('should return first valid user', async () => {
        const u = new User({ userID: '444' })
        expect(await h.resolveUser(undefined, null, false, 0, '', u)).to.deep.equal(u)
      })

      it('should resolve ID', async () => {
        const u = new User({ userID: '444' })

        h.findUserByID = sinon.fake.resolves(u)
        expect(await h.resolveUser(u.userID)).to.deep.equal(u)

        sinon.assert.calledOnce(h.findUserByID)
        sinon.assert.calledWith(h.findUserByID, u.userID)
      })

      it('should resolve name', async () => {
        const u = new User({ handle: 'user-handle' })

        h.findUsers = sinon.fake.resolves({ filter: { count: 1 }, set: [u] })

        expect(await h.resolveUser(u.handle)).to.deep.equal(u)
      })

      it('should resolve numeric handle', async () => {
        const u = new User({ handle: '555' })

        h.findUsers = sinon.fake.resolves({ filter: { count: 1 }, set: [u] })
        h.findUserByID = sinon.fake.rejects(Error('compose.repository.UserNotFound'))

        expect(await h.resolveUser(u.handle)).to.deep.equal(u)

        sinon.assert.calledOnce(h.findUserByID)
        sinon.assert.calledWith(h.findUserByID, u.handle)
      })

      it('should resolve email', async () => {
        const u = new User({ email: 'foo@bar.baz' })

        h.findUsers = sinon.fake.resolves({ filter: { count: 1 }, set: [u] })

        expect(await h.resolveUser(u.email)).to.deep.equal(u)
      })
    })
  })

  describe('helpers', () => {
    describe('findUsers', () => {
      it('handles string filter', async () => {
        h.SystemAPI.userList = sinon.fake.resolves({ set: [ new User() ] })
        await h.findUsers('filter')
        sinon.assert.calledWith(h.SystemAPI.userList, { query: 'filter' })
      })

      it('returns valid object', async () => {
        h.SystemAPI.userList = sinon.fake.resolves({ set: [ new User() ] })
        expect((await h.findUsers()).set[0]).is.instanceOf(User)
      })
    })

    describe('findUserByID', () => {
      it('returns valid object', async () => {
        h.SystemAPI.userRead = sinon.fake.resolves(new User())
        expect(await h.findUserByID('1234')).is.instanceOf(User)
      })
    })

    describe('saveUser', () => {
      it('should create new', async () => {
        const ns = new User()
        h.SystemAPI.userCreate = sinon.fake.resolves(ns)
        await h.saveUser(ns)
        sinon.assert.calledWith(h.SystemAPI.userCreate, ns)
      })

      it('should update existing', async () => {
        const ns = new User({ 'userID': '555' })
        h.SystemAPI.userUpdate = sinon.fake.resolves(ns)
        await h.saveUser(ns)
        sinon.assert.calledWith(h.SystemAPI.userUpdate, ns)
      })
    })

    describe('deleteUser', () => {
      it('should delete existing user', async () => {
        const user = new User({ userID: '222' })
        h.SystemAPI.userDelete = sinon.fake.resolves(user)
        await h.deleteUser(user)
        sinon.assert.calledWith(h.SystemAPI.userDelete, { userID: user.userID })
      })

      it('should not delete fresh user', async () => {
        const user = new User()
        h.SystemAPI.userDelete = sinon.fake()
        await h.deleteUser(user)
        sinon.assert.notCalled(h.SystemAPI.userDelete)
      })
    })

    describe('findRoles', () => {
      it('handles string filter', async () => {
        h.SystemAPI.roleList = sinon.fake.resolves({ set: [ new Role() ] })
        await h.findRoles('filter')
        sinon.assert.calledWith(h.SystemAPI.roleList, { query: 'filter' })
      })

      it('returns valid object', async () => {
        h.SystemAPI.roleList = sinon.fake.resolves({ set: [ new Role() ] })
        expect((await h.findRoles()).set[0]).is.instanceOf(Role)
      })
    })

    describe('findRoleByID', () => {
      it('returns valid object', async () => {
        h.SystemAPI.roleRead = sinon.fake.resolves(new Role())
        expect(await h.findRoleByID('1234')).is.instanceOf(Role)
      })
    })

    describe('saveRole', () => {
      it('should create new', async () => {
        const ns = new Role()
        h.SystemAPI.roleCreate = sinon.fake.resolves(ns)
        await h.saveRole(ns)
        sinon.assert.calledWith(h.SystemAPI.roleCreate, ns)
      })

      it('should update existing', async () => {
        const ns = new Role({ 'roleID': '555' })
        h.SystemAPI.roleUpdate = sinon.fake.resolves(ns)
        await h.saveRole(ns)
        sinon.assert.calledWith(h.SystemAPI.roleUpdate, ns)
      })
    })

    describe('deleteRole', () => {
      it('should delete existing role', async () => {
        const role = new Role({ roleID: '222' })
        h.SystemAPI.roleDelete = sinon.fake.resolves(role)
        await h.deleteRole(role)
        sinon.assert.calledWith(h.SystemAPI.roleDelete, { roleID: role.roleID })
      })

      it('should not delete fresh role', async () => {
        const role = new Role()
        h.SystemAPI.roleDelete = sinon.fake()
        await h.deleteRole(role)
        sinon.assert.notCalled(h.SystemAPI.roleDelete)
      })
    })
  })
})
