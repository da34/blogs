<template>
  <div class="logo">
    <nuxt-link class="circle" to="/" tag="h2" active-class="don't">玉捷博客</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style scoped lang="stylus">
.logo
  display flex
  align-items center
  justify-content center
  h2
    font-size 25px
    font-weight 600
    color $color-title
</style>
