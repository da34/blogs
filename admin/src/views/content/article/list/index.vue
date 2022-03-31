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
      :columns="column"
      :action-column="actionColumn"
      :request="getArticleList"
      :row-key="row => row.id"
      :pagination="true"
    />
  </NCard>
</template>

<script>
export default { name: 'ContentList' }
</script>
<script setup>
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {createActionColumn, createColumns} from './columns';
import BasicTable from '@/components/BasicTable/index.vue'
import {useDialog} from 'naive-ui'
import {delArticle, updateArticle,changeArticleState, getArticleList} from '@/api/article';

const defaultVla = () => ({
  title: null,
  status: null,
})

const router = useRouter()
const dialog = useDialog()
const tableRef = ref(null)

const formValue = ref(defaultVla())

// 表格列
const actionColumn = createActionColumn({handleDel, handleEdit})
const column = createColumns({updateArticle})

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

function handleDel({id}) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      delArticle(id)
      handleSearch()
    }
  })
}

function handleEdit({id}) {
  router.push({name: 'ContentAction', params: {id}})
}

async function stateToggle(field, id, value) {
  value /= 1
  await changeArticleState({field, id, value})
  tableRef.value.reload()
}

function handleAction() {
  router.push({name: 'ContentAction'})
}
</script>

<style scoped>

</style>
