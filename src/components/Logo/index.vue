<template>
  <div class="logo">
    <h2 class="circle">玉捷博客</h2>
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
