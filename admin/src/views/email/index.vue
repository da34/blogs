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
          v-model:value="formValue.from"
          placeholder="请输入发件人"
        />
      </NFormItem>
      <NFormItem>
        <NInput
          v-model:value="formValue.to"
          placeholder="请输入收件人"
        />
      </NFormItem>
      <NFormItem>
        <NSelect
          v-model:value="formValue.isSuccess"
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
      :pagination="true"
      :action-column="actionColumn"
      :request="getEmails"
    />
  </NCard>
</template>
<script>
export default { name: 'EmailList' }
</script>

<script setup>
import {reactive, ref, toRaw} from 'vue'
import BasicTable from '@/components/BasicTable/index.vue'
import {createActionColumn, columns} from './columns'
import {useDialog} from 'naive-ui';
import {getEmails, delEmail} from '@/api/email';

const options = [
  {label: '成功', value: 1},
  {label: '失败', value: 0},
]

const defaultVla = () => ({
  from: null,
  to: null,
  isSuccess: null
})

const formValue = ref(defaultVla())
const tableRef = ref(null)

const dialog = useDialog()

const actionColumn = createActionColumn({handleDel})


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
    onPositiveClick: async () => {
      await delEmail(record.id)
      tableRef.value.reload()
    }
  })
}
</script>

<style scoped>

</style>
