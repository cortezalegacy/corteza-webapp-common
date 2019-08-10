import { describe, it } from 'mocha'
import { expect } from 'chai'
import { ISO8601 } from '../../src/lib/types/common'

describe('common.js', () => {
  describe('ISO8601', () => {
    it('should accept valid value', () => {
      expect(ISO8601('2019-04-04T14:17:29+02:00')).is.not.undefined
    })
  })
})
