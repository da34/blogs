<template>
  <div class="bg_xx">
    <div class="bg" :style="bg" />
  </div>
</template>
<script>
export default {
  name: 'Blur',
  props: {
    bgImg: {
      type: String,
      default: 'https://img.cdn.lsyblog.com/bg.jpg'
    }
  },
  computed: {
    bg () {
      return `background-image: url(${this.bgImg})`
    }
  }
}
</script>

<style scoped lang="stylus">
    .bg_xx
        position absolute
        top 0
        left 0
        overflow hidden
        border-radius 5px
        width 100%
        height 100%
        .bg
            filter blur(30px) brightness(.75)
            width calc(100% + 50px)
            height calc(100% + 50px)
            background-attachment scroll
            background-size cover
            background-position center
            background-repeat no-repeat
</style>
