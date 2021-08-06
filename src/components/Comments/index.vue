<template>
  <div class="comments-wrapper">
    <Edit v-if="editVisible === 0" />
    <Tool />
    <div class="comment-list-header">
      {{ total }} 评论
    </div>
    <div v-if="total">
      <CommentList
        v-for="comment in commentList"
        :key="comment.id"
        :avatar="comment.avatar"
        :content="comment.text"
        :id="'comment-' + comment.id"
        :author="{ nickName: comment.nickName, os: parseOS(comment.ua), browser: parseBrowser(comment.ua) }"
      >
        <template #actions>
          <span>{{ comment.createdAt | convertDate }}</span>
          <span class="reply" @click="onReply(comment.id)">回复</span>
        </template>
        <Edit
          v-if="editVisible === comment.id"
          :target-name="comment.nickName"
          :tier-id="comment.id"
          :pid="comment.id"
          close
          @onClose="onClose"
        />
        <!--      子级回复开始-->
        <template v-if="comment.comments.length > 0">
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
              <span class="reply" @click="onReply(reply.id)">回复</span>
            </template>
            <Edit
              v-if="editVisible === reply.id"
              :target-name="reply.nickName"
              :tier-id="comment.id"
              :pid="reply.id"
              close
              @onClose="onClose"
            />
          </CommentList>
        </template>
      <!--      子级回复结束-->
      </CommentList>
      <!--    <Pagination :total="21" />-->
      <div v-if="page * limit < count" class="comment-more" @click="moreComment">
        加载更多评论
      </div>
    </div>
    <a-empty v-else description="快做第一个评论的人吧" style="padding: 40px" />
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
      editVisible: 0
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
      'total',
      'count',
      'page',
      'limit'
    ])
  },
  // watch: {
  //   page (val) {
  //     console.log('就这？', val)
  //   }
  // },
  methods: {
    ...mapActions('modules/comment', [
      'postComment',
      'getCommentList',
      'getMoreCommentList'
    ]),
    parseOS,
    parseBrowser,
    // 提交评论
    async onSubmit (comment) {
      const data = {
        contentId: this.contentId,
        anchor: this.$route.path
      }
      comment = Object.assign(data, comment)
      const { code, message } = await this.postComment(comment)
      if (code === 0) {
        this.$message.success('评论成功')
      } else {
        this.$message.error(message)
      }
      await this.$fetch()
      this.editVisible = 0
    },
    onReply (id) {
      this.editVisible = id
    },
    onClose (id) {
      this.editVisible = 0
    },
    async moreComment () { // 加载更多评论
      const query = {
        contentId: this.contentId
      }
      await this.getMoreCommentList(query)
    }
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
    margin-right 5px
.comment-more
  font-size: 14px;
  font-weight: 400;
  display: block;
  text-align: center;
  padding: 11px 14px;
  margin: 0 0 24px;
  background: #687a86;
  color: #fff;
  cursor: pointer;
  transition opacity .3s
  &:hover
    opacity .8
</style>
