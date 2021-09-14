<template>
  <NCard>
    <NForm
      inline
      label-placement="left"
      :model="formValue"
    >
      <NFormItem>
        <NSpace>
          <NButton
            type="primary"
            @click="handleAction"
          >
            新建文章
          </NButton>
<!--          <NButton-->
<!--            type="error"-->
<!--            @click="handleDel"-->
<!--          >-->
<!--            批量删除-->
<!--          </NButton>-->
        </NSpace>
      </NFormItem>
      <NFormItem
        class="ml-auto"
        label="类型"
      >
        <NSelect
          v-model:value="formValue.type"
          class="w-40"
          placeholder="请选择类型"
          :options="typeOptions"
        />
      </NFormItem>
      <NFormItem label="状态">
        <NSelect
          v-model:value="formValue.status"
          class="w-40"
          placeholder="请选择状态"
          :options="statusOptions"
        />
      </NFormItem>
      <NFormItem label="标题">
        <NInput
          v-model:value="formValue.title"
          placeholder="输入标题"
        />
      </NFormItem>
      <NFormItem>
        <NButton
          attr-type="button"
          @click="handleReset"
        >
          重置
        </NButton>
        <NButton
          class="ml-3"
          attr-type="button"
          type="primary"
          @click="handleSearch"
        >
          查询
        </NButton>
      </NFormItem>
    </NForm>
    <BasicTable
      ref="tableRef"
      :pagination="pagination"
      :columns="columns"
      :request="getArticleList"
      :row-key="row => row.id"
      @update:checked-row-keys="handleCheck"
    />
  </NCard>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {getArticleList, changeArticleState} from "@/api/web/article";
import {createColumns} from "./columns";
import BasicTable from '@/components/BasicTable/index.vue'

const defaultVla = () => ({
  title: null,
  type: null,
  status: null
})

const router = useRouter()
const tableRef = ref(null)

const formValue = ref(defaultVla())
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

let checkedRowKeys = []

const columns = createColumns({
  stateToggle(field, id, value) {
    value /= 1
    changeArticleState({field, id, value})
  },
  handleDel,
  handleEdit(id) {
    router.push({name: 'content_action', params: { id }})
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

function handleReset() {
  formValue.value = defaultVla()
  tableRef.value.reload()
}

function handleSearch() {
  tableRef.value.fetchState(formValue.value)
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
      handleSearch()
    }
  })
}

function handleAction() {
  router.push({name: 'content_action'})
}
</script>

<style scoped>

</style>
