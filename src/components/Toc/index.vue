<template>
  <section class="box-card toc-wrap" :style="styleObj">
    <div class="box-title">
      <span>文章目录</span>
    </div>
    <div class="box-content">
      <div v-if="toc.length" class="catalog-wrapper" ref="listRef">
        <ul class="toc-list">
          <li v-for="(anchor, index) in toc" :key="index" class="item" @click="handleAnchorClick(anchor)">
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
import { mapState } from 'vuex'
import { scrollMixin } from '@/minxi/handleScroll'
import VMdPreview, { xss } from '@kangc/v-md-editor/lib/preview'

const LEVEL = 'h1,h2,h3' // 获取文章的标题

export default {
  mixins: [scrollMixin],
  computed: {
    ...mapState('modules/content', [
      'content'
    ]),
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
    },
    toc () {
      if (process.client && this.content) {
        const html = xss.process(VMdPreview.themeConfig.markdownParser.render(this.content))
        const $div = document.createElement('div')
        $div.innerHTML = html

        const anchors = $div.querySelectorAll(LEVEL) // 获取h标签
        let titles = Array.from(anchors).filter(title => !!title.textContent.trim())

        if (!titles.length) {
          titles = []
          return []
        }

        const hTags = Array.from(new Set(titles.map(title => title.tagName))).sort()

        return titles.map(el => ({
          title: el.textContent,
          lineIndex: el.getAttribute('data-v-md-line'),
          indent: hTags.indexOf(el.tagName)
        })) || []
      }
      return []
    }
  },
  mounted () {
    this.initHandle()
    window.addEventListener('scroll', this.titleHandleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.titleHandleScroll)
  },
  methods: {
    initHandle () {
      this.articleTocHeight = []
      this.articleToc = []
      this.linkList = []
      let titleQuery = ''
      this.toc.forEach((item, i) => {
        const { lineIndex } = item
        if (i === 0) {
          titleQuery += `[data-v-md-line="${lineIndex}"]`
        } else {
          titleQuery += `,[data-v-md-line="${lineIndex}"]`
        }
      })
      console.log(titleQuery, 'titleQuery')
      // 文章存在标题，才获取
      if (titleQuery) {
        this.articleToc = document.querySelectorAll(titleQuery)
        this.linkList = this.$refs.listRef.querySelectorAll('.item')
        console.log(this.articleToc, 'this.articleToc')
        this.articleToc.forEach($to => {
          this.articleTocHeight.push($to.offsetTop - 50)
        })
      }
      // 获取当前组件距离顶部的距离和宽度
      this.offsetTop = this.$el.offsetTop
      this.clientWidth = this.$el.clientWidth
    },
    titleHandleScroll () {
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop
      // console.log(offsetTop, 'offsetTop')
      // console.log(this.linkList, 'this.linkList')
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
  transition top .4s
  width 100%

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
