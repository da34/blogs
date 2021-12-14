<template>
  <div>
    <div class="flex">
      <NuxtLink
        v-for="menu in defaultMenus"
        :key="menu.url"
        :to="menu.url"
        class="break-all ml-14 font-semibold h-full text-lg"
        :exact="menu.exact"
      >
        {{ menu.name }}
      </NuxtLink>
    </div>
    <div class="hidden">
      <svg-icon v-show="!isMobileNav" icon-class="menu" @click="isMobileNav = true" />
      <svg-icon v-show="isMobileNav" icon-class="close-2" @click="isMobileNav = false" />
    </div>
    <MobileNav :menus="defaultMenus" :visible="isMobileNav" @close="onClose" />
  </div>
</template>

<script>
import MobileNav from './MobileNav'
export default {
  name: 'Navbar',
  components: { MobileNav },
  data () {
    return {
      isMobileNav: false,
      activeName: '/',
      defaultMenus: [
        { name: '首页', url: '/', exact: true, icon: 'article' },
        { name: '归档', url: '/archive', icon: 'archive' },
        { name: '友联', url: '/link', icon: 'link' },
        { name: '留言', url: '/link', icon: 'link' },
        { name: '建站', url: '/link', icon: 'link' },
        { name: '关于', url: '/link', icon: 'link' }
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

<!--<style scoped lang="stylus">-->
<!--@media (max-width: $mobile)-->
<!--  .site-nav-->
<!--    padding 0-->
<!--    margin-left auto-->
<!--    .menu-->
<!--      display none-->
<!--    .menu-mini-->
<!--      display block-->
<!--      padding-right 20px-->
<!--      svg-->
<!--        font-size $font-size-title-->
<!--</style>-->
