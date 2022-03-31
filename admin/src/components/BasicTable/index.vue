<template>
  <NDataTable
    :="getBindValues"
    :pagination="pagination"
    @update:page="updatePage"
  />
</template>

<script>
import {NDataTable} from 'naive-ui'
import {computed, defineComponent, toRaw, unref, watch, watchEffect} from 'vue'
import useColumns from './useColumns'
import {useLoading} from './useLoading';
import usePagination from './usePagination'
import useData from './useData'

// 基础的props
const props = {
  ...NDataTable.props,
  request: {
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
    // hooks
    const {getColumnsRef} = useColumns(props)
    const {setLoading, getLoading} = useLoading(props)
    const {getPaginationInfo, setPagination} = usePagination(props)
    const {getDataSource, reload, fetchState} = useData(props, {
      getPaginationInfo,
      setPagination,
      setLoading
    })

    //组装表格信息
    const getBindValues = computed(() => {
      return {
        ...unref(props),
        columns: unref(getColumnsRef),
        remote: true,
        data: getDataSource(),
        loading: unref(getLoading)
      };
    });

    function updatePage(page) {
      setPagination({page})
      reload()
    }

    //获取分页信息
    const pagination = computed(() => unref(getPaginationInfo));

    return {
      getBindValues,
      pagination,
      updatePage,
      reload,
      fetchState
    }
  }
})


</script>

<style scoped>

</style>
