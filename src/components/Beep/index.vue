<template>
  <client-only>
    <div class="beep">
      <Input
        v-model="textarea"
        type="textarea"
        placeholder="请输入内容..."
        :maxlength="400"
        resize="none"
        :rows="5"
        :show-word-limit="true"
      />
      <div class="comment-bottom clearfix">
        <Phiz v-if="false" />
        <p class="submit">
          <Button type="info" @click="submitForm()">
            提交评论
          </Button >
        </p>
      </div>
    </div>
  </client-only>
</template>

<script>
import Phiz from '@/components/Phiz'
export default {
  name: 'Beep',
  components: { Phiz },
  props: {
    articleId: {
      type: [String, Number],
      required: true
    },
    toUser: {
      type: Object,
      default () {
        return {}
      }
    },
    childrenReply: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      textarea: ''
    }
  },
  computed: {
    name () {
      if (process.client) {
        return this.$store.getters.name || sessionStorage.name
      }
      return ''
    },
    userID () {
      if (process.client) {
        return this.$store.getters.userID || sessionStorage.userID
      }
      return ''
    }
  },
  // mounted () {
  //   const user = JSON.parse(localStorage.getItem('user')) || {}
  //   const keys = Object.keys(user)
  //   keys.forEach(v => (this.ruleForm[v] = user[v]))
  // },
  methods: {
    submitForm () {
      if (this.textarea) {
        if (this.userID) {
          this.postComment()
        } else {
          this.$Message.warning('请您先登录!')
        }
        return
      }
      this.$Message.warning('你就没什么想说的吗(╥╯^╰╥)')
    },
    async postComment () {
      let comment = {
        text: this.textarea,
        articleId: this.articleId,
        fromName: this.name,
        fromId: this.userID,
        createdAt: Date.now()
      }
      // console.log(this.toUser)
      // 是否子父级评论
      if (this.childrenReply) {
        comment = Object.assign({}, comment, this.toUser)
        // console.log(comment)
        // console.log(this.toUser)
        await this.$axios.post('comments', comment)
      } else {
        await this.$axios.post('comments', comment)
      }
      this.textarea = ''
      this.$Message.success('发表成功！')
      this.done()
    },
    done () {
      this.$emit('completeCom')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/css/theme"
.user-info
    margin-top 20px
    display flex
    justify-content space-between
.comment-bottom
    width 100%
    clear both
    padding-bottom 5px
    position: relative
.el-form-item
  margin-bottom 0
.submit
    float right
    margin-top 15px
.info-mark
    font-size $font-size-small
    color $active-color
    position: absolute
    top 25px
    right 120px
    bottom 20px
    .icon-svg
        padding-right 3px
.el-button--primary
    background-color $active-color
    border-color $active-color
    &:hover
        color #fff
        opacity .9

@media (max-width: 768px)
    .user-info
        flex-wrap wrap!important
        .el-form-item
          flex 0 0 100%
          margin-bottom 10px
          &:last-child
            margin-bottom 0
</style>
