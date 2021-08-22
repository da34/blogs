<template>
  <NDataTable
      v-bind="getBindValues"
  >
  </NDataTable>
</template>

<script setup>
import {NDataTable} from 'naive-ui'
import {ref,unref,computed} from 'vue'
import useColumns from './useColumns'

const LIST_FIELD = 'rows' // 接口返回数据名
const TOTAL_FIELD = 'count' // 接口返回总页数名

const tableData = ref([])
const total = ref(0)


// 基础的props
const propsRef = defineProps({
  ...NDataTable.props,
  // request: {
  //   type: Function,
  //   default: null,
  //   required: true
  // },
  actionColumn: {
    type: Object,
    default: null
  },
})

// hooks
const {getColumnsRef} = useColumns(propsRef)


// fetch()
// // 获取数据
// async function fetch(opt) {
//   const { request, pagination } = unref(propsRef);
//   const { page, pageSize } = pagination
//   const params = Object.assign({page, pageSize}, opt)
//   const res = await request(params)
//   tableData.value = res[LIST_FIELD]
//   total.value = res[TOTAL_FIELD]
// }

//组装表格信息
const getBindValues = computed(() => {
  return {
    ...unref(propsRef),
    columns: unref(getColumnsRef),
    // data: unref(tableData),
  };
});

</script>

<style scoped>

</style>
