import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import Record from '../../src/lib/types/compose/record'
import Module from '../../src/lib/types/compose/module'
import resultProcessor from '../../src/lib/automation-scripts/result-proc'

describe('result processor', () => {
  let ctx, M

  beforeEach(() => {
    M = Object.freeze(new Module({ moduleID: 555, namespaceID: 444, fields: [ { name: 'dummy' } ] }))

    ctx = {}
  })

  it('should return false when rval is false', () => {
    expect(resultProcessor(ctx, false)).to.equal(false)
  })

  it('should return true', () => {
    expect(resultProcessor(ctx, new Promise(() => 'resolved :)'))).to.equal(true)
    expect(ctx).to.deep.equal({})
  })

  it('should cast to Record', () => {
    const R = new Record(M)
    expect(resultProcessor(ctx, R)).to.equal(true)
    expect(ctx.$record).to.deep.equal(R)
  })

  it('should cast to Module', () => {
    expect(resultProcessor(ctx, M)).to.equal(true)
    expect(ctx.$module).to.deep.equal(M)
  })
})
