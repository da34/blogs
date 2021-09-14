<template>
  <NCard>
    <!--搜索工具-->
    <NForm
      ref="formRef"
      inline
      label-placement="left"
      :model="formValue"
      :rules="rules"
    >
      <NFormItem path="name">
        <NInput
          v-model:value="formValue.name"
          placeholder="请输入友联名"
        />
      </NFormItem>
      <NFormItem>
        <NButton
          attr-type="button"
          type="primary"
          @click="handleValidateClick"
        >
          查询
        </NButton>
        <NButton
          class="ml-3"
          attr-type="button"
          @click="reload"
        >
          重置
        </NButton>
      </NFormItem>
      <NFormItem>
        <NButton
          type="primary"
          @click="handleNew"
        >
          新建友联
        </NButton>
      </NFormItem>
    </NForm>
    <!--表格-->
    <BasicTable
      ref="tableRef"
      :request="getLinks"
      :row-key="row => row.id"
      :columns="createColumn"
      :pagination="pagination"
      :action-column="actionColumn"
    />

    <!--编辑、新建标签-->
    <NModal
      v-model:show="useShowModal"
      preset="card"
      :show-icon="false"
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
        ref="formDataRef"
        class="mt-5"
        label-placement="left"
        label-width="100"
        :model="formData"
        :rules="rules"
      >
        <NFormItem
          label="网站logo"
          path="avatar"
        >
          <NInput
            v-model:value="formData.avatar"
            placeholder="请输入网站logo"
          />
        </NFormItem>
        <NFormItem
          label="网站名称"
          path="name"
        >
          <NInput
            v-model:value="formData.name"
            placeholder="请输入网站名称"
          />
        </NFormItem>
        <NFormItem
          label="URL"
          path="URL"
        >
          <NInput
            v-model:value="formData.URL"
            placeholder="请输入网站地址"
          />
        </NFormItem>
        <NFormItem label="简述">
          <NInput
            v-model:value="formData.outline"
            type="textarea"
            placeholder="请输入简述"
          />
        </NFormItem>
      </NForm>
      <template #action>
        <div class="flex justify-end">
          <NButton
            class="mr-4"
            @click="useShowModal = false"
          >
            取消
          </NButton>
          <NButton
            type="primary"
            @click="handleAction"
          >
            确定
          </NButton>
        </div>
      </template>
    </NModal>
  </NCard>
</template>

<script setup>
import {reactive, ref} from 'vue'
import BasicTable from '@/components/BasicTable/index.vue'
import {getLinks, delLink, createLink, editLink, statusToggle} from "@/api/web/link";
import {columns, createActionColumn} from './columns'
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

const formValue = ref({})
const formRef = ref(null)
const tableRef = ref(null)
const formDataRef = ref(null)
const useShowModal = ref(false)
const formData = ref({})
const titleType = ref('new')
const dialog = useDialog()

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


function handleDel(record) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      delLink(record.id)
      tableRef.value.reload()
    }
  })
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
      tableRef.value.reload()
      useShowModal.value = false
    }
  })
}

async function handleUpdate(row, status) {
  await statusToggle({id: row.id, status})
}

</script>
