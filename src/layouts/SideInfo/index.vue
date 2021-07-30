<template>
  <div class="sidebar">
    <user-card />
    <newComment />
  </div>
<!--    <randomArticle style="margin-top: 10px"/>-->
<!--    <articleToc v-if="$route.path.includes('content')"/>-->
<!--  </aside>-->
</template>

<script>
// import { mapGetters } from 'vuex'
import newComment from './newComment'
// import randomArticle from './randomArticle'
// import ArticleToc from './articleToc'

import UserCard from './userCard'
export default {
  name: 'SideInfo',
  components: {
    UserCard,
    // ArticleToc,
    // randomArticle,
    newComment
  }
}
</script>

<style scoped lang="stylus">
.sidebar
  margin-left 15px
</style>
