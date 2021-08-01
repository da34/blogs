<template>
  <section class="box-card article-wrap">
    <div class="box-title">
      <span>随机文章</span>
    </div>
    <div class="box-content">
      <nuxt-link
        v-for="item in randomList"
        :key="item.id"
        :to="'content/' + item.id"
        class="content"
        tag="div"
        :title="item.title"
      >
        <span class="title">{{ item.title }}</span>
        <span class="createdAt">{{ item.createdAt | formatDate('YYYY-MM-DD') }}</span>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'RandomArticle',
  components: {},
  async fetch () {
    await this.getRandomList({ limit: 5 })
  },
  computed: {
    ...mapState('modules/content', [
      'randomList'
    ])
  },
  methods: {
    ...mapActions('modules/content', [
      'getRandomList'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.article-wrap
  margin-top 10px
  padding 20px
  font-size $font-size-small
  .content
    display flex
    flex-direction column
    padding 8px 0
    height 40px
    box-sizing content-box
    justify-content space-between
    cursor pointer
    &:hover
      .title
        color $color-focus
    &:last-child
      padding-bottom 0
    .title
      color $color-content
      text-omit(1)
      font-weight bold
    .createdAt
      color $color-subsidiary
</style>
