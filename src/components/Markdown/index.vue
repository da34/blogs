<template>
  <div id="editor">
    <!--    eslint-disable-->
    <div class="markdown-body" v-html="content" :style="styleObj" />
  </div>
</template>
<script>
import marked from 'marked'
import hljs from './hljs'

export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    styleObj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    content: {
      get () {
        return marked(this.value)
      },
      set (v) {
        return marked(v)
      }
    }
  },
  watch: {
    value (newVla) {
      this.content = marked(newVla)
    }
  },
  created () {
    this.initMarked()
  },
  methods: {
    initMarked () {
      marked.setOptions({
        renderer: this.renderImg(),
        highlight (code) {
          // 增加行数
          // <span class="line-number" >${i + 1}</span>
          // 按行分组
          let codeStr = hljs.highlightAuto(code).value.match(/[^\r\n]+/g)
          codeStr = codeStr.map((str, i) => `<div class="line">${str}</div>`).join('')
          return codeStr
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      })
    },
    renderImg () {
      const renderer = new marked.Renderer()
      renderer.image = (url, title, alt) => {
        return `
          <img src="${url}" alt="${alt || '玉捷'}" title="${title || '玉捷'}"">
        `
      }
      // renderer.code = (code, info, escaped) => {
      //   console.log(code, info, escaped)
      //   return `
      //     <code>${code}</code>
      //   `
      // }
      return renderer
    }
  }
}
</script>
<style lang="stylus" scoped>
  .markdown-body
    box-sizing border-box
    padding: 15px
    @media (max-width 786px)
      padding 0
</style>
