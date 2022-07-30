<template>
  <div class="md:flex md:justify-between xl:max-w-screen-xl relative m-auto mt-20">
    <div class="w-[950px] max-w-full relative">
      <nuxt keep-alive />
    </div>
    <div class="sticky top-0 right-0 w-[19rem] hidden xl:block">
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
