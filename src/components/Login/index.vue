<template>
  <div>
    <client-only>
      <Dropdown class="user" trigger="click" :transfer="true" @on-click="handleClick">
        <div class="dropdown-link">
          <img v-if="name" class="user-avatar" :src="avatar">
          <span v-else>登录 <SvgIcon iconClass="down" /></span>
        </div>
        <DropdownMenu v-if="!name" slot="list">
          <DropdownItem name="github">
            Github
          </DropdownItem>
        </DropdownMenu>
        <DropdownMenu v-else slot="list">
          <DropdownItem name="logout">
            注销
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
    handleClick (name) {
      if (name === 'github') {
        this.$store.dispatch('user/loginGithub')
      } else if (name === 'logout') {
        // 登出
        this.$store.dispatch('user/logout')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
.dropdown-link
  color $active-color
  cursor pointer

  .user-avatar
    width 50px
    border-radius 50%
    overflow hidden
@media (max-width: 768px)
  .user-avatar
    width 42px !important
</style>
