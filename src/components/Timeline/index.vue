<template>
  <div class="content-wrap">
    <div class="posts-collapse">
      <!--      <div v-if="!title" class="content-total">-->
      <!--        目前一共<span class="emphasis">{{ total }}</span>篇文章,加油!-->
      <!--      </div>-->
      <div v-for="item in data" v-show="total" :key="item.year">
        <div v-if="item.year" class="collection-title">
          <h2 class="year">
            {{ item.year }}
          </h2>
        </div>
        <!--        <div v-if="!item.year" class="collection-title">-->
        <!--          <h2 class="year">-->
        <!--            {{ title }}-->
        <!--          </h2>-->
        <!--        </div>-->
        <div class="posts-content">
          <article v-for="article in item.list" :key="article.id" class="post-type-normal">
            <div class="post-header">
              <span class="time">{{ article.createdAt | formatDate('MM-DD') }}</span>
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
      </div>
      <!--<div v-if="!total" class="resources">-->
      <!--&lt;!&ndash;<img src="../../common/image/Noresources.jpg" alt="yujie" height="300">&ndash;&gt;-->
      <!--<p class="desc">暂无文章!</p>-->
      <!--</div>-->
    </div>
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
.content-wrap
  padding 0 0 60px 60px
  box-sizing border-box
  position relative
  background-color $background-color
  @media (max-width 960px)
    padding 40px 20px

.article-total
  span
    font-weight 700

.collection-title
  position relative
  margin 30px 0

  .year
    padding-left 5px
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
    .time
      color $active-color

  &:before
    position absolute
    top 8px
    left 0
    content ''
    width 6px
    height 6px
    z-index 5
    background-color #97dffd
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

.posts-content
  position relative

  &:after
    position absolute
    top 10px
    left 2px
    content ''
    width 4px
    height 99%
    background: rgba(151, 223, 253, .1);
</style>
