<template>
  <NCard class="">
    <NDataTable :columns="columns" :data="data"/>
  </NCard>
</template>

<script setup>
import {ref} from 'vue'
import {NCard, NDataTable, useMessage} from 'naive-ui'
import {getArticleList} from "@/api/web/article";
import {createColumns} from "./columns";

const data = ref([])

getArticleList().then(res => {
  data.value = res.rows
})


const message = useMessage()
const columns = createColumns({
  sendMail(rowData) {
    message.info('send mail to ' + rowData.name)
  }
})

</script>

<style scoped>

</style>
