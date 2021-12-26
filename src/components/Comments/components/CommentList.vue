<template>
  <div class="pt-4">
    <div class="flex">
      <img v-lazy="avatar" class="rounded-full w-[52px] h-[52px]">
      <div class="ml-3 w-full">
        <div class="space-x-4 text-gray-400 leading-6">
          <span class="text-red-400 text-base font-medium">{{ author.nickName }}</span>
          <span class="text-xs">{{ author.browser }}</span>
          <span class="text-xs">{{ author.os }}</span>
        </div>
        <div class="leading-8 text-xs">
          <slot name="actions"></slot>
        </div>
        <div class="pt-1 pb-4 border-b-[1px] border-gray-100 border-solid">
          <div v-if="typeof content !== 'string'">
            <slot name="content"></slot>
          </div>
          <Markdown v-else :value="content" class="blog-post"/>
        </div>
      </div>
    </div>
    <div class="ml-10 mt-5">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommentList',
  props: {
    avatar: {
      type: String,
      default: null
    },
    author: {
      type: Object,
      default () {
        return null
      }
    },
    content: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped lang="stylus">
>>> .vuepress-markdown-body:not(.custom)
  padding 0
</style>
