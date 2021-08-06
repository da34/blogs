<template>
  <div id="editor">
    <div class="markdown-body" :style="styleObj" v-html="content" />
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
        // renderer: this.renderer(),
        highlight (code) {
          // 增加行数
          // <span class="line-number" >${i + 1}</span>
          // 按行分组
          let codeStr = hljs.highlightAuto(code).value.match(/[^\r\n]+/g)
          codeStr = codeStr.map((str, i) => `<div class="line">${str}</div>`).join('')
          return codeStr
        },
        gfm: true, // 默认为true。 允许 Git Hub标准的markdown.
        tables: true, // 默认为true。 允许支持表格语法。该选项要求 gfm 为true。
        breaks: true, // 默认为false。 允许回车换行。该选项要求 gfm 为true。
        pedantic: false, // 默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
        sanitize: false, // 对输出进行过滤（清理）
        smartLists: true,
        smartypants: false, // 使用更为时髦的标点，比如在引用语法中加入破折号。
        langPrefix: ''
      })
      marked.use({ renderer: this.renderer() })
    },
    renderer () {
      const renderer = {
        heading (text, level, raw, slugger) {
          const id = slugger.slug(text)
          const className = level <= 4 ? 'toc-title' : ''
          return `<h${level} class="${className}" id="${id}">${text}</h${level}>
`
        },
        image (url, title, alt) {
          return `<img src="${url}" alt="${alt || '玉捷'}" title="${title || '玉捷'}"">`
        }
      }
      return renderer
    }
  }
}
</script>
<style lang="stylus" scoped>
//.markdown-body
//  box-sizing border-box
//  padding: 15px
//  @media (max-width 786px)
//    padding 0
</style>
