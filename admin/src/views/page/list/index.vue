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
          v-model:value="formValue.title"
          placeholder="输入名称"
        />
      </NFormItem>
      <NFormItem label="路径">
        <NInput
          v-model:value="formValue.slug"
          placeholder="输入路径"
        />
      </NFormItem>
      <!--      <NFormItem-->
      <!--        label="状态"-->
      <!--      >-->
      <!--        <NSelect-->
      <!--          v-model:value="formValue.status"-->
      <!--          class="w-40"-->
      <!--          :options="statusOptions"-->
      <!--        />-->
      <!--      </NFormItem>-->
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
      :request="getContentList"
      :row-key="row => row.id"
    />
  </NCard>
</template>
<script>
export default { name: 'PageList' }
</script>
<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {createActionColumn, createColumns} from './columns';
import BasicTable from '@/components/BasicTable/index.vue'
import {useDialog} from 'naive-ui'
import {delContent, updateContent, getContents} from '@/api/content';

const defaultVla = () => ({
  title: '',
  slug: '',
  status: null
})

const router = useRouter()
const dialog = useDialog()
const tableRef = ref(null)

const formValue = ref(defaultVla())
// 表格列
const actionColumn = createActionColumn({handleDel, handleEdit, handleReview, handleIsDown})
const column = createColumns({updateContent})

// const statusOptions = ['正常', '下线'].map(
//   (v) => ({
//     label: v,
//     value: v === '正常'
//   })
// )

async function getContentList(opt) {
  const data = await getContents({ ...opt, type: 'page' })
  return data
}

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
  await updateContent(pageInfo)
  handleReset()
}

function handleDel({id}) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      await delContent(id)
      handleSearch()
    }
  })
}

function handleEdit({id}) {
  router.push({name: 'PageAction', params: {id}})
}

function handleAction() {
  router.push({name: 'PageAction'})
}
</script>

<style scoped>

</style>
