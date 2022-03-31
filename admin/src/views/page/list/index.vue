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
            新建页面
          </NButton>
        </NSpace>
      </NFormItem>
      <NFormItem
        label="名称"
        class="ml-auto"
      >
        <NInput
          v-model:value="formValue.name"
          placeholder="输入名称"
        />
      </NFormItem>
      <NFormItem label="路径">
        <NInput
          v-model:value="formValue.path"
          placeholder="输入路径"
        />
      </NFormItem>
      <NFormItem
        label="状态"
      >
        <NSelect
          v-model:value="formValue.status"
          class="w-40"
          :options="statusOptions"
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
      :pagination="true"
      :columns="column"
      :action-column="actionColumn"
      :request="getPages"
      :row-key="row => row.id"
    />
  </NCard>
</template>
<script>
export default { name: 'PageList' }
</script>
<script setup>
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {createActionColumn, createColumns} from './columns';
import BasicTable from '@/components/BasicTable/index.vue'
import {useDialog} from 'naive-ui'
import {delPage, updatePage, getPages} from '@/api/page';

const defaultVla = () => ({
  name: '',
  path: '',
  status: ''
})

const router = useRouter()
const dialog = useDialog()
const tableRef = ref(null)

const formValue = ref(defaultVla())
// 表格列
const actionColumn = createActionColumn({handleDel, handleEdit, handleReview, handleIsDown})
const column = createColumns({updatePage})

const statusOptions = ['publish', 'draft'].map(
  (v) => ({
    label: v,
    value: v
  })
)

function handleReset() {
  formValue.value = defaultVla()
  tableRef.value.reload()
}

function handleSearch() {
  tableRef.value.fetchState(formValue.value)
}

function handleReview() {
  tableRef.value.fetchState(formValue.value)
}

async function handleIsDown(pageInfo, status) {
  pageInfo.status = status
  await updatePage(pageInfo)
  handleReset()
}

function handleDel({id}) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      await delPage(id)
      handleSearch()
    }
  })
}

function handleEdit({id}) {
  router.push({name: 'PageAction', params: {id}})
}

async function stateToggle(field, id, value) {
  value /= 1
  await updatePage({field, id, value})
  tableRef.value.reload()
}

function handleAction() {
  router.push({name: 'PageAction'})
}
</script>

<style scoped>

</style>
