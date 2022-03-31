import {isArray, isBoolean} from 'lodash-es';
import {LIST_FIELD, TOTAL_FIELD, PAGE_FIELD, SIZE_FIELD} from './const';
import {onMounted, ref, unref} from 'vue';

export default function useData(props, needFn) {
  let cacheParams = {}
  const {request, pagination} = props
  const DataSource = ref([])

  // hooks
  const {setLoading, getPaginationInfo, setPagination} = needFn

  // 获取数据
  async function fetchState(opt = {}) {
    if (!request) return
    setLoading(true)

    const {page = 1, pageSize = 10} = unref(getPaginationInfo)
    let pageParams = {}

    if (isBoolean(pagination)) {
      pageParams[PAGE_FIELD] = (opt && opt[PAGE_FIELD]) || page;
      pageParams[SIZE_FIELD] = pageSize;
    }
    // console.log('pageParams', pageParams)
    const params = {
      ...pageParams,
      ...opt
    }
    // 缓存请求参数
    cacheParams = opt
    const res = await request(params)

    DataSource.value = isArray(res) ? res : res[LIST_FIELD]
    setPagination({
      [TOTAL_FIELD]: res[TOTAL_FIELD] || 0,
    });
    setLoading(false)
  }

  async function reload(opt = {}) {
    await fetchState(opt)
  }

  onMounted(() => {
    fetchState()
  });

  function getDataSource() {
    return DataSource.value;
  }

  return {
    getDataSource,
    reload,
    fetchState
  }
}