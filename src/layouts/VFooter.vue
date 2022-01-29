<template>
  <div class="text-gray-400" style="background: #232323">
    <footer class="xl:max-w-screen-xl m-auto text-center p-5">
      <div class="blog-info">
        <p>© {{ date }} 玉捷 Code </p>
        <p>托管于腾讯云 | 使用七牛云对象存储</p>
        <a href="http://www.beian.miit.gov.cn" target="_blank">桂ICP备2021002604号-1</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'VFooter',
  data () {
    return {
      date: new Date().getFullYear()
    }
  }
}
</script>
