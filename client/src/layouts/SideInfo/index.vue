<template>
  <!--  <client-only placeholder="Loading...">-->
  <!-- 组件只会在客户端被渲染 -->
  <div class="relative">
    <user-card v-show="$route.name !== 'content-id'" />
    <dayWord v-show="$route.name !== 'content-id'" />
    <articleInfo v-show="$route.name !== 'content-id'" />
    <Tag v-show="$route.name !== 'content-id'" />
    <siteInfo v-show="$route.name !== 'content-id'" />
    <component :is="renderCompToc" />
  </div>
<!--  </client-only>-->
</template>

<script>
import { mapState } from 'vuex'
import siteInfo from './siteInfo'
import dayWord from './dayWord'
import UserCard from './userCard'
import Tag from './tag'
import articleInfo from './articleInfo'
export default {
  name: 'SideInfo',
  components: {
    Tag,
    UserCard,
    siteInfo,
    dayWord,
    articleInfo
  },
  computed: {
    ...mapState('modules/front', [
      'renderCompToc'
    ])
  }
}
</script>
