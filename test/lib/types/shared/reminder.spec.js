import { describe, it } from 'mocha'
import { expect } from 'chai'
import Reminder from '../../../../src/lib/types/shared/reminder.js'

describe('/src/lib/types/shared/reminder.js', () => {
  it('alg. for determining router-link from resource + meta', () => {
    const reminders = [
      { reminder: { resource: 'compose:record:123', payload: { link: {} } }, route: 'page.record' },
    ]
    for (const { reminder, route } of reminders) {
      const r = new Reminder(reminder)
      expect(r.routerLink).to.include({ name: route })
    }
  })

  describe('determine link label', () => {
    it('use provided label', () => {
      const r = new Reminder({
        resource: 'compose:record:123',
        payload: {
          link: {
            label: 'label'
          }
        }
      })
      expect(r.linkLabel).to.eq('label')
    })

    it('use provided href as fallback', () => {
      const href = 'www.test.tld'
      const r = new Reminder({
        resource: 'compose:record:123',
        payload: {
          link: {
            href,
          }
        }
      })
      expect(r.linkLabel).to.eq(href)
    })

    it('use resource to determine generic label', () => {
      const href = 'www.test.tld'
      const r = new Reminder({
        resource: 'compose:record:123',
        payload: {
          link: {}
        }
      })
      expect(r.linkLabel).to.not.be.undefined
    })
  })
})
