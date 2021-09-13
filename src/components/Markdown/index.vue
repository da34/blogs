<template>
  <div id="vditor" />
</template>
<script>
import {onMounted,defineComponent, ref} from "vue";
import Vditor from "vditor";
import {qiniuUpload} from "@/utils";
import "vditor/src/assets/scss/index.scss"

export default defineComponent({
  setup() {
    // mark dom
    const vditorRef = ref()

    onMounted(() => {
      vditorRef.value = new Vditor('vditor', {
        mode: 'sv',
        cache: {
          enable: false,
        },
        upload: {
          multiple: false,  // 不允许批量上传
          async handler(file) {
            const res = await qiniuUpload(file[0])
            vditorRef.value.insertValue(`![](${res.url} "${res.fileName}")`)
          }
        },
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "|",
          "list",
          "ordered-list",
          "table",
          "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          "upload",
          "link",
          "|",
          "undo",
          "redo",
          "|",
          "fullscreen",
          "edit-mode",
          {
            name: "more",
            toolbar: [
              "both",
              "code-theme",
              "content-theme",
              "export",
              "outline",
              "preview",
            ],
          },
        ],
      })

    })

    function getValue() {
      return vditorRef.value.getValue()
    }

    function setValue(val) {
        vditorRef.value.setValue(val)
    }

    return {
      getValue,
      setValue
    }
  }
})


</script>

<style scoped>

</style>
