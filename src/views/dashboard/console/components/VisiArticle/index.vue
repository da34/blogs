<template>
  <div class="mt-3">
    <NGrid cols="1 s:2 m:2 l:2 xl:2 2xl:2" responsive="screen" :x-gap="12" :y-gap="8">
      <NGi >
        <NCard segmented size="small" :bordered="false" title="标签文章数量">
          <TagArticle/>
        </NCard>
      </NGi>
      <NGi >
        <NCard segmented size="small" :bordered="false" title="文章访问量Top10">
          11111
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>

<script setup>
import {NGrid, NGi,NCard} from 'naive-ui'
import TagArticle from './TagArticle.vue'
</script>

<style scoped>

</style>
