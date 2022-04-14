import {computed, unref, ref} from 'vue';
import {isBoolean} from 'lodash-es';
import {TOTAL_FIELD} from './const'

export default function usePagination(refProps) {
  const configRef = ref({});

  const getPaginationInfo = computed(() => {
    const {pagination} = unref(refProps);
    if ((isBoolean(pagination) && !pagination)) {
      return false
    }
    return {
      page: 1,
      pageSize: 10,
      // prefix({itemCount}) {
      //   return `共 ${itemCount} 项`
      // },
      ...unref(pagination),
      ...unref(configRef),
      pageCount: Math.ceil((unref(configRef)[TOTAL_FIELD] || 0) / 10)
    }
  })

  function setPagination(info) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    };
  }

  return {
    getPaginationInfo,
    setPagination
  }
}