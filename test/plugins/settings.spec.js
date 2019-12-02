import { describe, it } from 'mocha'
import { expect, assert } from 'chai'
import { Settings } from '../../src/plugins/settings'
import sinon from 'sinon'

describe('corteza-webapp-common/src/plugins/settings.js', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('init', () => {
    const s = new Settings()
    s.init({ api: { settingsCurrent: sinon.stub().resolves({}) } })
  })

  it('get', () => {
    const tests = [
      {
        name: 'valid, full path',
        settings: { k1: { k2: { v: 'value' } } },
        args: ['k1.k2.v'],
        out: 'value',
      },
      {
        name: 'valid, full path; default',
        settings: { k1: { k2: { v: false } } },
        args: ['k1.k2.v', 'dft'],
        out: false,
      },
      {
        name: 'not found',
        settings: { k1: { k2: { v: 'value' } } },
        args: ['k1.k3.v'],
        out: undefined,
      },
      {
        name: 'not found; default',
        settings: { k1: { k2: { v: 'value' } } },
        args: ['k1.k3.v', 'dft'],
        out: 'dft',
      },
    ]

    for (const t of tests) {
      const s = new Settings()
      s.current = t.settings
      expect(s.get(...t.args), t.name).to.eq(t.out)
    }
  })
})
