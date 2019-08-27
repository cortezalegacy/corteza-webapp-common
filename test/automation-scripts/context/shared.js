import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import {
  extractID,
} from '../../../src/lib/automation-scripts/context/shared'
import sinon from 'sinon'

describe('shared', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('extractID', () => {
    it('should extract the ID', () => {
      const k = 'testKey'
      expect(extractID(4200001)).to.equal('4200001')
      expect(extractID('4200002')).to.equal('4200002')
      expect(extractID({ testKey: '4200003' }, k)).to.equal('4200003')
    })

    it('should throw error on invalid input', () => {
      expect(() => extractID('abc')).to.throw()
      expect(() => extractID({ id: 'abc' }, 'id')).to.throw()
      // expect(() => extractID([])).to.throw()
      // expect(() => extractID({})).to.throw()
      // expect(() => extractID()).to.throw()
    })

    it('should extract 0', () => {
      expect(extractID([])).to.equal('0')
      expect(extractID({})).to.equal('0')
      expect(extractID('')).to.equal('0')
      expect(extractID()).to.equal('0')
    })
  })
})
