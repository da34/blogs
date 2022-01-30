<template>
  <div class="xl:max-w-screen-xl relative md:px-0 px-5 m-auto mt-20">
    <div class="w-[950px] max-w-full relative">
      <nuxt keep-alive :include="['Index']" />
    </div>
    <div class="absolute top-0 right-0 w-[19rem] hidden xl:block">
      <SideInfo />
    </div>
  </div>
</template>

<script>
import SideInfo from './SideInfo'

export default {
  name: 'AppMain',
  components: { SideInfo }
}
</script>
