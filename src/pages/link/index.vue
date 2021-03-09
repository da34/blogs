<template>
  <div class="link-wrapper">
    <div class="links">
      <ul v-if="list.length" class="links-gather">
        <li v-for="link in list" :key="link.URL">
          <a :href="getURL(link.URL)" target="_blank" :title="link.outline">
            <div class="link-text">
              <span class="siteName">{{ link.name }}</span>
              <div class="explain">{{ link.outline }}</div>
            </div>
            <img class="avatar" :src="link.avatar">
          </a>
        </li>
      </ul>
    </div>
    <div class="exchange">
      <h1 class="title">
        欢迎各位大佬交换友链(´ω｀*)
      </h1>
    </div>
    <Comments :comments="rows" :count="count" :replies-count="repliesCount" article-id="-2" @submitComplete="handleComment" />
  </div>
</template>

<script>
// import { getLinks } from '@/api/link'
// import { errno } from '@/config'
import Comments from '@/components/Comments'
// import { getComment } from '@/api/comment'

export default {
  name: 'FriendLink',
  components: { Comments },
  layout: 'blog',
  async asyncData ({
    $axios
  }) {
    const { data } = await $axios.$get('linkList')
    // console.log(data)
    // 获取评论
    const comment = await $axios.$get('comments?articleId=-2')
    const { count, rows, repliesCount } = comment.data
    return {
      list: data,
      rows,
      count,
      repliesCount
    }
  },
  data () {
    return {
    }
  },
  head () {
    return {
      title: '友情链接-玉捷博客',
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: '玉捷-个人博客'
        }
      ]
    }
  },
  methods: {
    getURL (str) {
      let strURL = ''
      if (str.substring(0, 7) === 'http://' || str.substring(0, 8) === 'https://') {
        strURL = str
      } else {
        strURL = 'http://' + str
      }
      return strURL
    },
    async handleComment () {
      const { data } = await this.$axios.$get('comments?articleId=-2')
      const { rows, count, repliesCount } = data
      this.rows = rows
      this.count = count
      this.repliesCount = repliesCount
    },
    onError (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
@import "~assets/css/base"
.link-wrapper
  padding 30px
  background-color $background-color
  position relative

  .links
    .title-global
      font-size 22px
      padding 20px
      text-align center

    .links-gather
      overflow hidden

      a
        display flex
        align-items center
      li
        padding 10px
        width 25%
        margin 5px
        float left
        border-radius 4px
        border 1px solid #EEEEEE
        position relative
        z-index 2
        overflow hidden
        transition all .5s

        &:before
          content ''
          background-color rgba(255, 174, 173, .3)
          width 0
          height 100%
          position absolute
          top 0
          left -60px
          transform skewX(45deg)
          transition all .5s
          z-index -1

        &:hover
          border-color rgba(255, 174, 173, 1)

          &:before
            width 150%

          img
            transform rotateZ(360deg)

        .siteName
          display block
          color $color-lightPink
          padding-bottom 10px

        .explain
          font-size 13px
          line-height 27px
          color $font-color-minor
          padding 5px 0
          text-omit(1)
          border-top 2px dashed #eee

      .avatar
        width 60px
        height 60px
        border-radius 50%
        border 3px solid #dcdee2
        transition all .5s

  .exchange
    padding-top 30px

  .title
    padding-bottom 30px
    font-size $font-size-big
    text-align center

@media (max-width: 768px)
  .link-wrapper
    padding 0 20px

    .links
      .title-global
        font-size 18px

      .links-gather
        li
          float none
          width 80%
          margin 15px auto
</style>
