<template>
  <NCard>
    <!--表格-->
    <BasicTable
      ref="tableRef"
      :row-key="row => row.id"
      :columns="columns"
      :pagination="pagination"
      :action-column="actionColumn"
      :request="getCommentCheckList"
      :single-line="false"
    />
  </NCard>
</template>

<script setup>
import {reactive, ref} from 'vue'
import BasicTable from '@/components/BasicTable/index.vue'
import {getCommentList, editComment} from '@/api/web/comment';
import {createActionColumn, columns} from './columns'
import {useDialog} from 'naive-ui';

const formValue = ref({
  name: null,
  ip: null,
  status: null
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

const actionColumn = createActionColumn({handleNoPass, handlePass})


async function handlePass(record) {
  record.status = 'pass'
  await editComment(record)
  tableRef.value.reload()
}

function handleNoPass(record) {
  dialog.warning({
    title: '警告',
    content: '你确定不通过吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      record.status = 'block'
      await editComment(record)
      tableRef.value.reload()
    }
  })
}

function getCommentCheckList () {
  return new Promise(async (resolve, reject) => {
    const result = await getCommentList({ 'filters[status]': 'review'})
    resolve(result)
  })
}
</script>

<style scoped>

</style>
