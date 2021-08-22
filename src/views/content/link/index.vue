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
        <NInput v-model:value="formValue.name" placeholder="请输入友联名"/>
      </NFormItem>
      <NFormItem>
        <NButton @click="handleValidateClick" attr-type="button" type="primary">查询</NButton>
        <NButton class="ml-3" @click="reload" attr-type="button">重置</NButton>
      </NFormItem>
      <NFormItem>
        <NButton type="primary" @click="handleNew">新建友联</NButton>
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
          <NInput v-model:value="formData.name" placeholder="请输入友联名"/>
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
import {h, ref} from 'vue'
import {NButton, NCard, NEmpty, NImage, NSwitch, NTag, NForm, NFormItem, NInput, NModal} from 'naive-ui'
import BasicTable from '@/components/BasicTable/index.vue'
import TableAction from '@/components/BasicTable/TableAction.vue'
import {getTagList, delTag, createTag, editTag} from "@/api/web/tag";
import {formatDate} from "@/utils";

const pagination = ref({
  page: 1,
  pageSize: 10,
  onChange: (page) => {
    pagination.value.page = page
    console.log(page)
  }
})

const formValue = ref({
  name: null,
})
const formRef = ref(null)
const formDataRef = ref(null)
const loading = ref(false)
const data = ref([])
const useShowModal = ref(false)
const formData = ref({
  name: null,
  id: null
})
const titleType = ref('new')

//表格
const rules = {
  name: {
    required: true,
    message: '请输入标签名',
    trigger: ['input']
  }
}

fetchList()

async function fetchList(opt) {
  loading.value = true
  const params = Object.assign({page: pagination.value.page}, opt)
  const {rows, count} = await getTagList(params)
  data.value = rows
  pagination.value.pageCount = count
  loading.value = false
}

function reload() {
  formValue.value.name = null
  fetchList({page: 1})
}

function handleValidateClick(e) {
  formRef.value.validate((errors) => {
    if (!errors) {
      fetchList({page: 1, name: formValue.value.name})
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
  delTag(record.id)
  reload()
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
      reload()
      useShowModal.value = false
    }
  })
}

</script>

<style scoped>

</style>
