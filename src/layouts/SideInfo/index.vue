<template>
  <div class="sidebar">
    <user-card />
    <newComment v-if="$route.name !== 'content-id'" />
    <randomArticle v-if="$route.name !== 'content-id'" />
    <Tag v-if="$route.name !== 'content-id'" />
    <Toc v-if="$route.name === 'content-id'" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Toc from '@/components/Toc'
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
    newComment,
    Toc
  }
}
</script>

<style scoped lang="stylus">
.sidebar
  //margin-left 15px
  position relative
</style>
