<template>
  <div class="pb-5">
    <Edit v-if="editVisible === 0" />
    <Tool />
    <h1 class="font-bold text-lg mt-5 mb-3">
      {{ total }} 评论
    </h1>
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
          <div class="text-gray-400 flex">
            <span>{{ comment.createdAt | convertDate }}</span>
            <span class="ml-5 text-red-400 cursor-pointer" @click="onReply(comment.id)">回复</span>
          </div>
        </template>
        <!--      子级回复开始-->
        <template v-if="comment.comments.length > 0">
          <CommentList
            v-for="reply in comment.comments"
            :key="reply.id"
            :avatar="reply.avatar"
            class="bg-gray-50"
            :author="{ nickName: reply.nickName, os: parseOS(reply.ua), browser: parseBrowser(reply.ua) }"
          >
            <template #content>
              <div class="flex items-center text-base">
                <span class="text-red-400">@{{ reply.targetName }}</span>，
                <Markdown class="bg-transparent" :value="reply.text" />
              </div>
            </template>
            <template #actions>
              <span>{{ reply.createdAt | convertDate }}</span>
              <span @click="onReply(reply.id)">回复</span>
            </template>
          </CommentList>
        </template>
        <!--      子级回复结束-->
      </CommentList>
      <div
        v-if="page * limit < count"
        class="bg-gray-100 p-2 text-center rounded cursor-pointer hover:text-red-400"
        @click="moreComment"
      >
        加载更多评论
      </div>
    </div>
    <BaseEmpty
      v-else
      class="p-3"
      description="快做第一个评论的人吧"
      :image-style="{
        height: '120px',
      }"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Edit from './components/Edit'
import Tool from './components/Tool'
import CommentList from './components/CommentList'
import { parseOS, parseBrowser } from '@/utils'

export default {
  components: {
    CommentList,
    Tool,
    Edit
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
        // this.$message.success({
        //   content: data.message,
        //   icon: <Icon type="check-circle"/>
        // })
      } else {
        // this.$message.error({
        //   content: data.message,
        //   icon: <Icon type="close-circle"/>
        // })
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
