<template>
  <section class="box-card toc-wrap shadow-none" :style="styleObj">
    <div class="box-title">
      <span>文章目录</span>
    </div>
    <div class="box-content">
      <div v-if="toc.length" ref="listRef" class="catalog-wrapper">
        <ul class="toc-list">
          <li v-for="(anchor, index) in toc" :key="index" class="item cursor-pointer" @click="handleAnchorClick(anchor)">
            <a :style="{ marginLeft: `${anchor.indent * 15}px` }">{{ anchor.title }}</a>
          </li>
        </ul>
      </div>
      <div v-else style="text-align: center;padding: 30px;">
        此文章没有目录
      </div>
    </div>
    <v-md-preview v-show="false" ref="preview" />
  </section>
</template>

<script>
import { scrollMixin } from '@/minxi/handleScroll'

const LEVEL = 'h1,h2,h3' // 获取文章的标题

export default {
  name: 'Toc',
  mixins: [scrollMixin],
  data () {
    return {
      toc: []
    }
  },
  computed: {
    styleObj () {
      let result = {
        position: 'fixed',
        width: this.clientWidth + 'px'
      }
      if (this.beforeTop > this.offsetTop) {
        result.top = this.visible ? '80px' : '20px'
      } else {
        result = {}
      }
      return result
    }
  },
  mounted () {
    this.getArticleTitle()
    this.$nextTick(() => {
      this.initHandle()
      window.addEventListener('scroll', this.titleHandleScroll)
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.titleHandleScroll)
  },
  methods: {
    // 获取文章标题
    getArticleTitle () {
      this.articleToc = document.querySelector('.v-md-editor-preview').querySelectorAll(LEVEL)
      let titles = Array.from(this.articleToc).filter(title => !!title.textContent.trim())
      if (!titles.length) {
        titles = []
        return
      }
      const hTags = Array.from(new Set(titles.map(title => title.tagName))).sort()

      titles.forEach(el => {
        const lineIndex = el.getAttribute('data-v-md-line')
        this.toc.push({
          title: el.textContent,
          lineIndex,
          indent: hTags.indexOf(el.tagName)
        })
        this.titleQuery = this.titleQuery ? ',' + lineIndex : lineIndex
      })
    },
    initHandle () {
      this.articleTocHeight = [] // 文章标题距离顶部高度
      this.linkList = [] // 文章目录

      this.linkList = this.$refs.listRef.querySelectorAll('.item')
      this.articleToc.forEach($to => {
        this.articleTocHeight.push($to.offsetTop - 50)
      })
      // 获取当前组件距离顶部的距离和宽度
      this.offsetTop = this.$el.offsetTop
      this.clientWidth = this.$el.clientWidth
    },
    titleHandleScroll () {
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.articleTocHeight.forEach((top, index) => {
        if (offsetTop > top) {
          this.linkList.forEach($item => $item && $item.classList.remove('active'))
          this.linkList[index].classList.add('active')
        }
      })
    },
    handleAnchorClick (anchor) {
      const { preview } = this.$refs
      const { lineIndex } = anchor
      const heading = document.querySelector(`.blog-post [data-v-md-line="${lineIndex}"]`)
      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.toc-wrap
  margin-top 10px
  padding 20px
  position absolute
  //position sticky
  transition top .3s
  width 100%
  //top 10px

.toc-list
  position relative
  padding-left 20px
  font-size $font-size-small
  .item
    color $color-content
    padding 7px
    padding-left 0
    border-radius 4px
    a
      display block
      position: relative
      &:before
        content: ""
        position: absolute
        top 50%
        left -15px
        margin-top -2px
        width 4px
        height 4px
        background-color currentColor
        border-radius 50%
    &:hover
      background rgba(235, 237, 239, .7)
      a
        color $color-focus
    &.active
      background rgba(235, 237, 239, .7)
      a
        color $color-focus

//.toc-title
//  &:target
//    padding-top 100px
//    margin-top -100px
</style>
