import {computed, unref} from 'vue'
import {cloneDeep} from 'lodash-es';

export default function useColumns(propsRef) {
  let columnsRef = unref(propsRef).columns

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(columnsRef);

    handleActionColumn(propsRef, columns);
    if (!columns) return [];
    return columns;
  });


  // 处理列
  function handleActionColumn(propsRef, columns) {
    const {actionColumn} = unref(propsRef)
    if (!actionColumn) return;

    // 查找是否传入了action
    !columns.find((col) => col.key === 'action') && columns.push({
      ...actionColumn,
    });
  }


  return {
    getColumnsRef
  }
}
