<template>
  <div class="panel-wrapper">
    <h3 class="panel-title">
      {{ title }}
    </h3>
    <div class="panel">
      <div class="panel-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidePanel',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus">
    @import "~assets/css/theme"
    .panel-wrapper
        position relative
      .panel-title
        font-size 17px
        margin 13px 0
        padding-left 10px
        position relative
        &:before
          content ''
          display inline-block
          width 3px
          height 18px
          position absolute
          top 4px
          left 0
          background $active-color
      .panel
        background $background-color
        box-shadow $box-shadow
        border-radius 5px
        padding 10px 15px
</style>
