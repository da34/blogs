<template>
  <div class="mt-3">
    <NGrid cols="1 s:5 m:5 l:5 xl:5 2xl:5" responsive="screen" :x-gap="12" :y-gap="8">
      <NGi :span="2">
        <NCard segmented size="small" :bordered="false" title="标签文章数量">
          <TagArticle/>
        </NCard>
      </NGi>
      <NGi :span="3">
        <NCard segmented size="small" :bordered="false" title="文章访问量Top5">
          <ArticleTop/>
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>

<script setup>
import {NGrid, NGi,NCard} from 'naive-ui'
import TagArticle from './TagArticle.vue'
import ArticleTop from './ArticleTop.vue'
</script>

<style scoped>

</style>
