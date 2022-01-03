<template>
  <div class="logo">
    <nuxt-link to="/" tag="a" active-class="don't">
      <img :src="site.logo" :alt="site.name" class="h-full object-cover hidden md:block w-40">
      <img :src="site.m_logo" :alt="site.name" class="h-full object-cover block md:hidden">
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Logo',
  computed: {
    ...mapGetters([
      'site'
    ])
  }
}
</script>
