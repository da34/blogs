<template xmlns:>
  <div class="comments-wrapper">
    <div class="comment-header">
      <span class="title">Comments</span> |
      <span class="count"> {{ count }} 条评论</span>
      <div class="login">
        <Login />
      </div>
    </div>
    <Beep :article-id="articleId" @completeCom="done" />
    <!--    <Phiz />-->
    <ul :key="refreshKey" class="comment-list">
      <li v-for="(comment, index1) in commentList" :key="comment.id" class="comment">
        <div class="parent">
          <div class="profile">
            <img v-lazy="comment.user.avatar || 'http://img.cdn.lsyblog.com/default-avatar.png'">
          </div>
          <div class="content">
            <div class="comment-info">
              <div v-if="comment.fromName" class="author">
                <span style="margin-right: 5px">{{ comment.fromName }}</span>
                <Tag color="#A6A6A6" v-if="comment.user.auth === 'super_admin'">
                  博主
                </Tag>
                <SvgIcon :icon-class="comment.agent | formToAgent " style="font-size: 16px;margin-left: 5px;" />
                <SvgIcon :icon-class="comment.system | formToSystem " style="font-size: 16px;margin-left: 5px;" />
              </div>
            </div>
            <Markdown :value="comment.text" class="mark-text" :style-obj="styleObj" />
            <div class="reply-stat">
              <span class="time">{{ comment.createdAt | convertDate }}</span>
              <div class="action-box">
                <client-only>
                  <span
                    v-if="userID / 1 !== comment.fromId / 1"
                    class="reply"
                    @click="handleReply(index1, { pid: comment.id, toName: comment.fromName }, 0)"
                  >
                    <SvgIcon icon-class="comment" /> 回复</span>
                </client-only>
              </div>
            </div>
            <Beep
              v-if="visibleComment === index1"
              :to-user="toUser"
              :children-reply="true"
              :article-id="articleId"
              @completeCom="done"
            />
            <div v-if="comment.children && comment.children.length" class="sub-comment-list">
              <div v-for="reply in comment.children" :key="reply.id" class="items">
                <div class="item">
                  <div class="profile">
                    <img v-lazy="reply.user.avatar || 'http://img.cdn.lsyblog.com/default-avatar.png'">
                  </div>
                  <div class="content">
                    <div class="comment-info">
                      <div v-if="reply.fromName" class="author">
                        <span style="margin-right: 5px">{{ reply.fromName }}</span>
                        <Tag color="#A6A6A6" v-if="comment.user.auth === 'super_admin'">
                          博主
                        </Tag>
                        <SvgIcon
                          :icon-class="comment.agent | formToAgent "
                          style="font-size: 16px;margin-left: 5px;"
                        />
                        <SvgIcon
                          :icon-class="comment.system | formToSystem "
                          style="font-size: 16px;margin-left: 5px;"
                        />
                      </div>
                    </div>
                    <Markdown
                      :value="`回复<span style=color: #53a8ff;font-size: 12px>@${reply.toName}: </span>${reply.text}`"
                      :style-obj="styleObj"
                      class="mark-text"
                    />
                    <div class="reply-stat">
                      <span class="time">{{ reply.createdAt | convertDate }}</span>
                      <div class="action-box">
                        <client-only>
                          <span
                            v-if="userID / 1 !== reply.fromId / 1"
                            class="reply"
                            @click="handleReply(comment.id, { pid: comment.id, toName: reply.fromName }, 1)"
                          ><SvgIcon icon-clss="comment" />
                            回复</span>
                        </client-only>
                      </div>
                    </div>
                  </div>
                </div>
                <Beep
                  v-if="visibleReply === comment.id"
                  :to-user="toUser"
                  :children-reply="true"
                  :article-id="articleId"
                  @completeCom="done"
                />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="!total" style="text-align: center; padding: 40px 0;">
      暂时没有评论哦,快来抢沙发٩(๑❛ᴗ❛๑)۶
    </div>
    <!--    <div v-if="!(total >= count)" style="padding: 0 0 30px;">-->
    <!--      <p id="more-load" v-loading="loading" @click="page++">-->
    <!--        加载更多评论-->
    <!--      </p>-->
    <!--    </div>-->
  </div>
</template>

<script>
import Markdown from '@/components/Markdown'
import Beep from '@/components/Beep'
import Login from '../Login/index'

