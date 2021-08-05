<template>
  <!--  <transition name="navFade">-->
  <!--    <nav class="article-catalog" :style="{ top: visible ? '80px' : '10px' }">-->
  <!--      <div class="catalog-title">-->
  <!--        目录-->
  <!--      </div>-->
  <!--      <div class="catalog-wrapper" v-html="toc" />-->
  <!--    </nav>-->
  <section class="box-card toc-wrap">
    <div class="box-title">
      <span>文章目录</span>
    </div>
    <div class="box-content">
      <div class="catalog-wrapper" v-html="toc" />
    </div>
  </section>
<!--  </transition>-->
</template>

<script>
import { mapState } from 'vuex'
import { getToc } from '@/utils/index'
import { scrollMixin } from '@/minxi/handleScroll'
import marked from 'marked'

export default {
  name: 'ArticleToc',
  mixins: [scrollMixin],
  data () {
    return {
      linkList: [],
      listToc: [],
      listTocHeight: []
    }
  },
  computed: {
    ...mapState('modules/content', [
      'article'
    ]),
    toc () {
      const content = this.article.content
      return content && getToc(marked(content))
    }
  },
  watch: {
    '$route' (route) {
      const hash = decodeURIComponent(route.hash)
      const $dom = document.getElementsByClassName(hash)[0]
      this.linkList.length && this.linkList.forEach($link => $link.classList.remove('active'))
      if ($dom) {
        $dom.classList.add('active')
      }
    }
  },
  mounted () {
    this.getCatalogList()
    this.getTitleHeight()
    this.titleHandleScroll()
    window.addEventListener('scroll', this.titleHandleScroll)
  },
  destroyed () {
    this.linkList = []
    window.removeEventListener('scroll', this.titleHandleScroll)
  },
  methods: {
    titleHandleScroll () {
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.listTocHeight.forEach((top, index) => {
        if (offsetTop > top && offsetTop < this.listTocHeight[index + 1]) {
          this.linkList.forEach($item => $item.classList.remove('active'))
          this.linkList[index].classList.add('active')
        }
      })
      // console.log(offsetTop)
    },
    getCatalogList () {
      this.listToc = document.querySelectorAll('.toc-title')
      this.linkList = document.getElementsByClassName('item')
    },
    // 获取每个标题的Y的距离
    getTitleHeight () {
      this.listToc.forEach($to => {
        this.listTocHeight.push($to.offsetTop - 50)
      })
      // console.log(this.listTocHeight)
    }
  }
}
</script>

<style lang="stylus" scoped>

.toc-wrap
  margin-top 10px
  padding 20px
  position sticky
  top 80px
  transition top .3s

//.article-catalog
//  position: sticky;
//  margin-top 10px
//  top 80px
//  transition top .3s

//.catalog-title
//  font-size: 16px
//  color: #000
//
//.catalog-wrapper
//  &:before
//    content: ""
//    position: absolute
//    top 30px
//    left 7px
//    bottom 0
//    width 3px
//    background-color: #EFF1F2;
//
//.catalog-list > .catalog-list
//  margin 0
//
//  .item
//    font-weight normal
//
//    a
//      padding-left 35px
//
//      &:before
//        width: 4px;
//        height: 4px;
//        left 24px
//
//.catalog-list
//  margin 7px 0
//  position relative
//
//  .item
//    font-size 16px
//    font-weight 700
//    color #333
//    margin 3px 0
//
//    &.active
//      background rgba(235, 237, 239, .7)
//      color $color-focus
//
//    a
//      color inherit
//      position relative
//      text-omit(1)
//      padding 2px 0 2px 20px
//
//      &:before
//        content: "";
//        position: absolute;
//        top: 50%;
//        left: 6px;
//        margin-top: -2px;
//        width: 6px;
//        height: 6px;
//        background-color: currentColor;
//        border-radius: 50%;
//
//      &:hover
//        background rgba(235, 237, 239, .7)
//.toc-title:target
//  padding-top 80px
//  margin-top -80px
</style>
