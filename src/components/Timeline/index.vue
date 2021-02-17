<template>
  <div class="content-wrap">
    <div class="content">
      <div class="posts-collapse">
        <div v-if="!title" class="article-total">
          <span class="total">目前一共<h2 class="emphasis">{{ total }}</h2>篇文章,加油!</span>
        </div>
        <div v-for="item in data" v-show="total" :key="item.year">
          <div v-if="item.year" class="collection-title">
            <h2 class="year">
              {{ item.year }}
            </h2>
          </div>
          <div v-if="!item.year" class="collection-title">
            <h2 class="year">
              {{ title }}
            </h2>
          </div>
          <article v-for="article in item.list" :key="article.id" class="post-type-normal">
            <div class="post-header">
              <span class="time">{{ article.createdAt | Date }}</span>
              <nuxt-link
                :to="{ name: 'article-id', params: { id: article.id } }"
                class="title"
                @click.native="select"
              >
                {{ article.title }}
              </nuxt-link>
            </div>
          </article>
        </div>
        <!--<div v-if="!total" class="resources">-->
        <!--&lt;!&ndash;<img src="../../common/image/Noresources.jpg" alt="yujie" height="300">&ndash;&gt;-->
        <!--<p class="desc">暂无文章!</p>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    /**
     * @return {string}
     */
    Date (time) {
      return dayjs(time).format('MM-DD')
    }
  },
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
    },
    title: {
      type: String,
      default: ''
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
@import "~assets/css/theme"
  .content-wrap
    float right
    width 100%
    padding 40px
    box-sizing border-box
    position relative
    background-color $background-color
    box-shadow 0 0 5px rgba(0,0,0, .1)
    @media (max-width 960px)
      width 100%
      padding 40px 20px
    .content
      margin-left 40px
      .posts-collapse
        position relative
        &:after
          position absolute
          top 10px
          left 2px
          content ''
          width 4px
          height 99%
          background-color #F5F5F5
        .emphasis
          display inline-block
          font-weight 700
        .total
          margin-left 10px
        .collection-title
          position relative
          margin 30px 0
          &:before
            position absolute
            top 42%
            left 0
            content ''
            width 8px
            height 8px
            z-index 5
            background-color #bbb
            border-radius 4px
            margin-right 20px
          .year
            margin-left 20px
            font-size $font-size-title
            font-weight 700
        .post-type-normal
          position relative
          font-size $font-size-medium
        .post-header
          margin 20px 0 15px
          padding-left 70px
          position relative
          &:hover
            &:before
              background-color #000
            .time
              color $active-color
          &:before
            position absolute
            top 6px
            left 1px
            content ''
            width 6px
            height 6px
            z-index 5
            background-color #bbb
            border-radius 3px
            /*margin-right 20px*/
          .title
            display inline-block
            line-height inherit
            &:hover
              color $active-color
          .time
            position absolute
            top 3px
            left 20px
            font-size $font-size-mini
        .resources
          height 100%
          margin-top 100px
          position: relative
          .desc
            position absolute
            border-radius 5px
            border 1px solid #ccc
            padding 5px
            top 15px
            left 200px
</style>
