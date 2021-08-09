<template>
  <div class="site-nav">
    <div class="menu">
      <PerfectLink
        v-for="menu in addMenus"
        :key="menu.url"
        :to="menu.url"
        class="menu-item"
        :exact="menu.exact"
        :target="menu.target || '_self'"
      >
        {{ menu.name }}
      </PerfectLink>
    </div>
    <div class="menu-mini">
      <svg-icon v-show="!isMobileNav" icon-class="menu" @click="isMobileNav = true" />
      <svg-icon v-show="isMobileNav" icon-class="close-2" @click="isMobileNav = false" />
    </div>
    <MobileNav :menus="addMenus" :visible="isMobileNav" @close="onClose" />
  </div>
</template>

<script>
import PerfectLink from '@/components/PerfectLink'
import { mapState } from 'vuex'
import MobileNav from './MobileNav'
export default {
  name: 'Navbar',
  components: { PerfectLink, MobileNav },
  data () {
    return {
      isMobileNav: false,
      activeName: '/'
    }
  },
  computed: {
    ...mapState('modules/front', [
      'menus'
    ]),
    addMenus () {
      const defaultMenus = [
        { name: '首页', url: '/', exact: true, icon: 'article' },
        { name: '归档', url: '/archive', icon: 'archive' },
        { name: '友联', url: '/link', icon: 'link' }
      ]
      return defaultMenus.concat(this.menus)
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
