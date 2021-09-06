import {computed, reactive, ref, unref, watch} from "vue";
import {createArticle} from "@/api/web/article";

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
  })
// 初始化文章
  const article = ref(defaultVal())
  const formRef = ref(null)

  // 内容变化，更改描述
  watch(
    () => article.value.content,
    () => {
      article.value.contentOutline = article.value.content.slice(0, 80)
    })

  async function submitCallback() {
    await createArticle(unref(article))
    resetData()
    show.value = false
  }

  function resetData() {
    article.value = defaultVal()
  }

  function cancelCallback() {
    show.value = false
  }
  return {
    article,
    submitCallback,
    cancelCallback
  }
}
