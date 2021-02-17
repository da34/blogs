<template>
  <aside class="sidebar">
    <Card class="box-card" padding="0">
      <div class="avatar-bg" />
      <NuxtLink tag="div" to="/" class="user">
        <span class="text-name hover-active">
          玉捷
        </span>
        <img src="https://img.cdn.lsyblog.com/site-avatar.jpg" alt="玉捷" class="avatar">
        <p class="text-desc">不做后悔事，做了不后悔。</p>
      </NuxtLink>
    </Card>
    <newComment />
    <Tag />
  </aside>
</template>

<script>
import newComment from './newComment'
import Tag from './Tag'

export default {
  name: 'SideInfo',
  components: { newComment, Tag }
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
        border rgba(255,255,255,.4) 4px solid
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
