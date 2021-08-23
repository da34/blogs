<template>
  <NCard>
    <!--搜索工具-->
    <NForm
        inline
        label-placement="left"
        :model="formValue"
        ref="formRef"
    >
      <NFormItem>
        <NInput v-model:value="formValue.nickName" placeholder="请输入评论人"/>
      </NFormItem>
      <NFormItem>
        <NInput v-model:value="formValue.ip" placeholder="请输入ip地址"/>
      </NFormItem>
      <NFormItem>
        <NSelect style="width: 180px;" placeholder="请选择状态" v-model:value="formValue.status" :options="options"/>
      </NFormItem>
      <NFormItem>
        <NButton attr-type="button" type="primary" @click="queryComments">查询</NButton>
        <NButton class="ml-3" attr-type="button">重置</NButton>
      </NFormItem>
    </NForm>
    <!--表格-->
    <BasicTable
        :data="comments"
        :rowKey="row => row.id"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        :actionColumn="actionColumn"
    />
  </NCard>
</template>

<script setup>
import {ref, unref, toRaw} from 'vue'
import {NButton, NCard, NForm, NFormItem, NInput, NSelect} from 'naive-ui'
import BasicTable from '@/components/BasicTable/index.vue'

import {getCommentList} from "@/api/web/comment";
import {createActionColumn, columns} from './columns'

const formValue = ref({
  name: null,
  ip: null,
  status: null
})
const comments = ref([])
const loading = ref(false)
const pagination = ref({
  page: 1,
  pageSize: 10,
  onChange: (page) => {
    pagination.value.page = page
    const opt = {page}
    fetchComments(opt)
  }
})

const options = ref([
  {label: '删除', value: 0},
  {label: '正常', value: 1},
  {label: '不通过', value: 2},
  {label: '需要人工复查', value: 3}
])

const actionColumn = createActionColumn({handleDel})

fetchComments()

async function fetchComments(opt = {}) {
  loading.value = true
  const {rows, count} = await getCommentList(opt)
  comments.value = rows
  pagination.value.pageCount = count
  loading.value = false
}

async function queryComments() {
  const opt = toRaw(formValue.value)
  console.log(opt)
  await fetchComments(opt)
}

function handleDel(row) {
  console.log(unref(row))
}
</script>

<style scoped>

</style>
