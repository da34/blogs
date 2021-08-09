<template>
  <div class="mobile-header">
    <transition
      name="fade"
      @enter="enter"
      @leave="leave"
    >
      <div v-if="visible" class="mobile-nav">
        <PerfectLink
          v-for="menu in menus"
          :key="menu.url"
          :to="menu.url"
          class="menu-item"
          :exact="menu.exact"
          :target="menu.target || '_self'"
          @click="onClose"
        >
          <svg-icon :icon-class="menu.icon || 'others'" />{{ menu.name }}
        </PerfectLink>
        <div ref="mobile-header-backdrop" class="mobile-header-backdrop" @click="onClose" />
      </div>
    </transition>
  </div>
</template>

<script>
import { appendBody } from '@/minxi/appendBody'
import PerfectLink from '../../components/PerfectLink'
export default {
  name: 'MobileNav',
  components: { PerfectLink },
  mixins: [appendBody],
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    '$route.path' () {
      this.onClose()
    }
  },
  methods: {
    enter (el) {
      this.$refs['mobile-header-backdrop'].style.opacity = 0
      const height = el.clientHeight
      el.style.height = 0
      // eslint-disable-next-line no-unused-expressions
      el.clientHeight
      el.style.height = height + 'px'
      this.$refs['mobile-header-backdrop'].style.opacity = 1
    },
    leave (el) {
      this.$refs['mobile-header-backdrop'].style.opacity = 0
      el.style.height = el.clientHeight + 'px'
      // eslint-disable-next-line no-unused-expressions
      el.clientHeight
      el.style.height = 0
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="stylus">
.mobile-header
  background-color #fff
  position: fixed;
  top: 52px;
  width: 100%;
  z-index: 100;
  .mobile-nav
    display flex
    flex-direction column
    background #fff
    transition: height .3s ease-in-out;
    overflow: hidden;
    .menu-item
      height 56px
      display flex
      padding 0 20px
      align-items center
      color $color-content
      font-size $font-size-medium
      &:not(:first-child)
        border-top: 1px solid $color-line-2
      svg
        margin-right 15px
        font-size 22px
        color rgb(133, 144, 166);

.mobile-header-backdrop
  position: fixed;
  top: 52px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-color: rgba(18,18,18,.65);
  transition: opacity .3s ease-in-out;
</style>
