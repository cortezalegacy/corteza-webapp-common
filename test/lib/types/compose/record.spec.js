import { describe, it } from 'mocha'
import { expect } from 'chai'
import Record from '../../../../src/lib/types/compose/record'
import Module from '../../../../src/lib/types/compose/module'

describe('/src/lib/types/compose/record.js', () => {
  let module
  beforeEach(() => {
    module = new Module({
      moduleID: '111',
      fields: [
        { name: 'f1', kind: 'String' },
      ],
    })
  })

  describe('set values', () => {
    it('ignore reserved fields - values as object', () => {
      const r1 = new Record(module, { values: { f1: 'value1' } })
      const r2 = new Record(module, r1)

      r2.values.f1 = 'EDITED'
      const serialized = r2.values.toJSON()
      expect(serialized[0]).to.deep.include({ name: 'f1', value: 'EDITED' })
    })

    it('ignore reserved fields - values as array', () => {
      const r1 = new Record(module, { values: [ { name: 'f1', value: 'value1' }, { name: 'toJSON', value: () => ({ name: 'f1', value: 'INVALID' }) } ] })

      r1.values.f1 = 'EDITED'
      const serialized = r1.values.toJSON()
      expect(serialized[0]).to.deep.include({ name: 'f1', value: 'EDITED' })
    })
  })
})
