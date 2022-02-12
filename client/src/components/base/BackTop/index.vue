<template>
  <!--  <transition name="scroll">-->
  <div>
    <transition name="scroll">
      <div v-show="visible" class="back-wrapper hidden md:block" @click="handleTo" />
    </transition>
    <div v-show="visible" class="cursor-pointer fixed right-4 bottom-8 w-10 h-10 bg-white text-center rounded-full md:hidden" @click="handleTo">
      <span class="relative -top-1 border-8 border-solid border-x-transparent border-t-transparent border-b-black" />
    </div>
  </div>

  <!--  </transition>-->
</template>

<script>
import { appendBody } from '@/minxi/appendBody'
let scrollTo
if (process.client) {
  scrollTo = require('@/utils/scroll-to').scrollTo
}

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
      visible: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleTo () {
      scrollTo(0, 500)
    },
    handleScroll () {
      const offsetTop = document.body.scrollTop || document.documentElement.scrollTop
      this.visible = offsetTop > this.visibilityHeight
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
