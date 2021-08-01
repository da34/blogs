<template>
  <section class="box-card comment-wrap">
    <div class="box-title">
      <span>最近回复</span>
    </div>
    <div class="box-content">
      <nuxt-link
        v-for="item in newList"
        :key="item.id"
        :to="{path: item.anchor, hash: 'comment-' + item.id}"
        class="comment"
        tag="div"
        :title="item.text"
      >
        <div class="comment-content">
          <img :src="`https://gravatar.loli.net/avatar/${item.avatar}?s=42&d=retro`">
          <div class="comment-info">
            <div class="comment-user">
              <span class="nickname">{{ item.nickName }}</span>
              <p>{{ item.createdAt | convertDate }}</p>
            </div>
            <div class="comment-text">
              {{ item.text }}
            </div>
          </div>
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
    height 42px
    box-sizing content-box
    &:last-child
      border none
      padding-bottom 0
    &:hover
      .comment-text
        color $color-focus
  .comment-content
    display flex
    align-items center
    flex 1
    .comment-info
      flex 1
      padding-left 10px
      height: 42px;
      display: flex;
      flex-direction: column;
    .comment-user
      display flex
      flex 1
      font-size $font-size-mini
      align-items center
      color $color-subsidiary
      .nickname
        font-weight 600
        color $color-content
      p
        margin-left auto
    img
      border-radius 50%
  .comment-text
    text-omit(1)
    color $color-title
    font-size $font-size-small
    flex 1
</style>
