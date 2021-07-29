<template>
  <div class="comments-wrapper">
    <Edit :visible="visible" />
    <Tool />
    <div class="comment-list-header">
      {{ count }} 评论
    </div>
    <CommentList
      v-for="comment in commentList"
      :key="comment.id"
      :avatar="comment.avatar"
      :content="comment.text"
      :author="{ nickName: comment.nickName, os: parseOS(comment.ua), browser: parseBrowser(comment.ua) }"
    >
      <template #actions>
        <span>{{ comment.createdAt | convertDate }}</span>
      </template>
<!--      子级回复开始-->
      <template v-if="comment.commentChildCount > 0">
        <CommentList
          v-for="reply in comment.comments"
          :key="reply.id"
          :avatar="reply.avatar"
          :author="{ nickName: reply.nickName, os: parseOS(reply.ua), browser: parseBrowser(reply.ua) }"
        >
          <template #content>
            <div class="comment-r-wrapper">
              <span class="comment-r">@{{ reply.targetName }}</span>
              <Markdown :value="reply.text" />
            </div>
          </template>
          <template #actions>
            <span>{{ reply.createdAt | convertDate }}</span>
          </template>
        </CommentList>
      </template>
<!--      子级回复结束-->
    </CommentList>
  </div>
</template>

<script>
// import Pagination from '../Pagination'
// import Login from '../Login'
// import Beep from './components/Beep'

// import CommentHeader from './components/Header'
// import { parseOs, parseBrowser } from '../../plugins/filters'
import { mapActions, mapState } from 'vuex'
import Markdown from '@/components/Markdown'
import { parseOS, parseBrowser } from '../../utils'
import Edit from './components/Edit'
import Tool from './components/Tool'
import CommentList from './components/CommentList'

export default {
  name: 'List',
  components: {
    CommentList,
    Tool,
    Edit,
    Markdown
  },
  provide () {
    return {
      submitComment: this.onSubmit // 提供评论提交事件
    }
  },
  props: {
    contentId: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      visible: true
    }
  },
  async fetch () {
    // 获取评论
    const query = {
      contentId: this.contentId
    }
    await this.getCommentList(query)
  },
  computed: {
    ...mapState('modules/comment', [
      'commentList',
      'count'
    ])
  },
  methods: {
    ...mapActions('modules/comment', [
      'postComment',
      'getCommentList'
    ]),
    // 提交评论
    async onSubmit (comment) {
      const data = {
        contentId: this.contentId,
        anchor: this.$route.path
      }
      comment = Object.assign(data, comment)
      await this.postComment(comment)
      await this.$fetch()
    },
    // 评论列表的评论框是否存在
    onEditChange (flag) {
      this.visible = !flag
    },
    parseOS,
    parseBrowser
    // async handlePage (page) {
    //   this.loading = true
    //   const { data } = await this.$axios.$get(`comments?articleId=${this.articleId}&page=${page}`)
    //   this.commentList = data.rows
    //   this.loading = false
    // }
  }
}
</script>

<style scoped lang="stylus">
.comment-list-header
  padding 5px
  font-size 20px
  font-weight 600
  color $color-title
  line-height 2
.comment-r-wrapper
  display flex
  align-items center
  padding-top 5px
  .comment-r
    color $color-focus
    font-weight 600
    margin-right 10px
</style>
