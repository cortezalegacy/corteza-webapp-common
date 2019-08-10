import { describe, it } from 'mocha'
import { expect } from 'chai'
import { epMapper } from '../../src/lib/store/generic'

describe('generic.js', () => {
  describe('actions generator', () => {
    it('epMapper should map string as prefix to entrypoint map', () => {
      const mockedClient = {
        fooList: true,
        fooRead: true,
        fooCreate: true,
        fooUpdate: true,
        fooDelete: true,
      }

      expect(epMapper('foo', mockedClient)).to.deep.equal({
        'list': 'fooList',
        'read': 'fooRead',
        'create': 'fooCreate',
        'update': 'fooUpdate',
        'delete': 'fooDelete',
      })
    })
  })
})
