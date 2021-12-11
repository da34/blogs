<template>
  <!--  <client-only placeholder="Loading...">-->
  <!-- 组件只会在客户端被渲染 -->
  <div class="sidebar">
    <user-card />
    <contact v-show="$route.name !== 'content-id'" />
    <Tag v-show="$route.name !== 'content-id'" />
    <siteInfo v-show="$route.name !== 'content-id'" />
    <component :is="renderCompToc" />
  </div>
<!--  </client-only>-->
</template>

<script>
import { mapState } from 'vuex'
import siteInfo from './siteInfo'
import contact from './contact'
import UserCard from './userCard'
import Tag from './tag'
export default {
  name: 'SideInfo',
  components: {
    Tag,
    UserCard,
    siteInfo,
    contact
  },
  computed: {
    ...mapState('modules/content', [
      'isLoading'
    ]),
    ...mapState('modules/front', [
      'renderCompToc'
    ])
  }
}
</script>

<style scoped lang="stylus">
.sidebar
  //margin-left 15px
  position relative
</style>
