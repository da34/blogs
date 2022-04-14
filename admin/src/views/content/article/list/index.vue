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
        label="标题"
        class="ml-auto"
      >
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
      :pagination="true"
      :columns="column"
      :action-column="actionColumn"
      :request="getArticleList"
      :row-key="row => row.id"
    />
  </NCard>
</template>

<script>
export default { name: 'ContentList' }
</script>
<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {createActionColumn, createColumns} from './columns';
import BasicTable from '@/components/BasicTable/index.vue'
import {useDialog} from 'naive-ui'
import {delContent, updateContent, getContents} from '@/api/content';

const defaultVla = () => ({
  title: ''
})

const router = useRouter()
const dialog = useDialog()
const tableRef = ref(null)

const formValue = ref(defaultVla())

// 表格列
const actionColumn = createActionColumn({handleDel, handleEdit})
const column = createColumns({updateContent})

function handleReset() {
  formValue.value = defaultVla()
  tableRef.value.reload()
}

function handleSearch() {
  tableRef.value.fetchState(formValue.value)
}

async function getArticleList(opt) {
  const data = await getContents({...opt, type: 'article'})
  return data
}

function handleDel({id}) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      delContent(id)
      handleSearch()
    }
  })
}

function handleEdit({id}) {
  router.push({name: 'ContentAction', params: {id}})
}

function handleAction() {
  router.push({name: 'ContentAction'})
}
</script>

<style scoped>

</style>
