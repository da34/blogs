<template>
  <NDataTable
    :="getBindValues"
    @update:page="updatePage"
  />
</template>

<script>
import {NDataTable} from 'naive-ui'
import {ref, unref, computed, defineComponent, onMounted, watchEffect} from 'vue'
import useColumns from './useColumns'
import {useLoading} from "./useLoading";
import { isFunction, isArray } from "lodash-es";

const LIST_FIELD = 'rows' // 接口返回数据名
const TOTAL_FIELD = 'count' // 接口返回数据总数名

// 基础的props
const props = {
  ...NDataTable.props,
  request: {
    type: Function,
    default: null
  },
  tableData: {
    type: Function,
    default: null
  },
  actionColumn: {
    type: Object,
    default: null
  },
}

export default defineComponent({
  props,
  setup(props) {
    const data = ref([])
    const { request, pagination, tableData } = unref(props);
    let cacheParams = {}

    // hooks
    const {getColumnsRef} = useColumns(props)
    const {setLoading, getLoading} = useLoading(props)

    // 获取数据
    async function fetchState(opt = {}) {
      setLoading(true)
      const {page} = pagination
      const params = Object.assign({page}, opt)
      // 缓存请求参数
      cacheParams = opt
      const res = await request(params)
      if (isArray(res)) {
        data.value = res
      } else {
        data.value = res[LIST_FIELD]
        pagination.itemCount = res[TOTAL_FIELD]
      }
      setLoading(false)
    }

    async function reload(opt = {}) {
      // 缓存请求参数
      cacheParams = opt
      const params = Object.assign({page: 1}, opt)
      await fetchState(params)
    }

    onMounted(() => {
      // 传入了request 才发送请求
      if (isFunction(request)) {
        setTimeout(() => {
          fetchState();
        }, 16);
      }
    });

    //组装表格信息
    const getBindValues = computed(() => {
      return {
        ...unref(props),
        columns: unref(getColumnsRef),
        remote: true,
        data: isFunction(request) ? unref(data) : unref(tableData),
        loading: unref(getLoading)
      };
    });

    function updatePage(page) {
      cacheParams = Object.assign(cacheParams, { page })
      fetchState(cacheParams)
    }

    return {
      getBindValues,
      fetchState,
      reload,
      updatePage
    }
  }
})


</script>

<style scoped>

</style>
