<template>
  <div class="pb-5">
    <Edit />
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
            <span class="ml-5 text-red-400 cursor-pointer" @click="onReply(comment.id, comment.id, comment.nickName)">回复</span>
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
              <div class="text-gray-400 flex">
                <span>{{ reply.createdAt | convertDate }}</span>
                <span class="ml-5 text-red-400 cursor-pointer" @click="onReply(comment.id, reply.id, reply.nickName)">回复</span>
              </div>
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
    <!--二级回复-->
    <div v-show="replyShow" class="inset-0 fixed z-[99] flex items-center" style="background-color: rgba(0,0,0,.5)" />
    <transition name="slide-in-right">
      <div v-show="replyShow" class="w-[1000px] bg-white z-[100] fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] rounded">
        <h1 class="bg-white pl-5 pt-5">
          回复「 <span class="text-red-400">{{ commentInfo.targetName }}</span> 」：
        </h1>
        <Edit :close="true" @onClose="replyShow = false" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Message from '../base/Message'
import Edit from './components/Edit'
import CommentList from './components/CommentList'
import { parseOS, parseBrowser } from '@/utils'

export default {
  components: {
    CommentList,
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
      page: 1,
      oldPage: 1,
      limit: 10,
      commentList: [],
      total: 0,
      count: 0,
      replyShow: false,
      commentInfo: {
        tierId: '',
        pid: '',
        targetName: ''
      }
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
      comment = Object.assign(query, comment, this.commentInfo)
      await this.actionUser(comment)
      const { data } = await this.$axios.post('comments', comment)
      Message({
        text: data.message,
        type: data.code === 0 ? 'success' : 'error'
      })
      this.onClose()
      await this.$fetch()
    },
    onReply (tierId, pid, targetName) {
      this.commentInfo = {
        tierId, pid, targetName
      }
      this.replyShow = true
    },
    onClose () {
      this.replyShow = false
    },
    moreComment () { // 加载更多评论
      this.page++
    }
  }
}
</script>
<style scoped lang="stylus">

.slide-in-right-enter-active {
  animation: slide-in-right .4s;
}

.slide-in-right-leave-active {
  animation: slide-in-right .4s reverse;
}

@keyframes slide-in-right {
  0% {
    transform translate3d(100%, -50%, 0);
    opacity: 0;
  }
  100% {
    transform translate3d(-50%, -50%, 0);
    opacity: 1;
  }
}

</style>
