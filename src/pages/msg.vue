<template>
  <div class="bg-white p-5">
    <h1 class="text-2xl text-center leading-9 font-bold">
      欢迎来到这里<br>你可以吐槽，畅谈<br> <span class="text-blue-950">交换友联</span>
    </h1>
    <div class="my-7 p-5 shadow-inner leading-7">
      <h1 class="text-xl font-bold">本站链接：</h1>
      <p><span class="font-semibold mr-1"> name: </span>玉捷 Code</p>
      <p><span class="font-semibold mr-1">link:</span> https://blog.lsyboy.cn/</p>
      <p><span class="font-semibold mr-1">avatar:</span> https://resource.lsyboy.cn/blog/avatar.png</p>
      <p><span class="font-semibold mr-1">desc:</span> 闭上眼睛，你会看到更多。</p>
    </div>
    <Comments content-id="msg" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'blog',
  transition: 'slide-in',
  head () {
    return {
      title: `留言板-${this.site.name}`,
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: this.site.name
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'site'
    ])
  }
}
</script>

<style scoped>

</style>
