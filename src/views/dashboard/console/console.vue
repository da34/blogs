<template>
  <div class="dash-board-wrapper mt-4">
    <NGrid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <NGi>
        <NCard segmented size="small" :bordered="false" title="文章数">
          <NSkeleton v-if="loading" :width="100" size="medium"/>
          <div v-else class="p-1 flex justify-between">
            <CountTo class="text-3xl" :endVal="212"/>
            <NIcon color="#69c0ff" size="35">
              <ArticleFilled />
            </NIcon>
          </div>
        </NCard>
      </NGi>
      <NGi>
        <NCard segmented size="small" :bordered="false" title="标签数">
          <NSkeleton v-if="loading" :width="100" size="medium"/>
          <div v-else class="p-1 flex justify-between">
            <CountTo class="text-3xl" :endVal="1321"/>
            <NIcon color="#ff85c0" size="35">
              <TagTwotone />
            </NIcon>
          </div>
        </NCard>
      </NGi>
      <NGi>
        <NCard segmented size="small" :bordered="false" title="评论数">
          <NSkeleton v-if="loading" :width="100" size="medium"/>
          <div v-else class="p-1 flex justify-between">
            <CountTo class="text-3xl" :endVal="123132"/>
            <NIcon color="#5cdbd3" size="35">
              <ModeCommentTwotone />
            </NIcon>
          </div>
        </NCard>
      </NGi>
      <NGi>
        <NCard segmented size="small" :bordered="false" title="友联数">
          <NSkeleton v-if="loading" :width="100" size="medium"/>
          <div v-else class="p-1 flex justify-between">
            <CountTo class="text-3xl" :endVal="12"/>
            <NIcon color="#5cdbd3" size="35">
              <LinkOutlined />
            </NIcon>
          </div>
        </NCard>
      </NGi>
    </NGrid>
    <!--文章相关统计-->
    <VisiArticle/>
    <!--最近文章 | 评论-->
    <LatelyInfo/>
  </div>
</template>
<script setup>
import {NGrid, NGi, NCard, NSkeleton,NIcon} from 'naive-ui'
import {ArticleFilled,ModeCommentTwotone} from '@vicons/material'
import {TagTwotone,LinkOutlined} from '@vicons/antd'
import {ref} from 'vue'
import CountTo from '@/components/CountTo/index.vue'
import VisiArticle from './components/VisiArticle/index.vue'
import LatelyInfo from './components/LatelyInfo/index.vue'

const loading = ref(false)
</script>
<style scoped lang="scss">
</style>
