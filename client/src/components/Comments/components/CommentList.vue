<template>
  <div class="pt-4">
    <div class="flex overflow-hidden">
      <img v-lazy="avatar" class="rounded-full w-[52px] h-[52px]">
      <div class="ml-3 flex-1 overflow-auto">
        <div class="space-x-4 text-gray-400 leading-6">
          <span class="text-red-400 text-base font-medium">
            {{ author.name }}
            <span v-if="author.isAdmin" class="bg-red-400 text-xs text-white rounded px-1 py-0.5">站长</span>
          </span>
          <span class="text-xs hidden md:inline-block">{{ author.browser }}</span>
          <span class="text-xs hidden md:inline-block">{{ author.os }}</span>
        </div>
        <div class="leading-8 text-xs">
          <slot name="actions" />
        </div>
        <div class="pt-1 pb-4 border-b-[1px] border-gray-100 border-solid">
          <div v-if="typeof content !== 'string'">
            <slot name="content" />
          </div>
          <Markdown v-else :value="content" />
        </div>
      </div>
    </div>
    <div class="ml-10 mt-5 sub-comment">
      <slot />
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
  font-size 14px!important
.sub-comment >>>.vuepress-markdown-body  {
  background-color transparent
}
</style>
