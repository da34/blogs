<template>
  <div class="text-center py-5">
    <img :src="imgUrl" :style="imageStyle" alt="empty" class="mx-auto">
    <span class="text-gray-400">{{ description }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: '没有数据'
    },
    imgUrl: {
      type: String,
      default: require('~/assets/images/undraw_New_message_re_fp03.png')
    },
    imageStyle: {
      type: [Object, String]
    }
  }
}
</script>

<style scoped>

</style>
