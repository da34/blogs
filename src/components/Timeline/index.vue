<template>
  <div class="posts-collapse">
    <!--      <div class="content-total">-->
    <!--        目前一共<span class="emphasis">{{ total }}</span>篇文章,加油!-->
    <!--      </div>-->
    <div v-for="item in data" :key="item.year" class="posts-item">
      <div class="collection-title">
        <h2>
          {{ item.year }}年
        </h2>
      </div>
      <nuxt-link v-for="article in item.list" :key="article.id" class="posts-content" :to="'/content/' + article.id" @click.native="select">
        <span class="time">{{ article.createdAt | formatDate('MM-DD') }}</span>
        <span class="title">
          {{ article.title }}
        </span>
      </nuxt-link>
    </div>
    <!--<div v-if="!total" class="resources">-->
    <!--&lt;!&ndash;<img src="../../common/image/Noresources.jpg" alt="yujie" height="300">&ndash;&gt;-->
    <!--<p class="desc">暂无文章!</p>-->
    <!--</div>-->
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    select () {
      this.$emit('select')
    }
  }
}
</script>

<style scoped lang="stylus">
.posts-collapse
  position relative
  padding 20px 50px
  .posts-item
    margin-bottom 30px
    &:last-child
      margin-bottom 0
    .posts-content
      padding 10px 15px
      cursor pointer
      transition color .3s
      display flex
      color $color-content
      font-size $font-size-small
      &:hover
        color $color-focus
        .time
          color $color-focus
    .time
      white-space nowrap
      color $color-subsidiary
    .title
      text-omit-one()
      margin-left 10px
.collection-title
  h2
    display inline
    background: linear-gradient(to bottom,transparent 56%, rgba(189, 202, 219, 0.3) 0%) no-repeat;
</style>
