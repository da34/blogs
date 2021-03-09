<template xmlns:>
  <div class="comments-wrapper">
    <div class="comment-header">
      <div>
        <span class="title">Comment</span> |
        <span class="count"> {{ total }} 条评论</span>
      </div>
      <Login />
    </div>
    <Beep v-if="isBeepId === 0" :article-id="articleId" @completeCom="done" />
    <ul class="comment-list">
      <li v-for="comment in commentList" :key="comment.id" class="comment" :id="`comment-${comment.id}`">
        <div class="parent">
          <img v-lazy="comment.avatar" class="avatar">
          <div class="content">
            <div class="comment-info">
              <span style="margin-right: 5px">{{ comment.fromName }}</span>
              <span class="author-ua">{{ comment.ua | parseBrowser }}</span>
              <span class="author-ua">{{ comment.ua | parseOS }}</span>
            </div>
            <Markdown :value="comment.text" :type="1" class="mark-text" :style-obj="styleObj" />
            <div class="comment-time">
              <span>{{ comment.createdAt | convertDate }}</span>
              <span ref="refReplay" class="reply" @click="handleReply(comment.id, comment.fromName)">回复</span>
            </div>
            <Beep
              v-if="isBeepId === comment.id"
              style="margin-top: 10px;"
              :article-id="articleId"
              :reply-data="replyData"
              @completeCom="done"
            />
            <div v-for="reply in comment.replies" :key="reply.id" class="reply-content" :id="`reply-${reply.id}`">
              <a :href="reply.site" target="_blank">
                <img v-lazy="reply.avatar" class="avatar">
              </a>
              <div class="content">
                <div class="comment-info">
                  <div class="author">
                    <span style="margin-right: 5px">{{ reply.fromName }}</span>
                    <span class="author-ua">{{ reply.ua | parseBrowser }}</span>
                    <span class="author-ua">{{ reply.ua | parseOS }}</span>
                  </div>
                </div>
                <span class="toName">@{{ reply.toName }}</span>
                <Markdown style="display: inline-block" :type="1" :value="reply.text" class="mark-text" :style-obj="styleObj" />
                <div class="comment-time">
                  <span>{{ reply.createdAt | convertDate }}</span>
                  <span
                    ref="refReplay"
                    class="reply"
                    @click="handleReply(reply.id, reply.fromName, comment.id)"
                  >回复</span>
                </div>
                <Beep
                  v-if="isBeepId === reply.id"
                  style="margin-top: 10px;"
                  :article-id="articleId"
                  :reply-data="replyData"
                  @completeCom="done"
                />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!--    <Markdown/>-->
    <div v-if="!count" style="text-align: center; padding: 40px 0;">
      暂时没有评论哦,快来抢沙发٩(๑❛ᴗ❛๑)۶
    </div>
    <!--    <div v-if="!(total >= count)" style="padding: 0 0 30px;">-->
    <!--      <p id="more-load" v-loading="loading" @click="page++">-->
    <!--        加载更多评论-->
    <!--      </p>-->
    <!--    </div>-->
    <Spin v-if="loading" size="large" fix />
    <Pagination v-if="count" :total="count" :page-size="10" @currentChange="handlePage" />
  </div>
</template>

<script>
import Markdown from '@/components/Markdown'
import Pagination from '../Pagination'
import Login from '../Login'
import Beep from './base/Beep'

export default {
  name: 'Comments',
  components: {
    Login,
    Pagination,
    Markdown,
    Beep
  },
  props: {
    disabled: {
      type: Number,
      default: 0
    },
    comments: {
      type: Array,
      default () {
        return []
      }
    },
    articleId: {
      type: [String, Number],
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    repliesCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      textarea: '',
      styleObj: {
        fontSize: '13px',
        padding: '5px 0 8px',
        color: '#505050'
      },
      loading: false,
      isBeepId: 0,
      replyData: {},
      commentList: this.comments
    }
  },
  computed: {
    avatar () {
      return 'https://img.cdn.lsyblog.com/default-avatar.png'
    },
    total () {
      return this.count + this.repliesCount
    }
  },
  watch: {
    comments (newVal) {
      this.commentList = newVal
    }
  },
  methods: {
    handleReply (replyId, toName, commentId) {
      this.isBeepId = replyId
      this.replyData.replyId = replyId
      this.replyData.commentId = commentId || replyId
      this.replyData.replyType = commentId ? 1 : 0
      this.replyData.toName = toName
    },
    done () {
      this.isBeepId = 0
      this.$emit('submitComplete')
    },
    async handlePage (page) {
      this.loading = true
      const { data } = await this.$axios.$get(`comments?articleId=${this.articleId}&page=${page}`)
      this.commentList = data.rows
      this.loading = false
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
.comments-wrapper
  position relative

  #more-load
    font-size 14px
    text-align center
    background #7DB9DE
    width 100%
    color #fff
    padding 10px 15px
    box-sizing border-box
    margin 15px 0 0

    &:hover
      opacity 0.9
      cursor pointer

  .comment-header
    font-size $font-size-small
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;
    .title
      color #7D7D7D

    .count
      font-size 13px
      color $font-color-minor

  .comment-list
    padding 20px 0 10px

    .comment
      overflow hidden
      margin-bottom 15px
      &:target
        padding-top 100px
        margin-top -100px
    .parent
      display flex

      .avatar
        height 50px
        border-radius 50%
        transition all .4s
        margin-right 10px

        &:hover
          transform rotateZ(360deg)

      .comment-info
        display flex
        font-size 14px
        color #333
        align-items: center
        margin-right 20px

        .author-ua
          color #b3b3b3
          padding 0 7px
          font-size 12px

      .comment-time
        font-size 12px
        color #b3b3b3
        display flex
        justify-content space-between

        .reply
          color $active-color
          cursor pointer

    .content
      flex 1 1 auto
      margin-left 8px
      font-size $font-size-small
      border-bottom 1px solid #EEEEEE
      padding-bottom 8px

    .reply-content
      margin-top 25px
      display flex
      &:target
        padding-top 100px
        margin-top -75px
      .avatar
        height 35px

      .toName
        color $active-color
        margin-right 5px

      &:last-child
        .content
          border none

@media (max-width: 768px)
  .comments-wrapper
    .info-mark
      display none

    .comment-bottom
      width 100% !important

    .comment-list
      padding-top 10px !important
  .author-ua
    display none
</style>
