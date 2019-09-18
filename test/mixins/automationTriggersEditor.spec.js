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

  describe('enable by index', () => {
    it('add new trigger if not found', () => {
      const fnc = ate.methods.enableByIndex.bind({ triggers, $emit })
      fnc('resource', 'event', 'condition', 0)

      sinon.assert.calledOnce($emit)
      const args = $emit.args.pop().pop()
      expect(args).to.have.length(1)
    })

    it('update trigger if not found', () => {
      triggers.push(new AT({ resource: 'resource', event: 'event', condition: 'condition' }))
      const fnc = ate.methods.enableByIndex.bind({ triggers, $emit })
      fnc('resource', 'event', 'condition', 0)

      sinon.assert.calledOnce($emit)
      const args = $emit.args.pop().pop()
      expect(args).to.have.length(1)
      expect(args[0]).to.include({ enabled: true })
    })
  })

  describe('remove by index', () => {
    it('ignore if trigger not found', () => {
      const fnc = ate.methods.removeByIndex.bind({ triggers, $emit })
      fnc('resource', 'event', 0)

      sinon.assert.notCalled($emit)
    })

    it('remove if trigger found', () => {
      triggers.push(new AT({ resource: 'resource', event: 'event', condition: 'condition' }))
      const fnc = ate.methods.removeByIndex.bind({ triggers, $emit })
      fnc('resource', 'event', 0)

      sinon.assert.calledOnce($emit)
      const args = $emit.args.pop().pop()
      expect(args).to.have.length(0)
    })
  })
})
