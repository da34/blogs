<template>
  <div class="site-nav">
    <div class="menu">
      <NuxtLink
        v-for="menu in menus"
        :key="menu.path"
        :to="menu.path"
        class="menu-item"
        exact
      >
        {{menu.name}}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  filters: {
  },
  data () {
    return {
      isMobileNav: false,
      activeName: '/',
      menus: [
        { name: '首页', path: '/' },
        { name: '项目', path: '/project' },
        { name: '友联', path: '/link' },
        { name: '关于', path: '/about' }
      ]
    }
  },
  watch: {
    '$route' (to) {
      this.activeName = to.path
    }
  }
}
</script>

<style scoped lang="stylus">
.site-nav
  flex 1
  height 100%
  color $color-subsidiary
  padding 0 50px
  border-radius 3px
  z-index 100
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
</style>
