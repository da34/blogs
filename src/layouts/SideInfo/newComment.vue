<template>
  <section class="box-card comment-wrap">
    <div class="box-title">
      <span>最近回复</span>
    </div>
    <div class="box-content">
      <nuxt-link
        v-for="item in newList"
        :key="item.id"
        :to="item.anchor"
        class="comment"
        tag="div"
      >
        <div class="comment-header">
          <img :src="`https://gravatar.loli.net/avatar/${item.avatar}?s=35&d=retro`" />
          <div class="comment-user">
            <span class="nickname">{{ item.nickName }}</span>
            <p>{{ item.createdAt | convertDate }}</p>
          </div>
        </div>
        <div class="comment-text">
          {{ item.text }}
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'NewComment',
  components: {},
  data () {
    return {}
  },
  async fetch () {
    await this.getNewCommentList({ limit: 5 })
    // await this.$store.dispatch('comment/getCommentList', { limit: 4 })
  },
  computed: {
    ...mapState('modules/comment', [
      'newList'
    ])
  },
  methods: {
    ...mapActions('modules/comment', [
      'getNewCommentList'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.comment-wrap
  margin-top 10px
  padding 20px
  font-size $font-size-small
  .comment
    cursor pointer
    border-bottom 1px solid $color-line-2
    padding 10px 0
    &:last-child
      border none
      padding-bottom 0
    &:hover
      .comment-text
        color $color-focus
  .comment-header
    display flex
    align-items center
    flex 1
    .comment-user
      display flex
      margin-left 10px
      flex 1
      .nickname
        font-weight 600
      p
        color $color-subsidiary
        margin-left auto
    img
      border-radius 50%
  .comment-text
    text-omit(1)
    padding-top 10px
</style>
