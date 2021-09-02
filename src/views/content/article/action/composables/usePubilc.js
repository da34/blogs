import {computed, reactive, ref, unref, watch} from "vue";
import {createArticle} from "@/api/web/article";

export function usePubilc(show) {
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

  function submitCallback() {
    createArticle(unref(article))
    show.value = false
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
