<template>
  <NCard>
    <!--搜索工具-->
    <NForm
      inline
      label-placement="left"
      :model="formValue"
    >
      <NFormItem>
        <NInput
          v-model:value="formValue['filters[name]']"
          placeholder="请输入评论人"
        />
      </NFormItem>
      <NFormItem>
        <NInput
          v-model:value="formValue['filters[ip]']"
          placeholder="请输入ip地址"
        />
      </NFormItem>
      <NFormItem>
        <NSelect
          v-model:value="formValue['filters[status]']"
          style="width: 180px;"
          placeholder="请选择状态"
          :options="options"
        />
      </NFormItem>
      <NFormItem>
        <NButton
          attr-type="button"
          type="primary"
          @click="queryComments"
        >
          查询
        </NButton>
        <NButton
          class="ml-3"
          attr-type="button"
          @click="handleReset"
        >
          重置
        </NButton>
      </NFormItem>
    </NForm>
    <!--表格-->
    <BasicTable
      ref="tableRef"
      :row-key="row => row.id"
      :columns="columns"
      :pagination="pagination"
      :action-column="actionColumn"
      :request="getCommentList"
      :single-line="false"
    />
  </NCard>
</template>

<script setup>
import {reactive, ref, toRaw} from 'vue'
import BasicTable from '@/components/BasicTable/index.vue'
import {getCommentList, delComment} from '@/api/web/comment';
import {createActionColumn, columns} from './columns'
import {useDialog} from 'naive-ui';

const options = [
  {label: '正常', value: 'pass'},
  {label: '不通过', value: 'block'},
  {label: '需要人工复查', value: 'review'}
]

const formValue = ref({
  'filters[name]': null,
  'filters[ip]': null,
  'filters[status]': null
})
const tableRef = ref(null)

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

const dialog = useDialog()

const actionColumn = createActionColumn({handleDel})
const defaultVla = () => ({
  'filters[name]': null,
  'filters[ip]': null,
  'filters[status]': null
})

async function queryComments() {
  const opt = toRaw(formValue.value)
  await tableRef.value.fetchState(opt)
}

function handleReset() {
  formValue.value = defaultVla()
  tableRef.value.reload()
}


function handleDel(record) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      delComment(record.id)
      tableRef.value.reload()
    }
  })
}
</script>

<style scoped>

</style>
