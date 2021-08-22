<template>
  <div class="mt-3 mb-5">
    <NGrid cols="1 s:2 m:2 l:2 xl:2 2xl:2" responsive="screen" :x-gap="12" :y-gap="8">
      <NGi>
        <NCard segmented size="small" :bordered="false" title="最近文章">
          <NSkeleton v-if="loading"/>
          <NList v-else>
            <NListItem v-for="article in articles">
              <NThing :title="article.title">
                <template #description>
                  <p class="text-xs text-gray-500">{{ formatDate(article.createdAt) }}</p>
                </template>
              </NThing>
            </NListItem>
          </NList>
        </NCard>
      </NGi>
      <NGi>
        <NCard segmented size="small" :bordered="false" title="最近评论">
          <NSpace v-if="loading">
            <NSkeleton circle width="40px"/>
            <NSkeleton height="55px" :width="500"/>
          </NSpace>
          <NList v-else>
            <NListItem v-for="comment in comments">
              <template #prefix>
                <NAvatar
                    circle
                    :size="40"
                    :src="`https://gravatar.loli.net/avatar/${ comment.avatar}?s=40&d=retro`"
                />
              </template>
              <NThing :title="comment.nickName" :description="comment.text">
                <p class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</p>
              </NThing>
            </NListItem>
          </NList>
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {formatDate} from "@/utils";
import {NGrid, NGi, NCard, NList, NListItem, NThing, NAvatar, NSkeleton, NSpace} from 'naive-ui'
import {getArticleNew} from "@/api/web/article";
import {getCommentNew} from "@/api/web/comment";

const loading = ref(true)
const comments = ref([])
const articles = ref([])

Promise.all([getArticleNew(), getCommentNew()]).then(res => {
  // console.log('Promise', res)
  [articles.value, comments.value] = res
}).finally(() => loading.value = false)

</script>

<style scoped lang="scss">
>>>.n-thing-main__content {
  margin-top: 5px!important;
}
</style>
