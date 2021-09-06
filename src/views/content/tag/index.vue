<template>
  <NCard>
    <!--搜索工具-->
    <NForm
        inline
        label-placement="left"
        :model="formValue"
        :rules="rules"
        ref="formRef"
    >
      <NFormItem path="name">
        <NInput v-model:value="formValue.name" placeholder="请输入标签名"/>
      </NFormItem>
      <NFormItem>
        <NButton @click="handleValidateClick" attr-type="button" type="primary">查询</NButton>
        <NButton class="ml-3" @click="reload" attr-type="button">重置</NButton>
      </NFormItem>
      <NFormItem>
        <NButton type="primary" @click="handleNew">新建标签</NButton>
      </NFormItem>
    </NForm>
    <!--表格-->
    <BasicTable
        ref="tableRef"
        :rowKey="row => row.id"
        :columns="createColumns"
        :actionColumn="actionColumn"
        :pagination="pagination"
        :request="getTagList"
    />
    <!--编辑、新建标签-->
    <NModal
        v-model:show="useShowModal"
        preset="card"
        :showIcon="false"
        :closable="false"
        class="w-1/3"
        :segmented="{content: 'hard', action: 'hard'}"
    >
      <template #header>
        <div class="border-b-1 border-gray-200">
          {{ titleType === 'new' ? '新建' : '编辑' }}标签
        </div>
      </template>
      <NForm
          class="mt-5"
          label-placement="left"
          :model="formData"
          :rules="rules"
          ref="formDataRef"
      >
        <NFormItem label="标签名" path="name">
          <NInput v-model:value="formData.name" placeholder="请输入标签名"/>
        </NFormItem>

      </NForm>
      <template #action>
        <div class="flex justify-end">
          <NButton @click="useShowModal = false" class="mr-4">取消</NButton>
          <NButton @click="handleAction" type="primary">确定</NButton>
        </div>
      </template>
    </NModal>
  </NCard>
</template>

<script setup>
import {h, ref,reactive, onMounted} from 'vue'
import BasicTable from '@/components/BasicTable/index.vue'
import TableAction from '@/components/BasicTable/TableAction.vue'
import {getTagList, delTag, createTag, editTag} from "@/api/web/tag";
import {formatDate} from "@/utils";
import {useDialog} from "naive-ui";

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  prefix ({ itemCount }) {
    return `共 ${itemCount} 项`
  },
  onChange: (page) => {
    pagination.page = page
  }
})

const formValue = ref({
  name: null,
})
const formRef = ref(null)
const tableRef = ref(null)
const formDataRef = ref(null)
const useShowModal = ref(false)
const formData = ref({
  name: null,
  id: null
})
const titleType = ref('new')
const dialog = useDialog()

//表格
const rules = {
  name: {
    required: true,
    message: '请输入标签名',
    trigger: ['input']
  }
}

function reload() {
  formValue.value.name = null
  tableRef.value.reload()
}

function handleValidateClick(e) {
  formRef.value.validate((errors) => {
    if (!errors) {
      tableRef.value.fetchState({page: 1, name: formValue.value.name})
    }
  })
}

const createColumns = [
  {type: 'selection', key: 'selection'},
  {title: '序号', key: 'number', render: (row, index) => index + 1},
  {title: '标签名', key: 'name', ellipsis: true,},
  {title: '浏览量', key: 'views'},
  {
    title: '创建时间',
    key: 'createdAt',
    render(row) {
      return h(
          'span',
          null,
          {
            default: () => row.createdAt && formatDate(row.createdAt)
          }
      )
    }
  }
]

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
      label: '编辑',
      onClick: () => handleEdit(record),
    },
    {
      label: '删除',
      onClick: handleDel.bind(null, record),
    }
  ]
}

function handleDel(record) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      delTag(record.id)
      tableRef.value.reload()
    }
  })
}

function handleEdit(record) {
  titleType.value = 'edit'
  formData.value.name = record.name
  formData.value.id = record.id
  useShowModal.value = true
}

function handleNew() {
  titleType.value = 'new'
  formData.value.name = null
  formData.value.id = null
  useShowModal.value = true
}

function handleAction() {
  const data = {
    id: formData.value.id,
    name: formData.value.name
  }
  formDataRef.value.validate(async (errors) => {
    if (!errors) {
      formData.value.id ? await editTag(data) : await createTag(data)
      tableRef.value.reload()
      useShowModal.value = false
    }
  })
}

</script>

<style scoped>

</style>
