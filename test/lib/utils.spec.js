import { describe, it } from 'mocha'
import { expect, assert } from 'chai'
import { sleep, intervalToMS, validateFileType } from '../../src/lib/utils'
import moment from 'moment'

describe('/src/lib/utils.js', () => {
  describe('sleep', () => {
    it('shouldn\'t block the main thread', async () => {
      let called = false
      sleep(1).then(() => {
        if (!called) {
          assert(false)
        }
      })

      called = true
      assert(true)
    })
  })

  describe('intervalToMS', () => {
    it('invalid input', () => {
      assert.throws(() => intervalToMS(), Error)
      assert.throws(() => intervalToMS(moment()), Error)
      assert.throws(() => intervalToMS(null, moment()), Error)
    })

    it('positive interval', () => {
      const from = moment('2000-01-01T01:00:00+01:00')
      const to = moment('2000-01-01T01:00:01+01:00')
      expect(intervalToMS(from, to)).to.eq(1000)
    })

    it('negative interval', () => {
      const from = moment('2000-01-01T01:00:01+01:00')
      const to = moment('2000-01-01T01:00:00+01:00')
      expect(intervalToMS(from, to)).to.eq(-1000)
    })
  })

  describe('validateFileType', () => {
    it ('determine if valid', () => {
      const tests = [
        {
          name: 'not valid',
          filename: 'test.csv',
          accepted: ['text/plain'],
          out: false,
        },
        {
          name: 'not valid; any sub-type',
          filename: 'test.csv',
          accepted: ['image/*'],
          out: false,
        },
        {
          name: 'valid',
          filename: 'test.csv',
          accepted: ['text/csv'],
          out: true,
        },
        {
          name: 'valid; any sub-type',
          filename: 'test.csv',
          accepted: ['text/*'],
          out: true,
        },
        {
          name: 'valid; anything',
          filename: 'test.csv',
          accepted: ['*/*'],
          out: true,
        },
      ]

      for (const t of tests) {
        expect(validateFileType(t.filename, t.accepted), t.name).to.eq(t.out)
      }
    })
  })
})
