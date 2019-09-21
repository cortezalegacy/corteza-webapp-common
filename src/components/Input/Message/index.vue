<template>
  <div class="message-input">
    <slot name="header" />
    <div class="body">
      <slot name="left" />
      <div class="quill-editor">
        <div ref="editor" />
      </div>
      <slot name="right" />
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
import base from '../base'
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import { mConfig, kConfig } from './modules'

export default {
  extends: base,

  props: {
    noSubmitButton: Boolean,
    toolbar: Boolean,
    debug: Boolean,
    theme: {
      type: String,
      default: 'bubble',
    },
    formats: {
      type: Array,
      default: () => ['italic', 'bold', 'strike', 'mention'],
    },
    submitDisabled: {
      type: Boolean,
      default: true,
    },
    focus: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      required: false,
      default: null,
    },
    // Different plugin metadata, such as suggestions
    plugins: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    // Specifies what key presses should be emitted
    listenKeys: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data () {
    return {
      quill: null,
      crtDelta: this.value,
      listenKeysBase: [
        { key: 'ENTER', alias: 'handleEnter' },
        { key: 'ESCAPE', alias: 'handleEscape' },
      ],
      options: {
        debug: this.debug,
        theme: this.theme,
        formats: this.formats,

        // Configure modules on init
      },
    }
  },

  computed: {
    content: {
      get () {
        return this.crtDelta
      },

      set (value) {
        this.crtDelta = value
        this.$emit('input', value)
      },
    },
  },

  watch: {
    'plugins.mentions': {
      handler: function () {
        const mm = this.quill.getModule('mention')
        if (!mm || !mm.isOpen) {
          return
        }
        mm.onSomethingChange()

        // @todo Restore selection -- getter is now async, update this
        // const ii = mm.itemIndex
        // mm.itemIndex = (ii) % mm.values.length
        // mm.highlightItem()
      },
    },

    disabled: {
      handler: function (newVal) {
        this.quill.enable(!newVal)
      },
    },

    value: {
      handler: function (newVal) {
        // If value becomes undefined; it should be removed
        if (!newVal || !this.crtDelta || newVal.diff(this.crtDelta).ops.length !== 0) {
          this.crtDelta = newVal
          this.quill.setContents(newVal)
        }
      },
      deep: true,
    },

    placeholder: {
      handler: function (newVal) {
        this.updatePlaceholder(newVal)
      },
    },
  },

  mounted () {
    this.init()

    if (this.quill && this.focus) {
      this.setFocus()
    }
  },

  methods: {
    init () {
      // Setup quill
      this.quill = new Quill(this.$refs.editor, {
        ...this.options,

        modules: {
          toolbar: this.toolbar,

          mention: mConfig(this),
          keyboard: kConfig(this),
        },
      })
      this.quill.enable(!this.disabled)

      // Setup listeners
      this.quill.on('selection-change', range => {
        if (!range) {
          this.$emit('blur', { quill: this.quill, range })
        } else {
          this.$emit('focus', { quill: this.quill, range })
        }
      })

      this.quill.on('text-change', () => {
        const content = this.quill.getContents()
        const text = this.quill.getText()

        // quill always adds trailing \n
        if (text === '\n') {
          this.content = null
        } else {
          this.content = content
        }

        this.$emit('input', { text, content: this.content })
      })

      // Initial values
      this.quill.setContents(this.crtDelta)
      this.updatePlaceholder(this.placeholder)
    },

    setFocus () {
      this.quill.scrollingContainer.focus()

      // Select all contents
      let length = 0
      if (this.crtDelta) {
        if (typeof this.crtDelta.length === 'function') {
          length = this.crtDelta.length()
        } else if (!isNaN(this.crtDelta.length)) {
          length = this.crtDelta.length
        }
        this.quill.setSelection(0, length)
      }
    },

    updatePlaceholder (ph) {
      if (ph === undefined) {
        return
      }
      // Quill doesn't have a setter; so we need to do it like this
      this.quill.root.dataset.placeholder = ph
    },

    // Module methods
    keyBindings () {
      const bb = {}

      for (const k of this.listenKeysBase.concat(this.listenKeys)) {
        bb[k.alias] = {
          key: k.key,
          handler: (range, context) => {
            const text = this.quill.getText().trim()
            this.$emit('keydown', { range, context, text })
          },
        }
      }

      return bb
    },

    async mentionsForChar (char) {
      return (this.plugins.mentions || {})[char] || {}
    },
  },
}
</script>

<style lang="scss" scoped>
$inputWidth: 50px;
$mobileInputWidth: 35px;

/deep/ .ql-editor {
  max-height: 30vh;
  padding-right: 0;

  // Fixes text selection bug
  -moz-user-select: text;
  -khtml-user-select: text;
  -webkit-user-select: text;
  -ms-user-select: text;
  user-select: text;

  // @todo... colors
  .ql-mention-list-item{
    font-size: 14px;
    height: 30px;
    line-height: 30px;

    &[data-denotation-char="@"] .label {
      color: $secondary;
    }

    &[data-denotation-char="@"] .full-moon .label {
      color: $dark;
    }

    &[data-denotation-char="@"] .member .label {
      font-weight: bold;
    }

    & .channel .channel-name:before {
      color: $dark;
    }
  }
}

.message-input {
  padding: 4px 15px 0;
  width: 100%;

  .body {
    position: relative;
    margin-bottom: 2px;
    width: 100%;
    display: flex;

    .quill-editor {
      border: 1px solid transparent;
      background-color:transparent;
      flex-grow: 1;

      &:focus-within {
        outline: none;
      }
    }
  }
}

</style>
