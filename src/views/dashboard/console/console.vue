<template>
  <div class="dash-board-wrapper">
    <NGrid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <NGi>
        <NCard segmented size="small" :bordered="false" title="文章数">
          <NSkeleton v-if="loading" :width="100" size="medium"/>
          <div v-else class="p-1 flex justify-between">
            <CountTo class="text-3xl" :endVal="stateCount.articleCount"/>
            <NIcon color="#69c0ff" size="35">
              <AlignTextBothOne />
            </NIcon>
          </div>
        </NCard>
      </NGi>
      <NGi>
        <NCard segmented size="small" :bordered="false" title="标签数">
          <NSkeleton v-if="loading" :width="100" size="medium"/>
          <div v-else class="p-1 flex justify-between">
            <CountTo class="text-3xl" :endVal="stateCount.tagCount"/>
            <NIcon color="#ff85c0" size="35">
              <TagOne />
            </NIcon>
          </div>
        </NCard>
      </NGi>
      <NGi>
        <NCard segmented size="small" :bordered="false" title="评论数">
          <NSkeleton v-if="loading" :width="100" size="medium"/>
          <div v-else class="p-1 flex justify-between">
            <CountTo class="text-3xl" :endVal="stateCount.commentCount"/>
            <NIcon color="#5cdbd3" size="35">
              <CommentOne />
            </NIcon>
          </div>
        </NCard>
      </NGi>
      <NGi>
        <NCard segmented size="small" :bordered="false" title="友联数">
          <NSkeleton v-if="loading" :width="100" size="medium"/>
          <div v-else class="p-1 flex justify-between">
            <CountTo class="text-3xl" :endVal="stateCount.linkCount"/>
            <NIcon color="#5cdbd3" size="35">
              <Peoples />
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
import {ref} from 'vue'
import {NGrid, NGi, NCard, NSkeleton,NIcon} from 'naive-ui'
import CountTo from '@/components/CountTo/index.vue'
import VisiArticle from './components/VisiArticle/index.vue'
import LatelyInfo from './components/LatelyInfo/index.vue'
import {getDashboardInfo} from "@/api/dashboard";
import {AlignTextBothOne,TagOne,CommentOne,Peoples} from '@icon-park/vue-next'

const loading = ref(true)
const stateCount = ref({})

getDashboardInfo().then(res => {
  stateCount.value = res
}).finally(() => loading.value = false)

</script>
