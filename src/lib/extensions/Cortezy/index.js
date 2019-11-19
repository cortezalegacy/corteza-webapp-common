import { Extension, Plugin, PluginKey } from 'tiptap'

export default class Cortezy extends Extension {
  get name () {
    return 'cortezy'
  }

  get defaultOptions () {
    return {
      checkDoc: () => {},
      updateTag: () => {},
    }
  }

  get update () {
    return view => {
      view.updateState(view.state)
    }
  }

  get plugins () {
    return [
      new Plugin({
        key: new PluginKey('cortezy'),
        view: () => {
          return {
            update: (view, prevState) => {
              // @todo determine when and what part of the doc should be re-evaluated
              this.options.checkDoc({
                doc: view.state.doc,
                dispatch: view.dispatch,
                state: view.state,
              })
            },
          }
        },

        state: {
          init () {
            return {}
          },

          apply: (tr, prev) => {
            tr.steps.forEach(step => {
              // Find descendants that are tag nodes; notify this change
              step.slice.content.descendants(node => {
                if (node.type.name === 'tag') {
                  this.options.updateTag(node.attrs.tag, node.attrs)
                }
              })
            })

            return {}
          },
        },
      }),
    ]
  }
}
