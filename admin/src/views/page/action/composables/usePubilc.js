import {ref, unref} from 'vue';
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui';
import {createContent, updateContent} from '@/api/content'

export function usePublic(show) {
  const defaultVal = () => ({
    title: '',
    text: '',
    allowComment: true,
    path: '',
    order: 0,
    status: true,
    type: 'page'
  })
  // 初始化页面信息
  const page = ref(defaultVal())
  const router = useRouter()
  const message = useMessage()

  async function submitCallback() {
    if (!page.value.path) {
      message.info('路径不能为空')
      return
    }
    await page.value?.id ? updateContent(unref(page)) : createContent(unref(page))
    resetData()
    show.value = false
    await router.push({name: 'RedirectCon', params: { path: '/page', toComName: 'PageList' }})
  }

  function resetData() {
    page.value = defaultVal()
  }

  function cancelCallback() {
    show.value = false
  }

  function setArticle(data) {
    page.value = data
  }

  return {
    page,
    submitCallback,
    cancelCallback,
    setArticle,
  }
}
