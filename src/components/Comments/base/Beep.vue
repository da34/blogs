<template>
  <!--  <client-only>-->
  <div class="beep">
    <Form ref="formValidate" :model="comment" label-position="top" :rules="ruleValidate" style="padding: 10px">
      <FormItem prop="text">
        <Input
          v-model="comment.text"
          :border="false"
          type="textarea"
          placeholder="发条友善的评论..."
          :maxlength="400"
          resize="none"
          :rows="5"
          :show-word-limit="true"
        />
      </FormItem>
      <FormItem style="margin-bottom: 10px">
        <Row type="flex" justify="end" :gutter="10">
          <Col/>
          <a class="markdown" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
            <SvgIcon icon-class="markdown" style="font-size: 16px"/>
          </a>
          </Col>
          <Col style="flex-grow: 1"/>
          <Col/>
          <Checkbox v-model="comment.isPost">
            接受邮件通知
          </Checkbox>
          </Col>
          <Col/>
          <Button type="info" @click="handleSubmit('formValidate')">
            提交评论
          </Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
  <!--  </client-only>-->
</template>

<script>
// import Phiz from '@/components/Phiz'
import { mapGetters } from 'vuex'

export default {
  name: 'Beep',
  components: {},
  props: {
    articleId: {
      type: [String, Number],
      required: true
    },
    close: {
      type: Boolean,
      default: false
    },
    replyData: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      comment: {
        text: '',
        isPost: true,
        articleId: this.articleId
      },
      ruleValidate: {
        text: [{
          required: true,
          message: '评论不能为空'
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'userID'
    ])
  },
  mounted () {
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.$store.getters.name) {
            this.$Message.warning({
              background: true,
              content: '请先登录'
            })
            return
          }
          this.postComment()
        }
      })
    },
    async postComment () {
      const data = Object.assign(this.comment, this.replyData)
      data.fromName = this.name
      data.avatar = this.avatar
      data.userId = this.userID
      data.anchor = this.createAnchor()

      // 回复
      if (data.replyId) {
        await this.$axios.post('reply', data)
      } else {
        await this.$axios.post('comments', data)
      }
      this.comment.text = ''
      this.$Message.success('发表成功！')
      this.done()
    },
    createAnchor () {
      const path = this.$route.path
      const query = this.$route.query
      let str = ''
      for (const key in query) {
        if (!str.length) {
          str += `?${key}=${query[key]}`
          continue
        }
        str += `&${key}=${query[key]}`
      }
      return path + str
    },
    done () {
      this.$emit('completeCom')
    },
    handleClose () {
      this.$emit('closeBeep')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/css/theme"
.beep
  position relative
  border: 1px solid #f0f0f0;
  border-radius 5px

  .markdown:hover
    color #333

  .close-svg
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;

//@media (max-width: 768px)
</style>
