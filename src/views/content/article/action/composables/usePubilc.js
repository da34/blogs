import {computed, reactive, ref} from "vue";

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
  const article = reactive({
    ...defaultVal(),
  })
  const formRef = ref(null)

  function submitCallback() {
    console.log(article)
    show.value = false
  }

  function cancelCallback() {
    show.value = false
  }
  return {
    submitCallback,
    cancelCallback
  }
}
