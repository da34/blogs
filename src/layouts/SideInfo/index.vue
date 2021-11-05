<template>
  <!--  <client-only placeholder="Loading...">-->
  <!-- 组件只会在客户端被渲染 -->
  <div class="sidebar">
    <user-card />
    <newComment v-show="$route.name !== 'content-id'" />
    <randomArticle v-show="$route.name !== 'content-id'" />
    <Tag v-show="$route.name !== 'content-id'" />
    <component :is="renderCompToc" />
    <!--    <Toc v-if="$route.name === 'content-id' && !isLoading" />-->
  </div>
<!--  </client-only>-->
</template>

<script>
import { mapState } from 'vuex'
// import Toc from '@/components/Toc'
import newComment from './newComment'
import randomArticle from './randomArticle'
import UserCard from './userCard'
import Tag from './tag'
export default {
  name: 'SideInfo',
  components: {
    Tag,
    UserCard,
    randomArticle,
    newComment
    // Toc
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
