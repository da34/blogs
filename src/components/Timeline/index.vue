<template>
  <div class="">
    <!--      <div class="content-total">-->
    <!--        目前一共<span class="emphasis">{{ total }}</span>篇文章,加油!-->
    <!--      </div>-->
    <div v-for="item in data" :key="item.year" class="posts-item">
      <div class="collection-title mt-4">
        <h2 class="text-2xl">
          {{ item.year }}年
        </h2>
      </div>
      <nuxt-link v-for="article in item.list" :key="article.id" class="flex ml-5 mt-3 hover:text-red-400 duration-300" :to="'/content/' + article.id" @click.native="select">
        <h1 class="text-gray-400 whitespace-nowrap leading-6">{{ article.createTime | formatDate('MM-DD') }}</h1>
        <span class="ml-3 text-base">
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
//.posts-collapse
//  position relative
//  padding 20px 50px
//  .posts-item
//    margin-bottom 30px
//    &:last-child
//      margin-bottom 0
//    .posts-content
//      padding 10px 15px
//      cursor pointer
//      transition color .3s
//      display flex
//      color $color-content
//      font-size $font-size-small
//      &:hover
//        color $color-focus
//        .time
//          color $color-focus
//    .time
//      white-space nowrap
//      color $color-subsidiary
//    .title
//      text-omit-one()
//      margin-left 10px
.collection-title
  h2
    display inline
    background: linear-gradient(to bottom,transparent 56%, rgba(189, 202, 219, 0.3) 0%) no-repeat;
</style>
