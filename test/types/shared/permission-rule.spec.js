import { describe, it } from 'mocha'
import { expect } from 'chai'
import { AllowAccess, WildcardResource } from '../../../src/lib/types/shared/permission-rule'
import Module from '../../../src/lib/types/compose/module'
import Role from '../../../src/lib/types/system/role'

describe('permission-rule.js', () => {
  const role = Object.freeze(new Role({ roleID: '1234' }))
  describe('AllowAccess class', () => {
    it('should properly convert resource', () => {
      let a = new AllowAccess(role, new Module({ moduleID: '555' }), 'read')
      expect(a.resource).to.equal('compose:module:555')
    })

    it('should properly convert wildcard resource', () => {
      let a = new AllowAccess(role, new WildcardResource(new Module({ moduleID: '555' })), 'read')
      expect(a.resource).to.equal('compose:module:*')
    })
  })

  describe('serialization', () => {
    it('should propetly serialize rules', () => {
      [
        { r: new AllowAccess(role, new WildcardResource(new Module()), 'read'),
          j: '{"resource":"compose:module:*","operation":"read","access":"1"}' },
        { r: new AllowAccess(role, new Module({ moduleID: '555' }), 'read'),
          j: '{"resource":"compose:module:555","operation":"read","access":"1"}' },
      ].forEach(({ r, j }) => {
        expect(JSON.stringify(r)).to.equal(j)
      })
    })
  })
})
