import 'quill-mention'
import { toNFD } from 'corteza-webapp-common/src/lib/normalizers'
const fuzzysort = require('fuzzysort')

const calcMatch = ({ target, indexes }) => indexes.length / target.length
const fzsOpts = {
  threshold: -1000,
  allowTypo: true,
  keys: [
    'email',
    'name',
    'handle',
  ],

  scoreFn: (a) => {
    return a.sort((a, b) => {
      if (!a) {
        return -1
      }
      if (!b) {
        return 0
      }
      return calcMatch(a) - calcMatch(b)
    }).pop()
  },
}

/**
 * @param {Function} mentionsForChar Gives get mentions for given chart
 * @param {Object} opts Additional configuration for module
 *
 * @returns {Object} Module configuration
 */
export default ({ mentionsForChar = async () => ({}), opts = {} }) => {
  return {
    allowedChars: /^.*$/,
    offsetLeft: 0,
    fixMentionsToQuill: true,
    defaultMenuOrientation: 'top',
    mentionDenotationChars: ['@', '#'],
    renderItem: function (item) {
      return item.toHTML()
    },

    source: async function (searchTerm, renderList, mentionChar) {
      searchTerm = toNFD(searchTerm)
      // @todo priorities
      const priorities = new Set([])
      let values = await mentionsForChar(mentionChar)
      if (!values) {
        console.debug('mentionsForChar.noMentions')
        return
      }

      if (searchTerm.length !== 0) {
        values = fuzzysort.go(searchTerm, values, fzsOpts)
      } else {
        values = values.map(obj => ({ obj }))
      }

      const p = []
      const rest = []
      values.forEach(v => {
        if (priorities && priorities.has(v.obj.id)) {
          p.push(v)
        } else {
          rest.push(v)
        }
      })

      values = rest.filter(({ score }) => {
        if (!p.length) {
          return true
        }

        if (!score) {
          return false
        }
        return calcMatch(score) > 0.35
      }).concat(p)
        .map(r => r.obj)
        // For now assume all objects are of same type
        .sort(values[0].sorter)

      renderList(values.reverse(), searchTerm)
    },

    ...opts,
  }
}
