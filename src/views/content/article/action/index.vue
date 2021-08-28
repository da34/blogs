<template>
  <NSpace vertical>
    <NGrid class="flex items-center">
      <NGi span="18">
        <NInput class="w-screen" v-model:value="article.title" size="large" type="text" placeholder="输入文章标题"/>
      </NGi>
      <NGi class="ml-3" span="1">
        <NButton type="primary" @click="publicClick">发布</NButton>
      </NGi>
    </NGrid>

    <!--markdown-->
    <MarkDown v-model:text="article.content" />

    <!--发布modal-->
    <Public :tags="tags" />
  </NSpace>
</template>

<script setup>
import {ref, reactive,provide} from 'vue'
import Public from "./public.vue";
import MarkDown from '@/components/Markdown/index.vue'
import {getTagList} from "@/api/web/tag";

const tags = ref()
getTagList({pageSize: 99}).then(res => tags.value = res.rows)
const message = useMessage()
const article = reactive({
  title: '',
  content: ''
})

const showModal = ref(false)
provide('showModal', showModal)



function publicClick() {
  console.log(article)
  if (!article.title) {
    message.warning('标题不能为空')
    return
  }
  if (!article.content) {
    message.warning('内容不能为空')
    return
  }
  showModal.value = true
}

</script>

<style scoped lang="scss">

#vditor {
  min-height: calc(100vh - 180px);
}

:deep .n-dialog.n-modal {
  width: 600px !important;
}
</style>
