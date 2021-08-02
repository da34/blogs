<template>
  <section class="box-card">
    <div class="avatar-bg" />
    <div class="user">
      <img src="https://gravatar.loli.net/avatar/dd0ace3c10b5fff1ea798bdb031bdd81?s=100" alt="玉捷" class="avatar">
      <span class="text-name hover-active">玉捷</span>
    </div>
    <ul class="info-num">
      <li>
        <p>{{ articleCollect.articleCount }}</p>
        <p class="info-desc">
          文章
        </p>
      </li>
      <li>
        <p>{{ articleCollect.commentCount }}</p>
        <p class="info-desc">
          评论
        </p>
      </li>
      <li>
        <p>{{ articleCollect.tagCount }}</p>
        <p class="info-desc">
          标签
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'UserCard',
  computed: {
    ...mapState('modules/front', [
      'articleCollect'
    ])
  },
  async fetch () {
    await this.getCollect()
  },
  methods: {
    ...mapActions('modules/front', [
      'getCollect'
    ])
  }
}
</script>

<style scoped lang="stylus">
.avatar-bg
  position: relative;
  background-image url("https://resource.lsyboy.cn/blog/option/avatar-bg.png")
  background-size cover
  height 120px
  background-position: 25% 75%;
  z-index: 0;
  //&:after
  //  content: '';
  //  position: absolute;
  //  top: 0;
  //  bottom: 0;
  //  left: 0;
  //  right: 0;
  //  background linear-gradient(0,rgba(255, 255, 255, .5),transparent)
.user
  width 100%
  position absolute
  top 60px
  display flex
  flex-direction column
  align-items center
  .text-name
    display flex
    font-size 21px
    font-weight 600
    padding-top 10px
  .avatar
    width 100px
    height 100px
    border rgba(255, 255, 255, .1) 4px solid
    box-sizing border-box
    border-radius 50%
    transition all .4s
    &:hover
      transform rotateZ(360deg) scale(1.15)
.info-num
  display flex
  text-align center
  margin-top 100px
  padding-bottom 20px
  font-size $font-size-medium
  justify-content: space-evenly;
  p
    text-align center
    color $color-content
    font-weight 600
    margin-top 5px
  .info-desc
    color $color-subsidiary
    font-size $font-size-mini
</style>
