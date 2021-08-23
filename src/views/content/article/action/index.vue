<template>
  <NSpace vertical>
    <NGrid class="flex items-center">
      <NGi span="18">
        <NInput class="w-screen" v-model:value="article.title" size="large" type="text" placeholder="输入文章标题"/>
      </NGi>
      <NGi class="ml-3" span="1">
        <NButton type="primary" @click="showModal = true">发布</NButton>
      </NGi>
    </NGrid>

    <!--markdown-->
    <div id="vditor"></div>

    <!--发布modal-->
    <Public/>
  </NSpace>
</template>

<script setup>
import {NSpace, NInput, NButton, NGrid, NGi} from 'naive-ui'

import {onMounted, ref, reactive,provide} from 'vue'
import Vditor from 'vditor'
import "vditor/src/assets/scss/index.scss"
import Public from "./public.vue";

const article = reactive({
  title: '',
  content: ''
})

const showModal = ref(false)
provide('showModal', showModal)

onMounted(() => {
  new Vditor('vditor', {
    mode: 'sv',
    toolbar: [
      "emoji",
      "headings",
      "bold",
      "italic",
      "strike",
      "link",
      "|",
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent",
      "|",
      "quote",
      "line",
      "code",
      "inline-code",
      "insert-before",
      "insert-after",
      "|",
      "upload",
      "table",
      "|",
      "undo",
      "redo",
      "|",
      "fullscreen",
      "edit-mode",
      {
        name: "more",
        toolbar: [
          "both",
          "code-theme",
          "content-theme",
          "export",
          "outline",
          "preview",
        ],
      },
    ],
  })
})


</script>

<style scoped lang="scss">

#vditor {
  min-height: calc(100vh - 180px);
}

:deep .n-dialog.n-modal {
  width: 600px !important;
}
</style>
