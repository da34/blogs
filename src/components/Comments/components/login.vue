<template>
  <transition name="slideTop">
    <div v-show="visible" class="login-wrapper text-center bg-gray-100 absolute inset-0 flex justify-center flex-col">
      <div>
        <input v-model="username" type="text" class="p-2 w-56 border border-solid border-gray-200 block m-auto rounded" placeholder="输入账号">
        <input v-model="password" type="password" class="p-2 w-56   border border-solid border-gray-200 block m-auto mt-2 rounded" placeholder="输入密码">
      </div>
      <div class="space-x-5 mt-5">
        <button class="bg-gray-400 text-white py-2 px-4 rounded" @click="onHide">
          取消
        </button>
        <button class="bg-red-400 text-white py-2 px-4 rounded" @click="login">
          登录
        </button>
      </div>
    </div>
  </transition>
</template>

<script>

import Message from '../../base/Message'
import { setToken } from '@/utils/auth'

export default {
  name: 'Login',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      if (!this.username || !this.password) {
        Message({
          type: 'info',
          text: '请输入用户名或密码'
        })
        return
      }
      const { data } = await this.$axios.post('auth/login', {
        username: this.username,
        password: this.password
      })
      const token = data.data.token
      if (process.client && token) {
        setToken(token)
      }
      this.onHide(true)
    },
    onHide (flag = false) {
      this.$emit('cancel', flag)
    }
  }
}
</script>

<style scoped>
.slideTop-enter-active, .slideTop-leave-active {
  transition: transform .4s;
}
.slideTop-enter {
  transform: translateY(100%);
}
.slideTop-enter-to {
  transform: translateY(0);
}
.slideTop-leave-to {
  transform: translateY(100%);
}
</style>
