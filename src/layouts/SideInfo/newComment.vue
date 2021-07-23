<template>
  <Card class="box-card" dis-hover>
    <div slot="title">
      <span>最新评论</span>
    </div>
    <a
      v-for="item in newCommentList"
      :key="item.id | anchorFilter(item.anchor, item.replyType)"
      :href="item.id | anchorFilter(item.anchor, item.replyType)"
      class="comment"
    >
      <a-avatar
        shape="square"
        size="large"
        :src="item.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
        :style="{ backgroundColor: 'pink', verticalAlign: 'middle' }"
      >
        {{ 11111 }}
      </a-avatar>
      <div class="comment-content">
        <p>{{ item.fromName }}</p>
        <div class="text">
          {{ item.text }}
        </div>
      </div>
    </a>
  </Card>
</template>

<script>
export default {
  name: 'NewComment',
  components: {},
  filters: {
  },
  data () {
    return {}
  },
  async fetch () {
    // await this.$store.dispatch('comment/getCommentList', { limit: 4 })
  },
  computed: {
  }
}
</script>

<style lang="stylus" scoped>
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
