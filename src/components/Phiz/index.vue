<template>
  <div class="expression clearfix">
    <div ref="title" class="title-r" @click="show = !show">
<!--      <svg-icon name="funny" :style-obj="{ width: '2em', height: '2em' }" />-->
    </div>
    <div v-show="show" class="triangle" />
    <div v-show="show" class="expression-body">
      <div class="list">
        <ul v-for="(items, key) in expression" :key="items.name" :class="{ active: showActive === key }" class="faces">
          <li v-for="img in items.content" :key="img.text" class="face" @click="fight(img)">
            <img :src="img.icon" alt="玉捷" :title="img.text">
          </li>
          <div />
          <div />
          <div />
          <div />
          <div />
        </ul>
      </div>
      <div class="bar">
        <ul class="menu">
          <li v-for="(items, key) in expression" :key="items.name" :class="{active: showActive === key}" @click="classA(key)">
            {{ items.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import { getEmoji } from '@/api/comment'
// import { errno } from '@/config'

export default {
  name: 'Phiz',
  props: {
    logo: {
      type: String,
      default: ''
    },
    activeClass: {
      type: String,
      default: 'Mo'
    }
  },
  data () {
    return {
      show: false,
      showActive: this.activeClass
    }
  },
  computed: {
    expression () {
      // return this.$store.state.comment.expression
      return '1'
    }
  },
  watch: {
    show (newVal) {
      newVal
        ? this.$refs.title.style = 'border-bottom:0'
        : this.$refs.title.style = ''
    }
  },
  created () {
    this.fetchEmoji()
  },
  methods: {
    fetchEmoji () {
      if (!this.expression.Mo) {
        this.$store.dispatch('comment/getEmoji')
      }
    },
    classA (val) {
      this.showActive = val
    },
    fight (val) {
      this.$emit('fight', val)
    }
  }
}

</script>

<style  lang="stylus" scoped>
.triangle
  position relative
  top -15px
  margin-left 10px
  height 3px
  z-index 9999
  &:before
    content ''
    height 0
    width 0
    display block
    position absolute
    top -1px
    left 7px
    border 10px solid transparent
    border-bottom 10px solid #E1E1E1
  &:after
    content ''
    height 0
    width 0
    display block
    position absolute
    top 0
    left 7px
    border 10px solid transparent
    border-bottom 10px solid #fff
.expression
  width 80%
  position absolute
  top 15px
  left 0
  font-size $font-size-mini
  cursor pointer
  .title-r
    position: relative
    z-index 1000
    display inline-block
    padding 5px
    margin-left 10px
    &:hover p
      animation bounce 1s linear infinite
  .expression-body
    position absolute
    z-index 999
    width 100%
    .list
      width: 100%
      border 1px solid #E1E1E1
      border-bottom 0
      max-height 190px
      overflow-y scroll
      background #fff
      /*border-radius 4px*/
      border-radius 4px 4px 0 0
      text-align center
      padding 10px
      box-sizing border-box
      display flex
      &::-webkit-scrollbar
        display none
      .faces
        justify-content space-between
        display none
        flex 0 0 100%
        flex-wrap wrap  // 换行
        & > div
          max-width 25%
          height 0
          margin-right 10px
      .active
        display flex
        .face
          max-width 25%
          overflow hidden
          background: #f7f5f3
          padding: 5px 10px
          margin 0 12px 12px 0
          &:hover
            animation bounce 1s linear infinite
            box-shadow 0 1px 2px 0 rgba(0,0,0,.3)
    .bar
      border 1px solid #E1E1E1
      border-radius 0 0 4px 4px
      height 30px
      line-height 30px
      background #fff
      overflow hidden
      .menu
       li
          padding 0 10px
          float: left
          &.active
            color #fff
            background #53a8ff
@media (max-width: 500px)
  .expression
    left 5px
    .face
      padding 3px 5px!important
      margin 0 8px 8px 0!important
@keyframes bounce {
  0% {
    transform rotate(0) translateY(0)
  }
  50% {
    transform rotate(-3deg) translateY(3px)
  }
  75% {
    transform rotate(-3deg) translateY(0)
  }
  100% {
    transform rotate(0) translateY(0)
  }
}
</style>
