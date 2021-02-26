<template>
  <!--  <client-only>-->
  <div class="beep">
    <Form ref="formValidate" :model="comment" label-position="top" :rules="ruleValidate" style="padding: 10px">
      <FormItem>
        <Row :gutter="16">
          <Col span="8">
            <FormItem prop="fromName">
              <Input v-model="comment.fromName" :border="false" placeholder="* 昵称" @on-blur="blurNick('fromName')"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem prop="mail">
              <Input v-model="comment.mail" :border="false" placeholder="* 邮箱" @on-blur="blurNick('mail')"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem prop="site">
              <Input v-model="comment.site" :border="false" placeholder="网站" @on-blur="blurNick('site')"/>
            </FormItem>
          </Col>
        </Row>
        <SvgIcon v-if="close" @click="handleClose" class="close-svg" iconClass="close" />
      </FormItem>
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
          <Col>
            <a class="markdown" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
              <SvgIcon iconClass="markdown" style="font-size: 16px" />
            </a>
          </Col>
          <Col style="flex-grow: 1"></Col>
          <Col>
            <Checkbox v-model="comment.isPost">
              接受邮件通知
            </Checkbox>
          </Col>
          <Col>
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
const STORE_NAME = '_l_Cache_Meta'

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
      default: () => {}
    }
  },
  data () {
    return {
      comment: {
        fromName: '',
        mail: '',
        site: '',
        text: '',
        isPost: true,
        articleId: this.articleId
      },
      ruleValidate: {
        fromName: [{
          required: true,
          message: '昵称不能为空',
          trigger: 'blur'
        }],
        mail: [{
          required: true,
          message: '邮箱不能为空',
          trigger: 'blur'
        }, {
          type: 'email',
          message: '不正确的电子邮件格式',
          trigger: 'blur'
        }
        ],
        site: [{
          type: 'url',
          message: '不正确的网站地址',
          trigger: 'blur'
        }],
        text: [{
          required: true,
          message: '说点吧',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  mounted () {
    const user = JSON.parse(localStorage.getItem(STORE_NAME)) || {}
    const keys = Object.keys(user)
    keys.forEach(v => (this.comment[v] = user[v]))
  },
  methods: {
    blurNick (key) {
      const result = JSON.parse(localStorage.getItem(STORE_NAME)) || {}
      if (result) {
        result[key] = this.comment[key]
      }
      localStorage.setItem(STORE_NAME, JSON.stringify(result))
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.postComment()
        }
      })
    },
    async postComment () {
      const data = Object.assign(this.comment, this.replyData)
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
