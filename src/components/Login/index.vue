<template>
  <div>
      <client-only>
          <el-dropdown class="user" @command="login" trigger="click">
          <div class="el-dropdown-link">
              <img v-if="name" class="user-avatar" :src="avatar" >
              <span v-else>登录</span>
              <i class="el-icon-arrow-down el-icon--right" />
          </div>
              <el-dropdown-menu v-if="!name" slot="dropdown">
                  <el-dropdown-item :command="0">
                      Github
                  </el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu v-else slot="dropdown">
                  <el-dropdown-item command="logout">
                      注销
                  </el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </client-only>
  </div>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    name () {
      if (process.client) {
        return this.$store.getters.name
      }
      return ''
    },
    avatar () {
      if (process.client) {
        return this.$store.getters.avatar
      }
      return ''
    }
  },
  methods: {
    login (type) {
      if (type === 0) {
        this.$store.dispatch('user/loginGithub')
      } else if (type === 'logout') {
        // 登出
        this.$store.dispatch('user/logout')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
.el-dropdown-link
    color $active-color
    cursor pointer
    .user-avatar
        width 50px
        border-radius 50%
        overflow hidden

@media (max-width: 768px)
    .user-avatar
        width 42px!important
</style>
