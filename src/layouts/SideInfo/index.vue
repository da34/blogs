<template>
  <div class="sidebar">
    <user-card />
    <newComment v-if="$route.name !== 'content-id'" />
    <randomArticle v-if="$route.name !== 'content-id'" />
    <Tag v-if="$route.name !== 'content-id'" />
    <articleToc v-if="$route.name === 'content-id'"/>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import newComment from './newComment'
import randomArticle from './randomArticle'
import ArticleToc from './articleToc'

import UserCard from './userCard'
import Tag from './tag'
export default {
  name: 'SideInfo',
  components: {
    Tag,
    UserCard,
    ArticleToc,
    randomArticle,
    newComment
  }
}
</script>

<style scoped lang="stylus">
.sidebar
  //margin-left 15px
  position relative
</style>
