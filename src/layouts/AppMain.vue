<template>
  <div class="app-wrapper">
    <a-row :gutter="14" type="flex" :offset="1">
      <a-col :xs="24" :md="24" :lg="17" :xl="18" :xxl="18">
        <transition name="fade-transform" mode="out-in">
          <nuxt />
        </transition>
      </a-col>
      <a-col :xs="0" :md="0" :lg="7" :xl="6" :xxl="6">
        <!--        <client-only>-->
        <SideInfo />
        <!--        </client-only>-->
      </a-col>
    </a-row>
  </div>
</template>

<script>
import SideInfo from './SideInfo'
export default {
  name: 'AppMain',
  components: { SideInfo },
  data () {
    return {
    }
  },
  computed: {
    // list () {
    //   // return this.$store.state.content.topArticle
    // }
  }
  // watch: {
  //   '$route.path' (newVal) {
  //     newVal !== '/' ? this.offsetTop = '100px' : this.offsetTop = '120px'
  //   }
  // },
  // mounted () {
  //   const path = this.$route.path
  //   path !== '/' ? this.offsetTop = '100px' : this.offsetTop = '120px'
  // }
}
</script>

<style scoped lang="stylus">
.app-wrapper
  position relative
  margin 0 auto
  padding-top 10px
  @media (min-width: 768px) {
    width: 100%;
  }

  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: $width
  }

  @media (max-width 768px)
    top -20px
</style>
