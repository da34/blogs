<template>
  <div class="edit">
    <a-form :form="form" :wrapper-col="{ span: 24 }" @submit="handleSubmit">
      <a-form-item class="inline-block" style="width: 40%;margin-bottom: 15px;">
        <a-input
          v-decorator="['nickName', { rules: [{ required: true, message: '请输入昵称!' }] }]"
          placeholder="昵称"
        />
      </a-form-item>
      <a-form-item class="inline-block" style="width: 40%;margin-bottom: 15px;">
        <a-input
          v-decorator="['email', { rules: [{ type: 'email', message: '邮箱格式不正确!' }] }]"
          placeholder="邮箱"
        />
      </a-form-item>
      <a-form-item>
        <a-textarea
          v-decorator="['text', { rules: [{ required: true, message: '请输入评论内容!' }] }]"
          :rows="5"
          :placeholder="textPlaceholder"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 24}" class="inline-block" style="width: 49%;margin-bottom: 0;">
        <a class="markdown" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
          <SvgIcon icon-class="markdown" style="font-size: 16px" />
        </a>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 24, offset: 21}" class="inline-block" style="width: 50%;margin-bottom: 0;">
        <a-button type="primary" html-type="submit" :loading="loading">
          提交
        </a-button>
      </a-form-item>
    </a-form>
    <svg-icon v-if="close" icon-class="close" class="close" @click="onClose" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Edit',
  components: {},
  inject: ['submitComment'], // 注入评论事件
  props: {
    close: {
      type: Boolean,
      default: false
    },
    targetName: {
      type: String,
      default: null
    },
    tierId: {
      type: Number,
      default: null
    },
    pid: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      loading: false
    }
  },
  computed: {
    ...mapState('modules/comment', [
      'userInfo'
    ]),
    textPlaceholder () {
      const text = '发条友善的评论... （填写邮箱可以收到回复）'
      const targetName = this.targetName
      if (targetName) {
        return '@' + targetName
      }
      return text
    }
  },
  mounted () {
    // 初始化，从缓存中去用户信息
    this.initUser()
    const userInfo = this.userInfo
    this.form.setFieldsValue({
      nickName: userInfo.nickName,
      email: userInfo.email
    })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const tierId = this.tierId
          const targetName = this.targetName
          const pid = this.pid
          // this.submitComment(values)
          // this.$emit('submitComment', values)
          if (tierId && targetName && pid) {
            values = Object.assign({ tierId, targetName, pid }, values)
          }
          this.loading = true
          await this.submitComment(values)
          this.loading = false
          this.form.setFieldsValue({
            text: ''
          })
          console.log('Received values of form: ', values)
        }
      })
    },
    onClose () {
      this.$emit('onClose')
    },
    ...mapActions('modules/comment', [
      'initUser'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.edit
  position relative
  border 1px solid $color-line-2
  border-radius-5()
  padding 10px 20px
  margin 20px 0
  input
    font-size: $font-size-small
    line-height: 20px;
    border: 0;
    color: $color-content
    outline: 0;
    padding 0
  .ant-input
    &:focus
      border none
      box-shadow none
  textarea
    transition: all .2s ease
    border none
    outline none
    width 100%
    padding 0
.close
  position: absolute;
  top 20px
  right 20px
  z-index 99
  cursor pointer
  font-size $font-size-title
  transition color .3s
  &:hover
    color $color-focus
</style>
