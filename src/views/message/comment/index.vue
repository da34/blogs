<template>
  <NCard>
    <!--搜索工具-->
    <NForm
        inline
        label-placement="left"
        :model="formValue"
        ref="formRef"
    >
      <NFormItem path="name">
        <NInput v-model:value="formValue.name" placeholder="请输入标签名"/>
      </NFormItem>
      <NFormItem>
        <NButton attr-type="button" type="primary">查询</NButton>
        <NButton class="ml-3" attr-type="button">重置</NButton>
      </NFormItem>
    </NForm>
    <!--表格-->
    <BasicTable
        :data="data"
        :rowKey="row => row.id"
        :columns="createColumns"
        :loading="loading"
        :pagination="pagination"
        :actionColumn="actionColumn"
    />
  </NCard>
</template>

<script setup>
import {h, ref} from 'vue'
import {NButton, NCard, NEmpty, NImage, NSwitch, NTag, NForm, NFormItem, NInput, NModal} from 'naive-ui'
import BasicTable from '@/components/BasicTable/index.vue'
import TableAction from '@/components/BasicTable/TableAction.vue'
// import {getTagList, delTag, createTag, editTag} from "@/api/web/tag";
import {createColumns} from './columns'

const formValue = ref({})

const pagination = ref({
  page: 1,
  pageSize: 10,
  onChange: (page) => {
    pagination.value.page = page
    console.log(page)
  }
})

const actionColumn = {
  width: 150,
  title: '操作',
  key: 'action',
  fixed: 'right',
  align: 'center',
  render(record) {
    return h(TableAction, {
      style: 'button',
      actions: createActions(record),
    });
  }
}


function createActions(record) {
  return [
    {
      label: '删除',
      onClick: handleDel.bind(null, record),
    }
  ]
}

function handleDel() {
}
</script>

<style scoped>

</style>
