<template>
  <div>
    <NCard
      :bordered="false"
      :segmented="{ content: 'hard' }"
      size="small"
    >
      <template #header>
        <NButton
          ghost
          icon-placement="right"
          type="primary"
          @click="addMenu"
        >
          添加日志
        </NButton>
      </template>
      <!--表格-->
      <div class="w-full menu">
        <BasicTable
          ref="tableRef"
          :action-column="actionColumn"
          :columns="columns"
          :request="fetch"
          :row-key="(row) => row.id"
        />
      </div>
    </NCard>
    <CreateDrawer
      ref="createDrawerRef"
      :title="createTitle"
      width="50%"
      @submitAfter="reload"
    />
  </div>
</template>
<script>
export default { name: 'HistoryList' }
</script>
<script setup>
import {reactive, ref, toRaw} from 'vue';
import {useDialog, useMessage} from 'naive-ui';
import {getHistories, delHistory} from '@/api/history';
import {columns, createActionColumn} from './columns'
import BasicTable from '@/components/BasicTable/index.vue'
import CreateDrawer from './CreateDrawer.vue'

const createDrawerRef = ref();
const tableRef = ref(null);
const message = useMessage();
const dialog = useDialog();
const createTitle = ref('添加日志');
const actionColumn = createActionColumn({handleDel, handleEdit})
// const pagination = reactive({
//   page: 1,
//   pageCount: 1,
//   pageSize: 10,
//   itemCount: 0,
//   prefix({itemCount}) {
//     return `共 ${itemCount} 项`
//   },
//   onChange: (page) => {
//     pagination.page = page
//   }
// })

function handleDel(row) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      await delHistory(row.id)
      reload()
    }
  })
}

function reload() {
  tableRef.value.reload()
}

function openCreateDrawer() {
  const {openDrawer} = createDrawerRef.value;
  openDrawer()
}

function addMenu() {
  openCreateDrawer()
  createTitle.value = '添加日志'
  createDrawerRef.value.handleReset()
}

function handleEdit(row) {
  openCreateDrawer()
  createTitle.value = '编辑日志'
  row.date *= 1
  row.desc = row.desc.join('\r\n')
  createDrawerRef.value.formParams = {...toRaw(row)}
}


async function fetch() {
  return await getHistories()
}


</script>
