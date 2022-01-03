<template>
  <div class="p-5 md:p-7 bg-white">
    <h1 class="text-3xl font-bold mb-7">
      网站更新日志
    </h1>
    <section
      class="relative before:bg-blue-950 pb-7 before:w-[2px] before:absolute before:top-7 before:bottom-0 md:before:left-1/2 before:right-2 md:before:right-0"
    >
      <ul class="timeline space-y-12">
        <li
          v-for="(log, i) in logs"
          :key="log.id"
          style=""
          class="timeline-box "
        >
          <p class="font-bold text-lg">
            {{ log.date | formatDate('YYYY-MM-DD') }}
          </p>
          <div class="text-sm leading-6">
            <p v-for="(d, i) in log.desc" :key="i">
              {{ d }}
            </p>
          </div>
          <span class="absolute top-5 right-5 text-blue-950 text-6xl font-bold opacity-20">{{ logs.length - i }}</span>
        </li>
        <p class="clear-both" />
      </ul>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'blog',
  transition: 'slide-in',
  data () {
    return {
      logs: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('logs')
    this.logs = data.result
    // console.log(data)
  },
  computed: {
    ...mapGetters([
      'site'
    ])
  },
  head () {
    return {
      title: `建站日志-${this.site.name}`,
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: this.site.name
        }
      ]
    }
  }
}
</script>
<style scoped>
.timeline-box {
  @apply hover:-translate-y-1 hover:shadow-[0_4px_0_0_#07beff] hover:before:border-4 duration-300;
  @apply md:w-[47%] w-11/12 bg-gray-100 p-5 relative top-[-5%] float-left;
  @apply after:border-y-transparent after:border-solid after:border-[10px] after:absolute after:top-5 after:border-x-gray-100 ;
  @apply before:absolute before:top-6 before:absolute before:bg-white before:w-3 before:h-3 before:rounded-full before:border before:border-solid before:border-blue-950 before:border-2;
  @apply md:odd:float-left odd:after:right-[-10px] odd:after:border-r-0;
  @apply odd:before:right-[-8.1%] ;
  @apply even:after:left-[100%] even:after:border-r-0 md:even:after:border-r-[10px] md:even:float-right md:even:after:left-[-10px] md:even:after:border-l-0;
  @apply even:before:right-[-8.1%] md:even:before:right-[0] md:even:before:left-[-7.5%];
}
</style>
