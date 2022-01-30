<template>
  <div class="border border-gray-100 border-solid p-5 pt-0 md:pt-5 rounded relative overflow-hidden">
    <div>
      <div class="flex flex-col md:flex-row">
        <input v-model="formVal.name" class="w-64 p-3 pl-0" placeholder="昵称" @focusout="handleLogin" @keydown.enter="handleLogin">
        <input v-model="formVal.email" class="w-64 p-3 pl-0" placeholder="邮箱">
      </div>
      <textarea v-model="formVal.text" rows="5" placeholder="发条友善的评论... （填写邮箱可以收到回复）" class="bg-[length:50%] md:bg-[length:30%] w-full mt-5 " />
      <div class="flex justify-between mt-3 items-center">
        <a class="markdown" href="https://guides.github.com/features/mastering-markdown/" target="_blank">
          <BaseSvgIcon icon-class="markdown" />
        </a>
        <div>
          <button v-if="close" class="bg-gray-400 text-white py-2 px-4 rounded" @click="onClose">
            取消
          </button>
          <!--          <button class="bg-gray-400 text-white py-2 px-4 rounded" @click="handlePreview">-->
          <!--            预览-->
          <!--          </button>-->
          <button class="bg-red-400 text-white py-2 px-4 rounded" @click="handleSubmit">
            发送
          </button>
        </div>
      </div>
    </div>
    <Login :visible="loginShow" @cancel="handleCancelLogin" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Message from '../../base/Message'
import Login from './login'
const EMAIL_REG = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

export default {
  name: 'Edit',
  components: { Login },
  inject: ['submitComment'], // 注入评论事件
  props: {
    close: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formVal: {
        name: '',
        email: '',
        text: ''
      },
      loginShow: false
    }
  },
  computed: {
    ...mapState('modules/comment', [
      'userInfo'
    ])
  },
  mounted () {
    // 初始化，从缓存中去用户信息
    this.initUser()
    const userInfo = this.userInfo
    this.formVal.name = userInfo.name
    this.formVal.email = userInfo.email
  },
  methods: {
    handleLogin () {
      if (this.formVal.name === 'admin') {
        this.loginShow = true
      }
    },
    handleCancelLogin (flag) {
      if (!flag) { this.formVal.name = '' }
      this.loginShow = false
    },
    handleSubmit (e) {
      e.preventDefault()
      if (!this.formVal.name) {
        Message({
          text: '请输入昵称',
          type: 'info'
        })
        return
      }
      if (!this.formVal.email) {
        Message({
          text: '请输入邮箱',
          type: 'info'
        })
        return
      } else if (!EMAIL_REG.test(this.formVal.email)) {
        Message({
          text: '请输入正确的邮箱地址',
          type: 'info'
        })
        return
      }

      if (!this.formVal.text) {
        Message({
          text: '请输入留言内容',
          type: 'info'
        })
        return
      }
      const values = {
        ...this.formVal
      }
      this.submitComment(values)
      this.formVal.text = ''
    },
    onClose () {
      this.$emit('onClose')
    },
    handlePreview () {
      this.$emit('onClose')
    },
    ...mapActions('modules/comment', [
      'initUser'
    ])
  }
}
</script>

<style lang="stylus" scoped>
textarea {
  background-image url("~assets/images/baba.gif")
  background-repeat no-repeat
  background-position right bottom
  transition all .4s
}

textarea:focus {
  background-position 150% bottom
}
</style>
