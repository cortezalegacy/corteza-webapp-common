import { describe, it } from 'mocha'
import { expect, assert } from 'chai'
import { sleep, intervalToMS } from '../../src/lib/utils'
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
})
