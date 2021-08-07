<template>
  <section class="box-card toc-wrap" :style="styleObj">
    <div class="box-title">
      <span>文章目录</span>
    </div>
    <div class="box-content">
      <div class="catalog-wrapper" v-html="toc" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { getToc } from '@/utils/index'
import { scrollMixin } from '@/minxi/handleScroll'
import marked from 'marked'

export default {
  name: 'ArticleToc',
  mixins: [scrollMixin],
  computed: {
    ...mapState('modules/content', [
      'article'
    ]),
    toc () {
      const content = this.article.content
      return content && getToc(marked(content))
    },
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
    this.initHandle()
    this.titleHandleScroll()
  },
  destroyed () {
    window.removeEventListener('scroll', this.titleHandleScroll)
  },
  methods: {
    initHandle () {
      this.listTocHeight = []
      this.listToc = []
      this.linkList = []

      this.listToc = document.querySelectorAll('.toc-title')
      this.linkList = document.querySelectorAll('.toc-list .item')

      this.listToc.forEach($to => {
        this.listTocHeight.push($to.offsetTop - 50)
      })
      // 获取当前组件距离顶部的距离和宽度
      this.offsetTop = this.$el.offsetTop
      this.clientWidth = this.$el.clientWidth
      // 绑定事件
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('scroll', this.titleHandleScroll)
    },
    titleHandleScroll () {
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.listTocHeight.forEach((top, index) => {
        if (offsetTop > top) {
          this.linkList.forEach($item => $item.classList.remove('active'))
          this.linkList[index].classList.add('active')
        }
      })
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
    padding 5px
    padding-left 0
    border-radius 4px
    &:hover
      background rgba(235, 237, 239, .7)
      a
        color $color-focus
    &.active
      background rgba(235, 237, 239, .7)
      a
        color $color-focus
  li
    list-style disc
.toc-title
  &:target
    padding-top 100px
    margin-top -100px
</style>
