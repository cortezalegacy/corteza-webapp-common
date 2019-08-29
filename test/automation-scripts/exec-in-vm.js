import { describe, it, beforeEach } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

import execInVM, { allowedExternalModules } from '../../src/lib/automation-scripts/exec-in-vm'

chai.use(chaiAsPromised)

describe('VM script executor', () => {
  beforeEach(() => {})

  describe('require module', () => {
    for (let module of allowedExternalModules) {
      it(`can require whitelisted module "${module}"`, async () => {
        expect(execInVM(`return require('${module}')`)).to.not.be.rejected
      })
    }

    for (let module of ['stdin', 'signal-exit']) {
      it(`can not require non-whitelisted module "${module}"`, async () => {
        expect(execInVM(`require('${module}')`)).to.be.rejected
      })
    }

    for (let module of ['foo', 'bar']) {
      it(`fail on mossing module "${module}"`, async () => {
        expect(execInVM(`require('${module}')`)).to.be.rejected
      })
    }
  })
})
