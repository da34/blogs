<template>
  <div class="app-wrapper">
    <section class="app-main">
      <div class="fl">
        <transition name="fade-transform" mode="out-in">
          <nuxt />
        </transition>
      </div>
      <SideInfo />
    </section>
  </div>
</template>

<script>
import SideInfo from './SideInfo'
export default {
  name: 'AppMain',
  components: { SideInfo },
  data () {
    return {
    }
  },
  computed: {
    // list () {
    //   // return this.$store.state.article.topArticle
    // }
  }
  // watch: {
  //   '$route.path' (newVal) {
  //     newVal !== '/' ? this.offsetTop = '100px' : this.offsetTop = '120px'
  //   }
  // },
  // mounted () {
  //   const path = this.$route.path
  //   path !== '/' ? this.offsetTop = '100px' : this.offsetTop = '120px'
  // }
}
</script>

<style scoped lang="stylus">
.app-wrapper
  position relative
  margin 20px auto 0
  @media (min-width: 768px) {
    width: 100%;
  }

  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: 1200px;
  }

  @media (max-width 768px)
    top -20px
.app-main
  position relative
  display flex
  width 100%
  @media (max-width: 768px)
    box-sizing border-box
    padding 10px
    margin-top 0
  .fl
    font-size: 16px;
    padding-bottom 50px
    width calc( 100% - 300px )
    .fade-transform-leave-active, .fade-transform-enter-active
      transition all 0.5s
    .fade-transform-enter {
      opacity: 0;
      transform: translateX(-30px);
    }

    .fade-transform-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }

    @media (max-width: 992px) {
      width: 100%;
      padding: 0 15px;
    }

    @media (max-width: 768px)
      padding 0
.el-carousel__item img {
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  object-fit cover
}
.slide
  border-radius 5px
  overflow hidden
  position relative
  @media (max-width: 768px)
    padding 10px
    .el-carousel
      border-radius 5px

  img
    position absolute
    top 0
    left 0
    //opacity .5
  .article-desc
    position relative
    z-index 2
    width 100%
    height 100%
    background rgba(0,0,0,.38)
    color #fff
    font-size 14px
    display flex
    justify-content center
    align-items center
    flex-direction column
    div.title
      transition all .3s
      transition-delay .4s
      letter-spacing 2px
      font-size 25px
      margin-bottom 10px
      opacity 0
      cursor pointer
    .info
      transition all .3s
      transition-delay .5s
      opacity 0
      span
        margin-right 5px
.el-carousel__item.is-active
  div.title
    opacity 1
    transform translateY(-7px) scale(1.1)
  .info
    opacity 1
    transform translateY(-7px)
//.el-carousel__item
//  .article-desc
//    background pink
</style>
