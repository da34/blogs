<template>
  <div class="logo">
    <nuxt-link class="circle" to="/" tag="h2" active-class="don't">
      <img :src="site.logo" :alt="site.name" width="200">
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',
  computed: {
    ...mapGetters([
      'site'
    ])
  }
}
</script>

<style scoped lang="stylus">
.logo
  display flex
  align-items center
  justify-content center
  img
    height 100%
    object-fit cover
  h2
    font-size 25px
    font-weight 600
    color $color-title
</style>
