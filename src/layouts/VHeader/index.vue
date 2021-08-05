<template>
  <div style="position: relative">
    <transition name="fade">
      <div v-show="visible" class="header-wrapper">
        <header class="header">
          <Logo />
          <!--          <Search/>-->
          <Navbar />
<!--          <User class="user" />-->
        </header>
      </div>
    </transition>
  </div>
</template>

<script>
// import Search from './Search'
import { scrollMixin } from '@/minxi/handleScroll'
import Logo from '@/components/Logo'
import Navbar from './Navbar'
// import User from './User'

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
.header-wrapper
  position fixed
  top 0
  left 0
  right 0
  z-index 99
  height 65px
  color $color-title
  transition all .3s
  box-shadow 0 .125rem .25rem rgba(0, 0, 0, .075);
  background-color rgba(255, 255, 255, 0.7)
  backdrop-filter blur(20px)

  &.fade-enter-active, &.fade-leave-active
    transition all .3s

  &.fade-enter, &.fade-leave-to
    height 0
  .header
    width $width
    height 100%
    margin 0 auto
    position relative
    display flex
    //justify-content center
    align-items center

@media (max-width: $mobile)
  .header-wrapper
    height 52px
    .header
      width 100%
      .logo
        padding-left 20px
</style>
