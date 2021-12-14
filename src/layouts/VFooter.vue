<template>
  <div class="text-gray-400" style="background: #232323">
    <footer class="xl:w-[1300px] m-auto text-center p-5">
      <div class="blog-info">
        <p>© 2019 - {{ date }} {{ site.name }}</p>
        <p>托管于腾讯云 | 使用七牛云对象存储</p>
        <a href="http://www.beian.miit.gov.cn" target="_blank">{{ site.internetNumber }}</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VFooter',
  data () {
    return {
      date: new Date().getFullYear()
    }
  },
  computed: {
    ...mapGetters([
      'site'
    ])
  }
}
</script>
