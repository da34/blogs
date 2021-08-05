<template>
  <div class="site-nav">
    <div class="menu">
      <NuxtLink
        v-for="menu in menus"
        :key="menu.path"
        :to="menu.path"
        class="menu-item"
        :exact="menu.exact"
      >
        {{menu.name}}
      </NuxtLink>
    </div>
    <div class="menu-mini">
      <svg-icon iconClass="menu" v-show="!isMobileNav" @click="isMobileNav = true" />
      <svg-icon iconClass="close-2" v-show="isMobileNav" @click="isMobileNav = false" />
    </div>
    <MobileNav :menus="menus" :visible="isMobileNav" @close="onClose" />
  </div>
</template>

<script>
import MobileNav from './MobileNav'
export default {
  name: 'Navbar',
  components: { MobileNav },
  filters: {
  },
  data () {
    return {
      isMobileNav: false,
      activeName: '/',
      menus: [
        { name: '首页', path: '/', exact: true, icon: 'article' },
        { name: '归档', path: '/archive', icon: 'archive' },
        { name: '友联', path: '/link', icon: 'link' }
      ]
    }
  },
  watch: {
    '$route' (to) {
      this.activeName = to.path
    }
  },
  methods: {
    onClose () {
      this.isMobileNav = false
    }
  }
}
</script>

<style scoped lang="stylus">
.site-nav
  color $color-subsidiary
  padding 0 50px
  border-radius 3px
  z-index 100
  display flex
  .menu
    height 100%
    display flex
    align-items center
    .menu-item
      word-break break-all
      margin-left 50px
      line-height 1.6
      font-weight: 600;
      font-size: $font-size-medium
  .menu-mini
    display none
@media (max-width: $mobile)
  .site-nav
    padding 0
    margin-left auto
    .menu
      display none
    .menu-mini
      display block
      padding-right 20px
      svg
        font-size $font-size-title
</style>
