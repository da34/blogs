<template>
  <section class="box-card py-7">
    <div class="flex flex-col items-center justify-center">
      <img v-lazy="avatar" alt="玉捷" class="w-24 h-24 rounded-full">
      <span class="text-xl font-bold mt-3">玉捷</span>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      avatar: 'https://resource.lsyboy.cn/blog/avatar.png'
    }
  }
}
</script>
<style scoped lang="stylus">
.avatar-bg
  background-image url("https://resource.lsyboy.cn/blog/option/avatar-bg.png")
  background-position: 25% 75%;
</style>
