<template>
  <NCard>
    <NForm
        inline
        label-placement="left"
        :model="formValue"
        ref="formRef"
    >
      <NFormItem>
        <NSpace>
          <NButton type="primary" @click="handleAction">新建文章</NButton>
          <NButton type="error" @click="handleDel">批量删除</NButton>
        </NSpace>
      </NFormItem>
      <NFormItem class="ml-auto" label="类型">
        <NSelect
            class="w-40"
            placeholder="请选择类型"
            :options="typeOptions"
            v-model:value="formValue.type"
        />
      </NFormItem>
      <NFormItem label="状态">
        <NSelect
            class="w-40"
            placeholder="请选择状态"
            :options="statusOptions"
            v-model:value="formValue.status"
        />
      </NFormItem>
      <NFormItem label="标题">
        <NInput v-model:value="formValue.title" placeholder="输入标题"/>
      </NFormItem>
      <NFormItem>
        <NButton @click="handleReset" attr-type="button">重置</NButton>
        <NButton class="ml-3" @click="handleSearch" attr-type="button" type="primary" :loading="loading">查询</NButton>
      </NFormItem>
    </NForm>
    <NDataTable
        :pagination="pagination"
        :columns="columns"
        :data="data"
        :row-key="row => row.id"
        :loading="loading"
        @update:checked-row-keys="handleCheck"
    />
  </NCard>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {getArticleList, changeArticleState} from "@/api/web/article";
import {createColumns} from "./columns";
import {useDialog, useMessage} from 'naive-ui'

const dialog = useDialog()
const message = useMessage()
const router = useRouter()

const data = ref([])
const loading = ref(true)
const pagination = ref({
  page: 1,
  onChange: (page) => {
    pagination.value.page = page
    formValue.value.page = page
    getData(formValue.value)
  }
})
let checkedRowKeys = []

getData()

// 表格
async function getData(params = {}) {
  loading.value = true
  const {rows, count} = await getArticleList(params)
  data.value = rows
  pagination.value.pageCount = count
  loading.value = false
}

const columns = createColumns({
  stateToggle(field, id, value) {
    value /= 1
    changeArticleState({field, id, value})
  },
  handleDel,
  handleEdit(id) {
    message.info('send mail to ' + id)
  },
})

// 表单
const statusOptions = ['public', 'draft', 'delete'].map(
    (v, i) => ({
      label: v,
      value: i
    })
)
const typeOptions = ['article', 'page'].map(
    (v, i) => ({
      label: v,
      value: i
    })
)

const formValue = ref({
  title: null,
  type: null,
  status: null,
  page: 1,
})

function handleReset() {
  formValue.value = {
    title: '',
    type: null,
    status: null
  }
  getData()
}

function handleSearch() {
  getData(formValue.value)
}

function handleCheck(keys) {
  checkedRowKeys = keys
}

function handleDel() {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      changeArticleState({field: 'status', id: checkedRowKeys, value: 2})
      getData(formValue.value)
    }
  })
}

function handleAction() {
  router.push({name: 'content_action'})
}
</script>

<style scoped>

</style>
