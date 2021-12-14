<template>
  <section class="box-card mt-3">
    <div class="box-content">
      <div class="flex flex-col items-center basis-1/3">
        <p class="text-base font-bold">文章</p>
        <p class="text-base pt-1">{{ articleCollect.articleCount }}</p>
      </div>
      <div class="flex flex-col items-center basis-1/3">
        <p class="text-base font-bold">评论</p>
        <p class="text-base pt-1">{{ articleCollect.commentCount }}</p>
      </div>
      <div class="flex flex-col items-center basis-1/3">
        <p class="text-base font-bold">标签</p>
        <p class="text-base pt-1">{{ articleCollect.tagCount }}</p>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  async fetch () {
    await this.getCollect()
  },
  computed: {
    ...mapState('modules/front', [
      'articleCollect'
    ])
  },
  methods: {
    ...mapActions('modules/front', [
      'getCollect'
    ])
  }
}
</script>
