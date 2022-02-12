<template>
  <div class="dash-board-wrapper">
    <NGrid
      cols="1 s:2 m:3 l:4 xl:4 2xl:4"
      responsive="screen"
      :x-gap="12"
      :y-gap="8"
    >
      <NGi>
        <NCard
          segmented
          size="small"
          :bordered="false"
          title="文章数"
        >
          <NSkeleton
            v-if="loading"
            :width="100"
            size="medium"
          />
          <div
            v-else
            class="p-1 flex justify-between"
          >
            <CountTo
              class="text-3xl"
              :end-val="stateCount.contentCount"
            />
            <NIcon
              color="#69c0ff"
              size="35"
            >
              <AlignTextBothOne />
            </NIcon>
          </div>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          segmented
          size="small"
          :bordered="false"
          title="评论数"
        >
          <NSkeleton
            v-if="loading"
            :width="100"
            size="medium"
          />
          <div
            v-else
            class="p-1 flex justify-between"
          >
            <CountTo
              class="text-3xl"
              :end-val="stateCount.commentCount"
            />
            <NIcon
              color="#5cdbd3"
              size="35"
            >
              <CommentOne />
            </NIcon>
          </div>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          segmented
          size="small"
          :bordered="false"
          title="标签数"
        >
          <NSkeleton
            v-if="loading"
            :width="100"
            size="medium"
          />
          <div
            v-else
            class="p-1 flex justify-between"
          >
            <CountTo
              class="text-3xl"
              :end-val="stateCount.tagCount"
            />
            <NIcon
              color="#ff85c0"
              size="35"
            >
              <TagOne />
            </NIcon>
          </div>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          segmented
          size="small"
          :bordered="false"
          title="分类数"
        >
          <NSkeleton
            v-if="loading"
            :width="100"
            size="medium"
          />
          <div
            v-else
            class="p-1 flex justify-between"
          >
            <CountTo
              class="text-3xl"
              :end-val="stateCount.categoryCount"
            />
            <NIcon
              color="#5cdbd3"
              size="35"
            >
              <Peoples />
            </NIcon>
          </div>
        </NCard>
      </NGi>
    </NGrid>
    <!--文章相关统计-->
    <VisiArticle />
    <!--最近文章 | 评论-->
    <LatelyInfo />
  </div>
</template>
<script>
export default { name: 'Dashboard' }
</script>
<script setup>
import {ref} from 'vue'
import CountTo from '@/components/CountTo/index.vue'
import VisiArticle from './components/VisiArticle/index.vue'
import LatelyInfo from './components/LatelyInfo/index.vue'
import {getDashboardInfo} from '@/api/dashboard';
import {AlignTextBothOne, CommentOne, Peoples, TagOne} from '@icon-park/vue-next'

const loading = ref(true)
const stateCount = ref({})

getDashboardInfo().then(res => {
  stateCount.value = res
}).finally(() => loading.value = false)

</script>
