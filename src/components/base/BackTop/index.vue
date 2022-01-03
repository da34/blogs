<template>
  <transition name="scroll">
    <div v-if="visible && isBig" class="back-wrapper" @click="handleTo" />
    <div v-if="visible && !isBig" class="min-back" @click="handleTo">
      <span class="triangle" />
    </div>
  </transition>
</template>

<script>
import { throttle } from '@/utils'
import { appendBody } from '@/minxi/appendBody'
let scrollTo
if (process.client) {
  scrollTo = require('@/utils/scroll-to').scrollTo
}

const MAX_WIDTH = 1200
export default {
  name: 'BackTop',
  mixins: [appendBody],
  props: {
    visibilityHeight: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      isBig: true,
      visible: false
    }
  },
  mounted () {
    this.handleResize()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', throttle(this.handleResize, 500))
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleTo () {
      scrollTo(0, 500)
    },
    handleScroll () {
      const offsetTop = document.body.scrollTop || document.documentElement.scrollTop
      this.visible = offsetTop > this.visibilityHeight
    },
    handleResize () {
      // 切换backTop
      const { width } = document.documentElement.getBoundingClientRect()
      this.isBig = width > MAX_WIDTH
    }
  }
}
</script>

<style scoped lang="stylus">
.back-wrapper
  cursor pointer
  position fixed
  right 70px
  top -100px
  width 70px
  height 90%
  animation move 3s infinite
  z-index 99
  background url("~/assets/images/scroll.png") no-repeat center bottom
  &.scroll-enter-active, &.scroll-leave-active
    transition all .7s
  &.scroll-enter, &.scroll-leave-to
    top -900px
  @media  (max-width 1200px)
    display none
.min-back
  cursor pointer
  position fixed
  right 30px
  bottom 90px
  width 40px
  height 40px
  background #fff
  border-radius 50%
  z-index 9999
  shadow-3-down()
  text-align center
  border 1px solid $color-line-1
  &:hover
    box-shadow 0 0 5px rgba(0,0,0,.3)
    .triangle
      border-color transparent transparent $color-focus
  .triangle
    width 0
    height 0
    position relative
    top -3px
    border-width 7px
    border-style solid
    border-color transparent transparent $color-title transparent
@keyframes move
  0% {
    transform translateY(0)
  }
  50% {
    transform translateY(-10px)
  }
  100% {
    transform translateY(0)
  }
</style>
