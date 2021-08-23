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
        :columns="createColumn"
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
          {{ titleType === 'new' ? '新建' : '编辑' }}友联
        </div>
      </template>
      <NForm
          class="mt-5"
          label-placement="left"
          label-width="100"
          :model="formData"
          :rules="rules"
          ref="formDataRef"
      >
        <NFormItem label="网站logo" path="avatar">
          <NInput v-model:value="formData.avatar" placeholder="请输入网站logo"/>
        </NFormItem>
        <NFormItem label="网站名称" path="name">
          <NInput v-model:value="formData.name" placeholder="请输入网站名称"/>
        </NFormItem>
        <NFormItem label="URL" path="URL">
          <NInput v-model:value="formData.URL" placeholder="请输入网站地址"/>
        </NFormItem>
        <NFormItem label="简述">
          <NInput type="textarea" v-model:value="formData.outline" placeholder="请输入简述"/>
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
import {ref} from 'vue'
import {NButton, NCard, NEmpty, NImage, NSwitch, NTag, NForm, NFormItem, NInput, NModal, NAvatar} from 'naive-ui'
import BasicTable from '@/components/BasicTable/index.vue'
import {getLinks, delLink, createLink, editLink, statusToggle} from "@/api/web/link";
import {columns, createActionColumn} from './columns'

const pagination = ref({
  page: 1,
  pageSize: 10,
  onChange: (page) => {
    pagination.value.page = page
    console.log(page)
  }
})

const formValue = ref({})
const formRef = ref(null)
const formDataRef = ref(null)
const loading = ref(false)
const data = ref([])
const useShowModal = ref(false)
const formData = ref({})
const titleType = ref('new')

const actionColumn = createActionColumn({handleDel, handleEdit})
const createColumn = columns({handleUpdate})

//表格
const rules = {
  avatar: {
    required: true,
    message: '请输入网站logo',
    trigger: ['input']
  },
  name: {
    required: true,
    message: '请输入名称',
    trigger: ['input']
  },
  URL: [{
    required: true,
    message: '请输入网站地址',
    trigger: ['input'],
  },
    {
      type: 'url',
      message: '请输入正确的地址',
    }
  ]
}

fetchList()

async function fetchList(opt) {
  loading.value = true
  const params = Object.assign({page: pagination.value.page}, opt)
  const {rows, count} = await getLinks(params)
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


function handleDel(record) {
  delLink(record.id)
  reload()
}

function handleEdit(record) {
  titleType.value = 'edit'
  formData.value = {...record}
  useShowModal.value = true
}

function handleNew() {
  titleType.value = 'new'
  formData.value = {
    name: null,
    logo: null,
    outline: null,
    URL: null,
  }
  useShowModal.value = true
}

function handleAction() {
  formDataRef.value.validate(async (errors) => {
    if (!errors) {
      // 存在id 证明是edit
      formData.value.id ? await editLink(formData.value) : await createLink(formData.value)
      reload()
      useShowModal.value = false
    }
  })
}

async function handleUpdate(row, status) {
  await statusToggle({id: row.id, status})
}

</script>
