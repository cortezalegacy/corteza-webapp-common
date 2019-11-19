import { Node } from 'tiptap'
import { replaceText } from 'tiptap-commands'
import View from './View'

export default class Tag extends Node {
  get name () {
    return 'tag'
  }

  get defaultOptions () {
    return {
      onAssociate: () => {},
      associations: () => [],
      onManage: () => {},
    }
  }

  get view () {
    return View
  }

  get schema () {
    return {
      attrs: {
        associations: [],
        tag: {},
        label: {},
      },
      content: 'inline*',
      group: 'inline',
      inline: true,
      atom: false,
      toDOM: node => {
        return [
          'span',
          {
            class: 'tag',
            'data-associations': node.attrs.associations,
            'data-tag': node.attrs.tag,
          },
          `${node.attrs.label}`,
        ]
      },

      parseDOM: [
        {
          tag: 'span[data-associations]',
          getAttrs: node => {
            return {
              associations: node.getAttribute('data-associations'),
              tag: node.getAttribute('data-tag'),
              label: node.getAttribute('data-label'),
            }
          },
        },
      ],
    }
  }

  commands ({ type, schema }) {
    return (attrs) => {
      return replaceText(null, schema.nodes[this.name], attrs)
    }
  }
}
