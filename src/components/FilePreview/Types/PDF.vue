<template>
  <div
    @click="$emit('openPreview', { pdf })"
    :style="previewStyle"
    :class="[...previewClass, 'pdf-preview', inline ? 'inline' : '', $listeners.click ? 'clickable' : '']">

    <!-- Container for pdf's pages -->
    <div
      v-show="show"
      class="pages"
      ref="pages"></div>

    <div v-if="!show && labels.loading">
      <p>{{ labels.loading }}</p>
    </div>

    <div v-if="!inline && labels.downloadForAll && show && hasMore">
      <p>{{ labels.downloadForAll }}</p>
    </div>
    <div v-else-if="inline && labels.firstPagePreview && show">
      <p>{{ labels.firstPagePreview }}</p>
    </div>
  </div>
</template>

<script>
import pdfjs from 'pdfjs-dist'
import Base from './Base'

// Helper structure for page params
class Page {
  constructor (index) {
    this.index = index
    this.page = null
    this.loading = false
    this.loaded = false
    this.rendered = false
    this.failed = false
    this.node = undefined
  }
}

export default {
  extends: Base,

  props: {
    maxPages: {
      required: false,
      default: 5,
    },

    initialScale: {
      required: false,
      default: 1,
    },
  },

  data () {
    return {
      scale: this.initialScale,
      pdf: null,
      pages: [],
      show: false,
    }
  },

  computed: {
    pageCount () {
      if (!this.pdf) return
      return this.pdf.numPages
    },

    hasMore () {
      return this.maxPages < this.pageCount
    },
  },

  created () {
    if (!this.src) {
      this.$emit('error', { message: 'src.missing' })
      return
    }

    this.$nextTick(() => {
      if (typeof this.src === 'object') {
        this.documentLoaded(this.src)
      } else {
        pdfjs.getDocument(this.src).then(this.documentLoaded, (err) => this.$emit('error', err))
      }
    })
  },

  methods: {
    documentLoaded (pdf) {
      this.pdf = pdf
      const rf = this.$refs.pages
      const pgCount = Math.min(this.pageCount, this.maxPages)
      this.pages = [...new Array(pgCount)].map((_, i) => new Page(i))

      // Placeholder untill the page loads
      const placeholder = () => {
        const node = document.createElement('div')
        node.classList.add('loader')
        if (this.labels.pageLoading) {
          node.innerHTML = this.labels.pageLoading
        }
        return node
      }

      const pageCanvas = () => {
        return document.createElement('canvas')
      }

      const failedPage = () => {
        const node = document.createElement('div')
        node.classList.add('failed')
        if (this.labels.pageLoadFailed) {
          node.innerHTML = this.labels.pageLoadFailed
        }
        return node
      }

      // Loadup pages
      // pdfjs starts with 1!
      for (let i = 0; i < pgCount; i++) {
        const node = placeholder()
        rf.appendChild(node)
        this.pages[i].loading = true
        this.pages[i].node = node

        this.pdf.getPage(i + 1).then((page) => {
          const np = new Page(i)
          np.loading = false
          np.loaded = true
          np.page = page

          // Render page
          const canvas = pageCanvas()
          const scale = this.scale
          const viewport = page.getViewport(scale)
          const canvasContext = canvas.getContext('2d')
          const renderContext = { canvasContext, viewport }
          canvas.height = viewport.height
          canvas.width = viewport.width

          // .replaceChild removes the need from worrying about page order
          page.render(renderContext).then(() => {
            np.node = canvas
            np.rendered = true

            if (this.inline) {
              canvas.classList.add('inline')
            }
            rf.replaceChild(canvas, this.pages[i].node)
          })
            .catch((err) => {
              this.$emit('error', err)
              const node = failedPage()
              np.node = node
              np.rendered = false
              np.failed = true
              rf.replaceChild(node, this.pages[i].node)
            })
            .finally(() => {
              if (i === 0) {
                this.show = true
              }

              this.pages.splice(i, 1, np)
            })
        })
      }
    },
  },
}
</script>

<style lang="scss">
// Style not scoped, since pages are manually rendered

.pdf-preview {
  text-align: center;
  &:not(.inline) {
    padding-top: 20px;
    padding-bottom: 20px;
    canvas {
      box-shadow: 0 0 3px #1E1E1E41;
    }
  }
  &.inline {
    height: 200px;
    overflow-y: scroll;
    display: inline-block;
    cursor: zoom-in;
    width: 100%;
    max-width: 500px;
  }

  canvas {
    margin-bottom: 10px;
    &.inline {
      width: 100%;
    }

    &:not(.inline) {
      margin: 0 auto 10px auto;
      display: block;
    }

    &:last-of-type {
      margin-bottom: unset;
    }
  }

  .loader {
    margin-bottom: 10px;
  }
}
</style>
