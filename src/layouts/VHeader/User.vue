<template>
  <client-only>
    <div class="site-user">
      <div class="not-login">
        <Login />
      </div>
    </div>
  </client-only>
</template>

<script>
// import { mapMutations } from 'vuex'
import Login from '@/components/Login/index'
export default {
  name: 'User',
  components: { Login },
  methods: {
  }
}
</script>

<style  scoped lang="stylus">
@import "~assets/css/theme"
  .site-user
    display flex
    height 100%
    color #fff
    margin-right 10px
    .not-login
      margin auto
    @media (max-width 1200px)
      border 0
</style>
