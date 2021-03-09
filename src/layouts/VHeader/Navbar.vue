<template>
  <div class="site-nav">
    <div>
      <SvgIcon class="icon-svg" icon-class="menu" @click="isMobileNav = true" />
      <Drawer v-model="isMobileNav" :closable="false">
        <Menu :theme="theme" :active-name="activeName" accordion width="auto">
          <div v-for="menu in menus" :key="menu.name">
            <MenuItem
              v-if="!menu.sub_menus.length"
              :name="menu.url"
              :to="menu.url | externalUrl(menu.articleId)"
              :target="isExternal(menu.url) ? '_blank' : '_self' ">
              <SvgIcon class="menu-icon" :icon-class="menu.icon" />
              {{ menu.name }}
            </MenuItem>
            <Submenu v-else :name="menu.url">
              <div slot="title"  style="padding: 0">
                <SvgIcon class="menu-icon" :icon-class="menu.icon" />
                {{ menu.name }}
              </div>
              <MenuItem
                v-for="subItem in menu.sub_menus"
                :to="subItem.url | externalUrl(subItem.articleId)"
                :target="isExternal(subItem.url) ? '_blank' : '_self' "
                :key="subItem.name"
                :name="subItem.url">
                {{ subItem.name }}
              </MenuItem>
            </Submenu>
          </div>
        </Menu>
      </Drawer>
    </div>
    <nav class="menu">
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
      if (q) {
        url += `?q=${q}`
      }
      return url
    }
  },
  data () {
    return {
      isMobileNav: false,
      theme: 'light',
      activeName: '/'
    }
  },
  watch: {
    '$route' (to) {
      this.activeName = to.path
    }
  },
  computed: {
    menus () {
      return this.$store.getters.menu
    }
  },
  methods: {
    isExternal (path) {
      return isExternal(path)
    },
    handleClick () {
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
@import '~assets/css/animation'
.site-nav
  position relative
  height 100%
  flex: 1;
  margin-left: 50px;
  .menu
    width 100%
    height 100%
    display flex
    align-items center

    .menu-one
      height 100%
      position relative
      &:hover
        .sub-menu
          height auto

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
  &.mobile
    margin 0
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
      width 100%
      left 0

  &:hover
    color $active-color
    .down
      transform rotate(180deg)
.down
  transition all .3s
.sub-menu
  width 100%
  height 0
  position absolute
  top 60px
  color $font-color
  display flex
  background-color $background-color
  text-align center
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
  border-radius 2px
  transition height .4s
  flex-direction column
  overflow hidden

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

.icon-svg
  font-size 20px
.menu-icon
  margin-right 10px

@media (max-width: 768px)
  .site-nav
    display: flex;
    align-items: center;
    order: 100;
    margin-left: 0;
    flex: 0 0 30px;
    .menu
      margin 0
      display none
>>> .ivu-drawer-body
    padding 0
>>> .ivu-menu-item,.ivu-menu-submenu
      font-size 18px
      .menu-icon
        font-size 20px
>>> .ivu-menu-submenu
      .ivu-menu-item
        font-size 16px
        padding-left 60px
@media (min-width: 768px)
  .icon-svg
    display none
</style>
