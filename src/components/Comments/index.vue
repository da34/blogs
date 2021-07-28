<template>
  <div class="comments-wrapper">
    <Edit :visible="visible" />
    <Tool />
    <CommentList :comment-list="commentList" :count="count" @editChange="onEditChange" />
  </div>
</template>

<script>
// import Pagination from '../Pagination'
// import Login from '../Login'
// import Beep from './components/Beep'

// import CommentHeader from './components/Header'

import { mapActions, mapState } from 'vuex'
import Edit from './components/Edit'
import Tool from './components/Tool'
import CommentList from './components/CommentList'

export default {
  name: 'List',
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
      const data1 = await this.postComment(comment)
      await this.$fetch()
      console.log('完善data1', data1)
    },
    // 评论列表的评论框是否存在
    onEditChange (flag) {
      this.visible = !flag
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
</style>
