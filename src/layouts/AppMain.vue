<template>
  <div class="xl:w-[1300px] m-auto flex space-x-4">
    <div class="basis-4/5">
      <nuxt keep-alive :include="['Index']" />
    </div>
    <div class="basis-1/5">
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
