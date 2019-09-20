import { describe, it } from 'mocha'
import { expect } from 'chai'
import ate from '../../src/mixins/automationTriggersEditor'
import AT from '../../src/lib/types/shared/automation-trigger'
import sinon from 'sinon'

describe('/src/mixins/automationTriggersEditor.js', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $emit, triggers
  beforeEach(() => {
    triggers = []
    $emit = sinon.spy()
  })

  const bb = {
    setByIndex: ate.methods.setByIndex,
  }

  describe('enable by index', () => {
    it('add new trigger if not found', () => {
      const fnc = ate.methods.enableByIndex.bind({ ...bb, triggers, $emit })
      fnc('resource', 'event', 'condition', 0)

      sinon.assert.calledOnce($emit)
      const args = $emit.args.pop().pop()
      expect(args).to.have.length(1)
    })

    it('update trigger if found', () => {
      triggers.push(new AT({ enabled: true, resource: 'resource', event: 'event', condition: 'condition' }))
      const fnc = ate.methods.enableByIndex.bind({ ...bb, triggers, $emit })
      fnc('resource', 'event', 'condition', 0)

      sinon.assert.calledOnce($emit)
      const args = $emit.args.pop().pop()
      expect(args).to.have.length(1)
      expect(args[0]).to.include({ enabled: true })
    })
  })

  describe('disable by index', () => {
    it('ignore if trigger not found', () => {
      const fnc = ate.methods.disableByIndex.bind({ ...bb, triggers, $emit })
      fnc('resource', 'event', 0)

      sinon.assert.notCalled($emit)
    })

    it('disable if trigger found', () => {
      triggers.push(new AT({ enabled: true, resource: 'resource', event: 'event', condition: 'condition' }))
      const fnc = ate.methods.disableByIndex.bind({ ...bb, triggers, $emit })
      fnc('resource', 'event', 0)

      sinon.assert.calledOnce($emit)
      const args = $emit.args.pop().pop()
      expect(args).to.have.length(1)
      expect(args[0]).to.include({ enabled: false })
    })
  })
})
