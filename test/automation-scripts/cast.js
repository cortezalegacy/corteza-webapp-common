import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import Record from '../../src/lib/types/compose/record'
import Module from '../../src/lib/types/compose/module'
import castResult from '../../src/lib/automation-scripts/cast'

describe('results caster', () => {
  const M = Object.freeze(new Module({ moduleID: 555 }))

  it('should return false when rval is false', () => {
    expect(castResult(false)).to.be.false
  })

  it('should return promise when result is a promise', () => {
    expect(castResult(new Promise(() => 'resolved :)'))).to.be.instanceof(Promise)
  })

  it('should cast to Record', () => {
    expect(castResult(new Record(M))).to.be.instanceof(Record)
  })

  it('should cast to Module', () => {
    expect(castResult(M)).to.be.instanceof(Module)
  })

  it('should return $record from context when not false', () => {
    const R = new Record(M)
    expect(castResult(true, { $record: R })).to.deep.equal(R)
  })
})
