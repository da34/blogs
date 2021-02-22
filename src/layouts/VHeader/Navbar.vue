<template>
  <div class="site-nav">
    <nav class="mobile-fit-control">
      <!--      <el-dropdown trigger="click" class="dropdownMenu" @command="handleClick">-->
      <!--        <span class="el-dropdown-link">-->
      <!--          {{ curNav }}<i class="el-icon-arrow-down el-icon&#45;&#45;right" />-->
      <!--        </span>-->
      <!--        <el-dropdown-menu slot="dropdown">-->
      <!--          <el-dropdown-item v-for="item in navList" :key="item.title" :command="item.title">-->
      <!--            <nuxt-link :to="item.path">-->
      <!--              {{ item.title }}-->
      <!--            </nuxt-link>-->
      <!--          </el-dropdown-item>-->
      <!--        </el-dropdown-menu>-->
      <!--      </el-dropdown>-->
      <div class="menu">
        <div v-for="menu in menus" :key="menu.name" class="menu-one">
          <NuxtLink
            :to="menu.url | externalUrl(menu.articleId)"
            class="menu-item"
            :target="isExternal(menu.url) ? '_blank' : '_self' "
            exact
          >
            <SvgIcon :icon-class="menu.icon" :style=" { fontSize: '24px', marginRight: '10px' } " />
            {{ menu.name }}
            <SvgIcon
              v-if="menu.sub_menus.length"
              class="down"
              icon-class="down"
              :style=" { fontSize: '18px', marginLeft: '5px' } "
            />
          </NuxtLink>
          <div class="sub-menu">
            <NuxtLink
              v-for="subItem in menu.sub_menus"
              :key="subItem.name"
              :to="subItem.url | externalUrl(subItem.articleId)"
              :target="isExternal(subItem.url) ? '_blank' : '_self' "
            >
              {{ subItem.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  name: 'Navbar',
  filters: {
    externalUrl (url, q) {
      if (isExternal(url)) {
        return '/' + url
      }
      if (q) { url += `?q=${q}` }
      return url
    },
    isQuery (url) {

    }
  },
  data () {
    return {
      curNav: '首页'
    }
  },
  computed: {
    menus () {
      return this.$store.getters.menu
    }
  },
  methods: {
    handleOpen () {
      // console.log(1111)
    },
    isExternal (path) {
      return isExternal(path)
    },
    handleClick (v) {
      this.curNav = v
      console.log(v)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
@import '~assets/css/animation'
.site-nav
  position relative
  width 60%
  height 100%

  .mobile-fit-control
    width 100%
    height @height
    font-size $font-size-medium

    .dropdownMenu
      width 100%
      height 50px
      display flex
      align-items center
      @media (min-width 768px)
        display none

      .el-dropdown-link
        color $active-color

    .menu
      width 100%
      height 100%
      display flex
      align-items center
      @media (max-width 768px)
        margin 0
        display none
        .menu-item
          flex 1
          margin 0 !important
          padding 0 !important

      .menu-one
        height 100%
        position relative

        &:hover
          .sub-menu
            display flex
            opacity 1

      .menu-item
        padding 0 10px
        text-align center
        position relative
        cursor pointer
        margin 0 5px
        font-weight 700
        height 100%
        display flex
        align-items center
        font-size 19px

        .down
          transition all .3s

        &:before
          content ''
          position absolute
          left 50%
          bottom 0
          width 0
          height 4px
          background-color $active-color
          transition all .3s ease

        &.active-nav
          &:before
            width @width // 获取父级的宽度
            left 0

        &:hover
          color $active-color

          .down
            transform rotate(180deg)

      .sub-menu
        width 100%
        position absolute
        top 60px
        color $font-color
        display none
        background-color $background-color
        text-align center
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
        border-radius 2px
        transition all .4s
        opacity 0
        flex-direction column
        a
          font-size 16px
          padding 5px 0
          font-weight: 600;
          transition all .3s
          &:hover
            color $active-color
            background #f3f3f3

          &.active-nav
            color $active-color

@media (max-width: 768px)
  .site-nav
    width auto
    margin-left auto

  .icon-svg
    display none
</style>
