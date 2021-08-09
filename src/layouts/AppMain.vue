<template>
  <div class="app-wrapper">
    <a-row type="flex">
      <!--      :gutter="{xs: 0, md: 0, lg:14, xl:14, xxl:14}"-->
      <a-col :xs="24" :md="24" :lg="17" :xl="18" :xxl="18">
        <nuxt keep-alive :include="['Index']" />
      </a-col>
      <a-col
        :xs="0"
        :md="0"
        :lg="7"
        :xl="6"
        :xxl="6"
        class="side-wrapper"
      >
        <SideInfo />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import SideInfo from './SideInfo'
export default {
  name: 'AppMain',
  components: { SideInfo }
}
</script>

<style scoped lang="stylus">
.app-wrapper
  position relative
  margin 0 auto
  .side-wrapper
    padding-left 16px
  @media (min-width: 768px) {
    width: 100%;
  }

  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: $width
  }

@media (min-width: 991px)
  .side-wrapper
    padding-left 0
</style>
