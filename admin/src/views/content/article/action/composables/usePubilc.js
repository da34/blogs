import {ref, unref, watch} from 'vue';
import { useRouter } from 'vue-router'
import {createContent, updateContent} from '@/api/content';

export function usePublic(show) {
  const defaultVal = () => ({
    title: '',
    text: '',
    type: 'article',
    allowComment: true,
    briefContent: '',
    coverImage: '',
    isTop: false,
    tagsId: [],
    categoryId:null,
  })
  // 初始化文章
  const article = ref(defaultVal())
  const router = useRouter()

  // 内容变化，更改描述
  watch(
    () => article.value.text,
    () => {
      article.value.briefContent = article.value.text.slice(0, 80)
    })

  async function submitCallback() {

    await article.value.id ? updateContent(unref(article)) : createContent(unref(article))
    resetData()
    show.value = false
    await router.push({name: 'RedirectCon', params: { path: '/content/list', toComName: 'ContentList' }})
  }

  function resetData() {
    article.value = defaultVal()
  }

  function cancelCallback() {
    show.value = false
  }

  function setArticle(data) {
    article.value = data
  }

  return {
    article,
    submitCallback,
    cancelCallback,
    setArticle,
  }
}
