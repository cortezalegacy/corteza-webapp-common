import { describe, it } from 'mocha'
import { expect } from 'chai'
import ModuleField from '../../../src/lib/types/compose/module-field'

describe('module_field.js', () => {
  it('should set defaults', function () {
    const f = new ModuleField({ kind: 'String' })

    expect(f.fieldID).to.equal(undefined)
    expect(f.kind).to.equal('String')
    expect(f.isMulti).to.equal(false)
  })
})
