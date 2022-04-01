<template>
  <!--  fixed top-[60px] w-11/12 bg-white-->
  <div class="mobile-header">
    <transition
      name="fade"
      @enter="enter"
      @leave="leave"
    >
      <div v-if="visible" class="mobile-nav">
        <NuxtLink
          v-for="menu in menus"
          :key="menu.url"
          :to="menu.url"
          class="menu-item"
          :exact="menu.exact"
          :target="menu.target || '_self'"
          @click="onClose"
        >
          {{ menu.name }}
        </NuxtLink>
        <div ref="mobile-header-backdrop" class="mobile-header-backdrop" @click="onClose" />
      </div>
    </transition>
  </div>
</template>

<script>
import { appendBody } from '@/minxi/appendBody'
export default {
  name: 'MobileNav',
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
  data () {
    return {
      height: 0
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
      this.height = Math.max(el.clientHeight, this.height)
      el.style.height = 0
      // 强制发生 reflow
      // eslint-disable-next-line no-unused-expressions
      el.clientHeight
      el.style.height = this.height + 'px'
      this.$refs['mobile-header-backdrop'].style.opacity = 1
    },
    leave (el) {
      this.$refs['mobile-header-backdrop'].style.opacity = 0
      el.style.height = el.clientHeight + 'px'
      el.style.height = 0
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
