<template>
  <div>
    <client-only>
      <Dropdown class="user" trigger="click" :transfer="true" @on-click="handleClick">
        <div class="dropdown-link">
          <img v-if="name" class="user-avatar" :src="avatar">
          <SvgIcon v-else icon-class="user" style="font-size: 18px;" />
          <SvgIcon icon-class="down" />
        </div>
        <DropdownMenu v-if="!name" slot="list">
          <DropdownItem name="github">
            <SvgIcon icon-class="GitHub" style="font-size: 25px" />
          </DropdownItem>
          <DropdownItem name="qq">
            <SvgIcon icon-class="qq" style="font-size: 25px" />
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
  data () {
    return {}
  },
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
      let url
      if (name === 'github') {
        url = `https://github.com/login/oauth/authorize?client_id=${process.env.githubClientId}&scope=user:email`
        this.$store.dispatch('user/login', { url })
      } else if (name === 'qq') {
        url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${process.env.qqClientId}
        &redirect_uri=https://lsyboy.cn/api/auth/qq/callback`
        this.$store.dispatch('user/login', { url })
      } else { // 登出
        this.$store.dispatch('user/logout')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.dropdown-link
  color #000
  cursor pointer

  .user-avatar
    width 50px
    border-radius 50%
    overflow hidden

>>> .ivu-dropdown-item
  text-align center

@media (max-width: 768px)
  .user-avatar
    width 42px !important
</style>
