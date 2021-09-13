import {ref, unref, watch} from "vue";
import { useRouter } from 'vue-router'
import {createArticle, updateArticle} from "@/api/web/article";

export function usePublic(show) {
  const defaultVal = () => ({
    title: '',
    content: '',
    type: 0,
    commentDisabled: true,
    shareStatement: true,
    contentOutline: '',
    firstPicture: '',
    isTop: false,
    tags: [],
  })
  // 初始化文章
  const article = ref(defaultVal())
  const router = useRouter()

  // 内容变化，更改描述
  watch(
    () => article.value.content,
    () => {
      article.value.contentOutline = article.value.content.slice(0, 80)
    })

  async function submitCallback() {
    await article.value.id ? updateArticle(unref(article)) : createArticle(unref(article))
    resetData()
    show.value = false
    router.back()
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
