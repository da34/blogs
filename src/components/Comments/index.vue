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
        :id="'comment-' + comment.id"
        :key="comment.id"
        :avatar="comment.avatar"
        :content="comment.text"
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
      <div v-if="page * limit < count" class="comment-more" @click="moreComment">
        加载更多评论
      </div>
    </div>
    <a-empty
      v-else
      description="快做第一个评论的人吧"
      style="padding: 40px"
      :image="require('~/assets/images/undraw_New_message_re_fp03.png')"
      :image-style="{
        height: '120px',
      }"
    />
  </div>
</template>

<script>
import 'ant-design-vue/lib/empty/style/css'
import 'ant-design-vue/lib/message/style/css'
import { mapActions } from 'vuex'
import Markdown from '@/components/Markdown'
import { Icon } from 'ant-design-vue'
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
    Markdown,
    // eslint-disable-next-line vue/no-unused-components
    Icon
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
      editVisible: 0,
      page: 1,
      oldPage: 1,
      limit: 10,
      commentList: [],
      total: 0,
      count: 0
    }
  },
  async fetch () {
    // 获取评论
    const { data } = await this.$axios.get(`comments?page=${this.page}&limit=${this.limit}&contentId=${this.contentId}`)
    const { result } = data
    this.total = result.total
    this.count = result.comments.count
    // 是否是翻页, 相同证明不是
    if (this.oldPage === this.page) {
      this.commentList = result.comments.rows
    } else {
      this.oldPage = this.page
      this.commentList.push(...result.comments.rows)
    }
  },
  watch: {
    page: '$fetch'
  },
  methods: {
    ...mapActions('modules/comment', [
      'actionUser'
    ]),
    parseOS,
    parseBrowser,
    // 提交评论
    async onSubmit (comment) {
      const query = {
        contentId: this.contentId,
        anchor: this.$route.path
      }
      comment = Object.assign(query, comment)
      await this.actionUser(comment)
      const { data } = await this.$axios.post('comments', comment)
      if (data.code === 0) {
        this.$message.success({
          content: data.message,
          icon: <Icon type="check-circle" />
        })
      } else {
        this.$message.error({
          content: data.message,
          icon: <Icon type="close-circle" />
        })
      }
      await this.$fetch()
    },
    onReply (id) {
      this.editVisible = id
    },
    onClose () {
      this.editVisible = 0
    },
    moreComment () { // 加载更多评论
      this.page++
    }
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
