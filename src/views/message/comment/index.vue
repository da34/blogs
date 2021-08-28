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
import {ref, toRaw} from 'vue'
import BasicTable from '@/components/BasicTable/index.vue'
import {getCommentList, delComment} from "@/api/web/comment";
import {createActionColumn, columns} from './columns'
import {useDialog} from "naive-ui";

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
const dialog = useDialog()

const options = ref([
  {label: '正常', value: 0},
  {label: '不通过', value: 1},
  {label: '需要人工复查', value: 2}
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
  await fetchComments(opt)
}

function handleDel(record) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      delComment(record.id)
      fetchComments()
    }
  })
}
</script>

<style scoped>

</style>
