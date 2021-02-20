<template>
  <aside class="sidebar">
    <Card class="box-card" :padding="0">
      <div class="avatar-bg"/>
      <NuxtLink tag="div" to="/" class="user">
        <span class="text-name hover-active">
          玉捷
        </span>
        <img src="https://img.cdn.lsyblog.com/site-avatar.jpg" alt="玉捷" class="avatar">
        <p class="text-desc">
          不做后悔事，做了不后悔。
        </p>
      </NuxtLink>
      <ul class="info-num">
        <li>
          <SvgIcon icon-class="article" :style="{ fontSize: '22px' }"/>
          <p>{{ articleCount }}</p>
        </li>
        <li style="border-left: 1px solid #e8eaec;border-right:1px solid #e8eaec; ">
          <SvgIcon icon-class="comment" :style="{ fontSize: '22px' }"/>
          <p>{{ commentCount }}</p>
        </li>
        <li>
          <SvgIcon icon-class="tag" :style="{ fontSize: '22px' }"/>
          <p>{{ tagCount }}</p>
        </li>
      </ul>
      <div class="contact-way">
        <Tooltip placement="top" content="点击前往GitHub">
          <a href="https://github.com/da34" target="_blank">
            <SvgIcon icon-class="GitHub" :style="{ fontSize: '25px', marginRight: '8px' }"/>
          </a>
        </Tooltip>
        <Tooltip placement="top">
          <SvgIcon icon-class="qq" :style="{ fontSize: '25px' }"/>
          <template #content>
            <img src="../../assets/images/qq.jpg" height="300">
          </template>
        </Tooltip>
      </div>
    </Card>
    <newComment/>
    <randomArticle/>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import newComment from './newComment'
import randomArticle from './randomArticle'

export default {
  name: 'SideInfo',
  components: {
    newComment,
    randomArticle
  },
  computed: {
    ...mapGetters([
      'tagCount',
      'commentCount',
      'articleCount'
    ])
  },
  // eslint-disable-next-line vue/order-in-components
  async fetch () {
    await this.$store.dispatch('comment/getCommentCount')
    await this.$store.dispatch('tag/getCount')
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
@import "~assets/css/base"
.sidebar
  box-sizing border-box
  margin-left 15px
  width 300px
  @media (max-width 992px)
    display none

  .box-card
    position relative

    .info-num
      display flex
      padding 10px 20px
      text-align center

      li
        flex 1

      p
        text-align center
        color #212529
        margin-top 2px
        font-size 16px

    .contact-way
      margin 20px 0
      text-align center

      svg
        cursor pointer

    .avatar-bg
      background-image url("https://w.wallhaven.cc/full/76/wallhaven-76opry.png")
      background-size cover
      height 120px
      background-position: 25% 75%;

    .user
      position relative

      .text-name
        display flex
        font-size $font-size-big
        font-weight 700
        padding-top 7px
        margin-left 130px

      .avatar
        position absolute
        top -45px
        left 20px
        width 90px
        height 90px
        border rgba(255, 255, 255, .4) 4px solid
        box-sizing border-box
        border-radius 50%
        transition all .5s

        &:hover
          transform rotateZ(360deg) scale(1.15)

      .text-desc
        padding 30px 30px 20px
        font-size $font-size-small
        line-height 1.5em
        text-align center

</style>
