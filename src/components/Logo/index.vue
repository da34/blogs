<template>
  <div class="logo">
    <nuxt-link to="/" tag="a" active-class="don't">
      <img :src="site.logo" :alt="site.name" width="200" class="h-full object-cover">
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
