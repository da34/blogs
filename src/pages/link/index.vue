<template>
  <div class="link-wrapper">
    <div class="exchange">
      <h2 class="title">
        友联申请须知(´ω｀*)
      </h2>
      <div>
        <h3 class="require">
          网站要求
        </h3>
        <p class="require-text">
          无色情内容，无政治敏感内容，网站要能长期正常访问
        </p>
        <p class="require-text">
          十篇以上个人原创文章，半年内有新文章更新
        </p>
        <p class="require-text">
          原创博客、技术博客优先
        </p>
        <p class="require-text">
          需要交换友链，先把本站添加到你的网站中，然后根据下面的格式，在下面给我留言~
        </p>
        <h3 class="require">
          申请格式
        </h3>
        <p class="require-text">
          博客标题：玉捷博客
        </p>
        <p class="require-text">
          博客简介：一个前端小站，交流、记录自己的前端学习
        </p>
        <p class="require-text">
          博客地址：https://blog.lsyboy.cn
        </p>
        <p class="require-text">
          图片地址：https://gravatar.loli.net/avatar/dd0ace3c10b5fff1ea798bdb031bdd81
        </p>
      </div>
    </div>
    <!--    <h2 class="title" style="padding: 20px 0;margin-top: 20px">-->
    <!--      友联-->
    <!--    </h2>-->
    <h3 class="sort-desc">
      以下排名不分先后顺序
    </h3>
    <ul class="links">
      <li v-for="link in list" :key="link.URL" :title="link.name">
        <a :href="getURL(link.URL)" target="_blank">
          <div class="link-text">
            <span class="siteName">{{ link.name }}</span>
            <span class="explain">{{ link.outline }}</span>
          </div>
          <img v-lazy="link.avatar" class="avatar">
        </a>
      </li>
    </ul>
    <Comments content-id="-1" />
  </div>
</template>

<script>
import Comments from '@/components/Comments'
import { mapGetters } from 'vuex'
export default {
  name: 'FriendLink',
  components: { Comments },
  layout: 'blog',
  transition: 'slide-in',
  async asyncData ({ $axios }) {
    const { data } = await $axios.get('links')
    return {
      list: data.result
    }
  },
  head () {
    return {
      title: `友情链接-${this.site.name}`,
      meta: [
        {
          hid: 'home',
          name: 'description',
          content: this.site.name
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'site'
    ])
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
    }
  }
}
</script>

<style scoped lang="stylus">
.link-wrapper
  padding 30px
  border 1px solid $color-line-1
  shadow-2-down()
  border-radius-5()
  position relative
  display flex
  flex-direction column
  color $color-content
  background-color #fff

  .sort-desc
    font-weight: 600;
    font-size: 16px;
    margin-top: 20px

  .links
    margin 20px 0
    display flex
    a

      display flex
      align-items center
      .link-text
        flex 1
        display flex
        flex-direction column
    li
      padding 15px
      width 23.5%
      border-radius-5()
      border 1px solid $color-line-2
      position relative
      transition all .3s
      overflow hidden
      margin-left 2%
      &:nth-child(4n)
        margin-left 0
      &:first-child
        margin-left 0
      &:before
        content ''
        background-color rgba(233,67,40, .2)
        width 0
        height 100%
        position absolute
        top 0
        left -60px
        transform skewX(45deg)
        transition all .3s
        //z-index -1
      &:hover
        border-color rgba(233,67,40, .2)
        &:before
          width 150%
        img
          transform rotateZ(360deg)

      .siteName
        text-omit(1)
      .explain
        font-size $font-size-mini
        color $color-subsidiary
        text-omit(1)
        //flex 1
        padding-top 8px
        //border-top 1px dashed #eee

      .avatar
        width 60px
        height 60px
        border-radius 50%
        border 3px solid rgba(255,255,255,.1)
        transition all .3s

  .exchange
    padding-top 10px

  .title
    text-align center
  .require
    margin 30px 0 15px
    font-weight 600
  .require-text
    margin-left 30px
    line-height 2.5
@media (max-width: $mobile)
  .link-wrapper
    padding 20px
    .links
      flex-wrap wrap
      li
        width 49%
        margin-bottom 10px
        &:nth-child(3n)
          margin-left 0
</style>
