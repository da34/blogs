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
      <ul class="menu">
        <div v-for="item in menus" :key="item.name" style="height: 100%;">
          <NuxtLink
            :to="item.url"
            tag="li"
            class="menu-item"
            exact
          >
            <SvgIcon :icon-class="item.icon" :style=" { fontSize: '24px', marginRight: '10px' } " />
            {{ item.name }}
            <ul v-if="item.children" class="sub-menu">
              <li v-for="subItem in item.children" :key="subItem.title" @click="handleOpen">
                {{ subItem.name }}
              </li>
            </ul>
          </NuxtLink>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
const NAV_LIST = [
  {
    name: '首页',
    icon: 'home',
    url: '/',
    outer: 0,
    children: [
      {
        name: '归档',
        icon: 'folder',
        url: '/archive',
        outer: 0
      }
    ]
  },
  {
    name: '归档',
    icon: 'folder',
    url: '/archive',
    outer: 0
  },
  {
    name: '朋友',
    icon: 'friend',
    url: '/link',
    outer: 0
  }
]
export default {
  name: 'Navbar',
  data () {
    return {
      curNav: '首页'
    }
  },
  computed: {
    menus () {
      let menu = this.$store.getters.menu
      menu = NAV_LIST.concat(menu)
      return menu
    }
  },
  methods: {
    handleOpen () {
      // console.log(1111)
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
  width 55%
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

      .menu-item
        //color $font-color
        text-align center
        position relative
        cursor pointer
        padding 0 10px
        margin 0 5px
        font-weight 700
        height 100%
        display flex
        align-items center
        font-size 19px
        font-weight 700

        .sub-menu
          width 80px
          position absolute
          top 50px
          right 50%
          color $font-color
          display none
          background-color $background-color
          text-align center
          transform translate(50%)
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
          border-radius 2px
          transition all .4s
          opacity 0

          li
            &:hover
              color $active-color

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

          .sub-menu
            opacity 1
            display block

@media (max-width: 768px)
  .site-nav
    width auto
    margin-left auto

  .icon-svg
    display none
</style>
