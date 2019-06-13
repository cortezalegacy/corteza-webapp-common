<script>
import pdfjs from 'pdfjs-dist'
import props from '../props'

// Helper structure for page params
class Page {
  constructor (index) {
    this.index = index
    this.page = null
    this.loading = false
    this.loaded = false
    this.rendered = false
    this.failed = false
  }
}

export default {
  mixins: [ props ],

  data () {
    return {
      scale: this.initialScale,
      pdf: null,
      pages: [],
    }
  },

  computed: {
    pageCount () {
      if (!this.pdf) return
      return this.pdf.numPages
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
      const pgCount = Math.min(this.pageCount, this.maxPages)
      this.pages = [...new Array(pgCount)].map((_, i) => new Page(i))
      console.debug('documentLoaded', { pdf, pgCount })

      // Loadup pages
      // pdfjs starts with 1!
      for (let i = 0; i < pgCount; i++) {
        this.pages[i].loading = true
        this.pdf.getPage(i + 1).then((page) => {
          const np = new Page(i)
          np.loading = false
          np.loaded = true
          np.page = page
          console.debug('page.loaded', { page: np })

          // Render page
          const canvas = this.$refs[`pg_${i}`]
          const scale = this.scale
          const viewport = page.getViewport(scale)
          const canvasContext = canvas.getContext('2d')
          const renderContext = { canvasContext, viewport }
          canvas.height = viewport.height
          canvas.width = viewport.width

          console.debug('page.render', { page, canvas, scale, viewport, canvasContext, renderContext })
          page.render(renderContext).then(() => {
              console.debug('page.rendered')
              if (this.inline) {
                // Inital canvas must be max width, to get the entire page painted
                canvas.classList.add('inline')
              }
              np.rendered = true
            })
            .catch((err) => {
              this.$emit('error', err)
              np.rendered = false
              np.failed = true
            })
            .finally(() => {
              this.pages.splice(i, 1, np)
            })
        })
      }
    },
  },

  render (h) {
    const canvases = () => {
      const nodes = []
      if (!this.pages.length) return nodes

      const makeCanvas = (i) => <canvas ref={ `pg_${i}` } key={ `pgk_${i}` } />
      for (let i = 0; i < this.pages.length - 1; i++) {
        nodes.push(makeCanvas(i))
        nodes.push(<div />)
      }
      return nodes.concat(makeCanvas(this.pages.length - 1))
    }

    return (
      <div onclick={(e) => this.$emit('openPreview', { pdf: this.pdf })} style={this.previewStyle} class={[...this.previewClass, 'pdf', this.inline ? 'inline' : '', this.$listeners.click ? 'clickable' : '']}>
        {canvases()}
      </div>
    )
  }
}
</script>

<style scoped>
.pdf {
  text-align: center;
}
.pdf:not(.inline) {
  padding-top: 20px;
  padding-bottom: 20px;
}
.pdf.inline {
  height: 200px;
  overflow-y: scroll;
  box-shadow: 0 0 3px #1E1E1E41;
  display: inline-block;
}
.pdf:not(.inline) canvas {
  box-shadow: 0 0 3px #1E1E1E41;
}
.pdf div {
  height: 10px;
}
.pdf.inline {
  cursor: zoom-in;
}

.pdf canvas.inline {
  width: 100%;
  max-width: 500px;
}
</style>
