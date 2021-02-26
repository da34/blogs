<template>
  <Card class="box-card">
    <div slot="title">
      <span>最新评论</span>
    </div>
    <div v-for="item in newCommentList" :key="item.id" class="comment">
      <Avatar size="large" :src="item.user && item.user.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
      <div class="comment-content">
        <p>{{ item.fromName }}</p>
        <div class="text">
          {{ item.text }}
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'NewComment',
  components: { },
  data () {
    return {
    }
  },
  async fetch () {
    await this.$store.dispatch('comment/getCommentList', { limit: 4 })
  },
  computed: {
    newCommentList () {
      return this.$store.state.comment.newList
    }
  },
  created () {
    // 不需要响应
    this.num = 0
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/css/base"
.box-card
  margin 10px 0
.comment
  display flex
  margin-bottom 10px
  &:last-child
    margin 0
  .comment-content
    color #000
    margin-left 15px
    font-size 14px
    .text
      text-omit(1)
      cursor pointer
</style>