export default {
  name: 'Comments',
  components: {
    Login,
    Markdown,
    Beep
  },
  filters: {
    formToSystem (system) {
      if (system.toLowerCase().includes('android')) {
        return 'Android'
      }
      if (system.toLowerCase().includes('ios')) {
        return 'ios'
      }
      if (system.toLowerCase().includes('windows')) {
        return 'Windows'
      }
      // if (system.toLowerCase().indexOf('safari')) { return 'Safari' }
    },
    formToAgent (browser) {
      // console.log(browser.toLowerCase())
      if (browser.toLowerCase().includes('chrome')) {
        return 'Chrome'
      }
      if (browser.toLowerCase().includes('opera')) {
        return 'Opera'
      }
      if (browser.toLowerCase().includes('ie')) {
        return 'IE'
      }
      if (browser.toLowerCase().includes('safari')) {
        return 'Safari'
      }
    }
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
    }
  },
  data () {
    return {
      textarea: '',
      visibleReply: -1,
      visibleComment: -1,
      refreshKey: 1, // 刷新
      toUser: {},
      styleObj: {
        fontSize: '13px',
        padding: '3px 0 !important',
        color: '#505050'
      },
      loading: false,
      commentList: this.comments,
      page: 1 // 默认页数
    }
  },
  computed: {
    avatar () {
      return 'https://img.cdn.lsyblog.com/default-avatar.png'
    },
    total () {
      let num = this.commentList.length
      this.commentList.forEach(v => {
        if (v.children) {
          num += v.children.length
        }
      })
      return num
    },
    name () {
      if (process.client) {
        return this.$store.getters.name
      }
      return ''
    },
    userID () {
      if (process.client) {
        return this.$store.getters.userID
      }
      return ''
    }
  },
  watch: {
    comments (newVal) {
      // console.log('我有新的值了')
      this.commentList = newVal
    },
    async page (newVal) {
      this.loading = true
      const { result } = await this.$axios.$get(`comments?articleId=${this.articleId}&page=${newVal}`)
      this.commentList.push(...result)
      this.loading = false
    }
  },
  methods: {
    handleReply (i, v, type) {
      // console.log(i, v, type)
      !type ? this.visibleComment = i : this.visibleReply = i
      this.toUser = v
      // this.cancelReply()
    },
    done () {
      // 完成回复收起评论框
      this.visibleReply = -1
      this.visibleComment = -1
      this.$emit('submitComplete')
    }
    // fight (obj) {
    //   this.textarea += `![鸡你太美](${obj.icon} "${obj.text}")`
    // }
  }
}
</script>

<style scoped lang="stylus">
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
    padding 30px 0 20px

    .title
      color #7D7D7D

    .count
      font-size 13px
      color $font-color-minor

    .login
      position absolute
      right 0
      line-height 69px
      transform translateY(-70%)

  .comment-list
    padding-top 20px

    .cancel
      position relative
      top -5px
      float right
      font-size $font-size-small
      color $active-color
      cursor pointer

      &:hover
        opacity .9

    .comment
      overflow hidden
      margin-bottom 15px

      &:last-child
        .content
          border 0

      .sub-comment-list
        margin 10px 0
        padding 10px 10px 0
        background #FBFBFB

        .items
          margin-bottom 10px

          &:last-child
            margin-bottom 0

            .content
              border 0

        .item
          margin-bottom 10px
          display flex

          .reply-content
            flex 1 1 auto

    .parent
      display flex

      .profile
        height 40px

        img
          height @height
          border-radius 50%
          transition all .6s

          &:hover
            transform rotateZ(360deg)

      .comment-info
        .author
          display flex
          font-size 12px
          color #1abc9c
          line-height 2em
          align-items: center;
        .info
          position relative
          display inline-block
          margin-left 10px
          color $font-color-minor
          font-size $font-size-mini

          .useragent-info
            padding 5px
            background #EDEDED
            border-radius 5px
            color #b3b1b1

    .content
      flex 1 1 auto
      margin-left 8px
      font-size $font-size-small
      border-bottom 1px solid #EEEEEE
      padding-bottom 8px

      .v-note-wrapper
        margin-top 0 !important

      .reply-stat
        margin 8px 0
        color #8a9aa9
        font-size 12px
        display flex

        .action-box
          display inline-block
          margin-left auto
          cursor pointer

          .reply
            padding-left 20px
            cursor pointer

@media (max-width: 768px)
  .comments-wrapper
    .info-mark
      display none

    .el-textarea
      width 80% !important
      float: right !important

    .comment-bottom
      width 100% !important

    .comment-list
      padding-top 10px !important
</style>
