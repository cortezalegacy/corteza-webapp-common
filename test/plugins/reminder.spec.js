import { describe, it } from 'mocha'
import { expect, assert } from 'chai'
import { ReminderService } from '../../src/plugins/reminder'
import Reminder from '../../src/lib/types/shared/reminder'
import sinon from 'sinon'
import moment from 'moment'

// Mock for localStorage :)

describe('/src/plugins/reminder.js', () => {
  afterEach(() => {
    sinon.restore()
  })

  let api, $emit
  beforeEach(() => {
    api = {
      reminderRead: sinon.mock().resolves({}),
    }
    $emit = sinon.stub()
  })

  console.log(ReminderService)
  describe('init', () => {
    it('throw if invalid params provided', () => {
      assert.throws(() => new ReminderService(), 'reminderService.invalidParams')
    })
  })

  describe('enqueue', () => {
    let rs
    beforeEach(() => {
      rs = new ReminderService({ api, $emit })
    })
    
    const mock = () => {
      sinon.stub(rs, 'pool').returns()
      sinon.stub(rs, 'processQueue').returns()
    }

    it('should work on empty state', () => {
      mock()
      rs.enqueue([
        new Reminder({ reminderID: '1', remindAt: '2000-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '2', remindAt: '2000-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '2', remindAt: '3000-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '3', remindAt: '2000-01-01T01:00:00+01:00' }),
      ])

      expect(rs.set).to.have.length(3)
    })
    it('should restart process schedule if needed', () => {
      mock()
      rs.enqueue([ new Reminder({ reminderID: '1', remindAt: '2000-01-01T01:00:00+01:00' }) ])
      sinon.stub(rs, 'scheduleReminderProcess').returns()

      rs.enqueue([ new Reminder({ reminderID: '1', remindAt: '1900-01-01T01:00:00+01:00' }) ])
      sinon.assert.calledOnce(rs.scheduleReminderProcess)
      expect(rs.nextRemindAt.year()).to.eq(1900)
    })

    it('should not restart process schedule unneeded', () => {
      mock()
      rs.enqueue([ new Reminder({ reminderID: '1', remindAt: '2000-01-01T01:00:00+01:00' }) ])
      sinon.stub(rs, 'scheduleReminderProcess').returns()

      rs.enqueue([ new Reminder({ reminderID: '1', remindAt: '2000-01-01T01:00:00+01:00' }) ])
      sinon.assert.notCalled(rs.scheduleReminderProcess)

      rs.enqueue([ new Reminder({ reminderID: '1', remindAt: '2001-01-01T01:00:00+01:00' }) ])
      sinon.assert.notCalled(rs.scheduleReminderProcess)
    })
  })

  describe('dequeue', () => {
    let rs
    beforeEach(() => {
      rs = new ReminderService({ api, $emit })
    })

    const mock = () => {
      sinon.stub(rs, 'pool').returns()
      sinon.stub(rs, 'processQueue').returns()
    }

    it('Won\'t die, if not found in state', () => {
      mock()
      rs.dequeue(['1', '2', '3'])

      expect(rs.set).to.have.length(0)
    })

    it('Remove reminders from state', () => {
      mock()
      rs.enqueue([
        new Reminder({ reminderID: '1', remindAt: '2000-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '2', remindAt: '2000-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '3', remindAt: '3000-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '4', remindAt: '2000-01-01T01:00:00+01:00' }),
      ])

      rs.dequeue(['1', '2', '2'])
      expect(rs.set).to.have.length(2)
      expect(rs.set[0]).to.include({ reminderID: '3' })
      expect(rs.set[1]).to.include({ reminderID: '4' })
    })

    it('should restart process', () => {
      mock()
      rs.enqueue([
        new Reminder({ reminderID: '1', remindAt: '2003-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '2', remindAt: '2001-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '3', remindAt: '2000-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '4', remindAt: '2002-01-01T01:00:00+01:00' }),
      ])
      expect(rs.nextRemindAt.year()).to.eq(2000)
      sinon.stub(rs, 'scheduleReminderProcess').returns()

      rs.dequeue(['3'])
      expect(rs.nextRemindAt.year()).to.eq(2001)
      sinon.assert.calledOnce(rs.scheduleReminderProcess)
    })
  })

  describe('scheduleReminderProcess', () => {
    let rs
    beforeEach(() => {
      rs = new ReminderService({ api, $emit })
    })

    const mock = () => {
      sinon.stub(rs, 'pool').returns()
      sinon.stub(rs, 'processQueue').returns()
      sinon.stub(window, 'clearTimeout').returns(1)
      sinon.stub(window, 'setTimeout').returns(1)
    }

    it('should enqueue process', () => {
      mock()
      const now = moment("2000-01-01T01:00:00+01:00")
      rs.scheduleReminderProcess(now, now)
      sinon.assert.calledOnce(window.setTimeout)
    })
    it('should clear old timer if needed', () => {
      mock()
      const now = moment("2000-01-01T01:00:00+01:00")
      rs.scheduleReminderProcess(now, now)
      sinon.assert.calledOnce(window.setTimeout)

      rs.scheduleReminderProcess(now, now)
      sinon.assert.calledOnce(window.clearTimeout)
      sinon.assert.calledTwice(window.setTimeout)
    })
  })

  describe('processQueue', () => {
    let rs
    beforeEach(() => {
      rs = new ReminderService({ api, $emit })
    })

    const mock = () => {
      sinon.stub(rs, 'pool').returns()
      sinon.stub(rs, 'scheduleReminderProcess').returns()
    }

    it('should process', () => {
      const now = moment('2000-01-01T01:00:00+01:00')
      mock()
      rs.set = [
        // @note this one is 1 min after now!
        new Reminder({ reminderID: '1', remindAt: '2000-01-01T01:00:01+01:00' }),
        new Reminder({ reminderID: '2', remindAt: '2001-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '3', remindAt: '1900-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '4', remindAt: '1999-01-01T01:00:00+01:00' }),
      ]

      rs.processQueue(now)
      sinon.assert.calledTwice($emit)
      expect(rs.set).to.have.length(2)
      expect(rs.nextRemindAt.year()).to.eq(2000)
    })

    it('should process', () => {
      const now = moment('2000-01-01T01:00:00+01:00')
      mock()
      rs.set = [
        // @note this one is 1 min after now!
        new Reminder({ reminderID: '1', remindAt: '2000-01-01T01:00:01+01:00' }),
        new Reminder({ reminderID: '2', remindAt: '1900-01-01T01:00:00+01:00' }),
        new Reminder({ reminderID: '3', remindAt: '1999-01-01T01:00:00+01:00' }),
      ]

      rs.processQueue(now)
      sinon.assert.calledTwice($emit)
      expect(rs.set).to.have.length(1)
      sinon.assert.calledOnce(rs.scheduleReminderProcess)
    })
  })
})
