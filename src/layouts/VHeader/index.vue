<template>
  <div style="position: relative">
    <transition name="fade">
      <div class="header-wrapper" :style="headerStyle">
        <!--      <Blur />-->
        <header class="header">
          <div class="logo">
            <NuxtLink to="/">
              <h2>玉捷のcode</h2>
<!--              <img src="~/assets/images/logo.png">-->
            </NuxtLink>
          </div>
          <Navbar/>
          <Search/>
          <!--        <User />-->
        </header>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from './Search'
import Navbar from './Navbar'

export default {
  name: 'VHeader',
  components: {
    Search,
    Navbar
  },
  data () {
    return {
      headerStyle: {},
      bgStyle: { backgroundImage: 'url(https://w.wallhaven.cc/full/72/wallhaven-72ggwe.png)' }
    }
  },
  computed: {
    ...mapGetters([
      'article'
    ])
  },
  watch: {
    // '$route.path' (newVal) {
    //   if (newVal.match(/\//g).length === 1) {
    //     this.bgStyle.backgroundImage = 'url(https://w.wallhaven.cc/full/72/wallhaven-72ggwe.png)'
    //   } else {
    //     this.bgStyle.backgroundImage = `url(${this.article.imageUrl})`
    //   }
    // }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop
      // console.log(offsetTop)
      this.visible = offsetTop > 50
      this.visible
        ? this.headerStyle = {
          height: '68px'
        }
        : this.headerStyle = {}
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
.introduce
  position absolute
  top 50%
  left 50%
  width 100%
  height 100%
  transform translate(-50%, -50%)
  display flex
  justify-content center
  align-items center

  div
    color #fff

    p
      font-family: Cursive, Lucida;
      font-weight: 400;
      line-height: 1.67;
      text-shadow: 0 0.1875rem 0.3125rem #1c1f21
      font-size 20px

    .name
      font-size 40px
      letter-spacing 2px
      font-weight: 700;

  .blog-header
    padding 20px 0
    text-align center

    .title
      font-size 45px
      margin-bottom 5px

    .entry-meta
      padding-top 10px
      font-size 14px

      .icon-svg
        padding-right 3px

      .m-r-sm
        margin-right 10px

.header-wrapper
  position fixed
  top 0
  left 0
  right 0
  z-index 300
  height 60px
  overflow hidden
  color #000
  transition all .3s
  box-shadow 0 .125rem .25rem rgba(0, 0, 0, .075);
  background-color rgba(255,255,255,0.7)
  backdrop-filter blur(20px)
  @media (max-width 768px)
    height 50px
    padding 0 20px

  &.fade-enter-active, &.fade-leave-active
    transition all .2s

  &.fade-enter, &.fade-leave-to
    height 70px
    background-color $background-color

  .header
    height 100%
    margin 0 auto
    position relative
    display flex
    /*justify-content space-between*/

    .logo
      flex 0 0 200px
      /*padding-left 10px*/
      cursor pointer
      display flex
      align-items center
      color #000
      @media (max-width 768px)
        width 200px
      h2
        font-weight 700
        font-size 25px
    @media (min-width 768px)
      width 100%
    @media (min-width 992px)
      width 970px
    @media (min-width 1200px)
      width 1135px

</style>
