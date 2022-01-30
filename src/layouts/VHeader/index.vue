<template>
  <div class="relative">
    <transition name="fade">
      <div v-show="visible" class="fixed w-full px-4 py-1 md:px-0 inset-0 md:h-[65px] h-[60px] text-slate-900 bg-white shadow duration-300 z-50 backdrop-blur-md">
        <header class="flex m-auto h-full items-center xl:max-w-screen-xl w-full">
          <Logo class="order-3 ml-3 md:m-0 md:order-1" />
          <Navbar class="order-2" />
        </header>
      </div>
    </transition>
  </div>
</template>

<script>
import Navbar from './Navbar'
import { scrollMixin } from '@/minxi/handleScroll'
import Logo from '@/components/Logo'

export default {
  name: 'VHeader',
  components: {
    Logo,
    // User,
    // Search,
    Navbar
  },
  mixins: [scrollMixin]
}
</script>

<style scoped lang="stylus">
.fade-enter-active, &.fade-leave-active
    transition all .3s

.fade-enter, &.fade-leave-to
    height 0

@media (max-width: $mobile)
  .header-wrapper
    height 52px
    .header
      width 100%
      .logo
        padding-left 5px
</style>
