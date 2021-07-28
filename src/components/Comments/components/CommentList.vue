<template>
  <div class="comment-list">
    <div class="comment-list-header">
      {{ count }} 评论
    </div>
    <div v-for="comment in commentList" :id="`comment-${comment.id}`" :key="comment.id" class="comment">
      <img v-lazy="'https://gravatar.loli.net/avatar/' + comment.avatar + '?s=50&d=retro'" class="avatar">
      <div class="content">
        <div class="comment-info">
          <span class="author-name">{{ comment.nickName }}</span>
          <span class="author-other" style="margin-left: 30px">{{ comment.ua | parseBrowser }}</span>
          <span class="author-other">{{ comment.ua | parseOS }}</span>
        </div>
        <Markdown :value="comment.text" class="mark-text" />
        <div class="comment-tool">
          <span class="author-other">{{ comment.createdAt | convertDate }}</span>
          <span ref="refReplay" class="reply" @click="onReplay(comment.id)">回复</span>
        </div>
<!--        <Edit-->
<!--          v-if="nowActiveId === comment.id"-->
<!--          :visible="visible"-->
<!--          :target-name="comment.nickName"-->
<!--          :tier-id="comment.id"-->
<!--          :pid="comment.id"-->
<!--          close-->
<!--          @onClose="onClose"-->
<!--        />-->
      </div>
    </div>
  </div>
</template>

<script>
import Markdown from '@/components/Markdown'
// import Edit from './Edit'
export default {
  name: 'CommentList',
  components: {
    // Edit,
    Markdown
  },
  props: {
    commentList: {
      type: Array,
      default () {
        return []
      }
    },
    count: {
      type: Number,
      default: 0
    },
    avatar: {
      type: String,
      default: ''
    },
    nickName: {
      type: String,
      default: ''
    },
    ua: {
      type: String,
      default: ''
    },
    action: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      visible: false
      // nowActiveId: 0
    }
  },
  watch: {
    // nowActiveId (newVal) {
    //   // if (newVal === 0)
    //   this.$emit('editChange', !!newVal)
    // }
  },
  methods: {
    // onReplay (id) {
    //   this.nowActiveId = id
    //   this.visible = true
    // },
    // onClose () {
    //   this.nowActiveId = 0
    //   this.visible = false
    // }
  }
}
</script>

<style scoped lang="stylus">
.comment-list
  .comment-list-header
    padding 5px
    font-size 20px
    font-weight 600
    color $color-title
    line-height 2
  .comment
    display flex
    width 100%
    border-bottom 1px solid #F7F9FB
    padding 20px 0
    font-weight 500
.avatar
  width 50px
  height 50px
  border-radius 50%

.content
  position relative
  padding-left 20px
  flex 1
  font-size $font-size-small
  display flex
  flex-direction column

  .mark-text
    color $color-content
    flex 1
    display flex
    align-items center
    padding-top 5px
    padding-right 50px
  .comment-tool
    color $color-subsidiary
    font-size $font-size-mini
    margin-top 10px
  .reply
    color $color-subsidiary
    font-size $font-size-mini
    cursor pointer
    margin-left 50px
    &:hover
      color $color-focus
  .comment-info
    color $color-content
    display flex
    align-items center
    .author-name
      display inline-block
      max-width 300px
      text-omit(1)
      //max-height 18px
    .author-other
      color $color-subsidiary
      margin-right 20px
      font-size $font-size-mini
</style>
