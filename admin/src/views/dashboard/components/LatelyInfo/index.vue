<template>
  <div class="mt-3 mb-5">
    <NGrid
      cols="1 s:2 m:2 l:2 xl:2 2xl:2"
      responsive="screen"
      :x-gap="12"
      :y-gap="8"
    >
      <NGi>
        <NCard
          segmented
          size="small"
          :bordered="false"
          title="最近文章"
        >
          <NSkeleton v-if="loading" />
          <NList v-else>
            <NListItem
              v-for="article in articles"
              :key="article.id"
            >
              <NThing :title="article.title">
                <template #description>
                  <p class="text-xs text-gray-500">
                    {{ formatDate(+article.createdTime) }}
                  </p>
                </template>
              </NThing>
            </NListItem>
          </NList>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          segmented
          size="small"
          :bordered="false"
          title="最近评论"
        >
          <NSpace v-if="loading">
            <NSkeleton
              circle
              width="40px"
            />
            <NSkeleton
              height="55px"
              :width="500"
            />
          </NSpace>
          <NList v-else>
            <NListItem
              v-for="comment in comments"
              :key="comment.id"
            >
              <template #prefix>
                <NAvatar
                  circle
                  :size="40"
                  :src="comment.avatar"
                />
              </template>
              <NThing
                :title="comment.authorName"
                :description="comment.text"
              >
                <p class="text-xs text-gray-500">
                  {{ formatDate(+comment.createdTime) }}
                </p>
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
import {formatDate} from '@/utils';
import {getContents} from '@/api/content';
import {getCommentList} from '@/api/comment';

const loading = ref(true)
const comments = ref([])
const articles = ref([])

Promise.all([
  getContents({pageSize: 5, 'sortBy[createdTime]': 'DESC'}),
  getCommentList({
    pageSize: 5,
    'sortBy[createdTime]': 'DESC',
    'status': 'pass',
  })]).then(res => {
    console.log(res)
  articles.value = res[0].list
  comments.value = res[1].list
}).finally(() => loading.value = false)

</script>

<style scoped lang="scss">
:deep(.n-thing-main__content) {
  margin-top: 5px!important;
}
</style>
