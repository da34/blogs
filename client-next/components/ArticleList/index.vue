<template>
  <div>
    <NuxtLink
      v-for="item in articleList"
      :key="item.id"
      tag="section"
      :to="`/content/${item.id}`"
      class="md:duration-300 md:hover:scale-[1.02] md:flex mx-3 md:mx-0 min-h-[140px] shadow-3xl rounded-lg bg-white mb-5 cursor-pointer overflow-hidden"
    >
      <div v-if="item.firstPicture" background-image="item.firstPicture" class="md:basis-1/3 md:pl-30 md:pt-0 pt-[60%] bg-cover bg-center" />
      <div :class="[ 'px-5', 'p-4', 'basis-2/3', 'flex', 'flex-col', { 'basis-full': !item.firstPicture }]">
        <div class="flex text-gray-500 text-xs items-center">
          <div class="whitespace-nowrap">
<!--            {{ item.createTime | formatDate('YYYY年MM月DD日') }}-->
          </div>
          <div class="tags">
            <NuxtLink v-for="tag in item.tags" :key="tag.id" class="art-tag first:ml-2" :to="{ name: 'search', params: { tagName: tag.name } }">
              {{ tag.name }}
            </NuxtLink>
          </div>
        </div>
        <h2 class="md:text-2xl duration-150 font-bold my-3 text-xl title">
          {{ item.title }}
        </h2>
        <p class="text-gray-500 desc overflow-hidden text-sm leading-5">
          {{ item.contentOutline.replace(/[# | * | ~ | > | - | + | ` | :]/g, '') }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    articleList: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
