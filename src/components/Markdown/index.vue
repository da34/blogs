<template>
  <div id="vditor" ref="vditorRef"></div>
</template>

<script>
import {onMounted, ref, defineComponent, watch} from "vue";
import Vditor from "vditor";
import {qiniuUpload} from "@/utils";
import "vditor/src/assets/scss/index.scss"

const props = {
  text: {
    type: String,
    default: ''
  }
}

export default defineComponent({
  props,
  emits: ['update:text'],
  setup(props, {emit}) {
    // mark dom
    let vditorDom

    watch(
        () => props.text,
        (newVal) => {
          console.log(newVal)
          if (!newVal) {
            vditorDom.setValue('')
          }
        }
    )

    onMounted(() => {
      vditorDom = new Vditor('vditor', {
        mode: 'sv',
        value: props.text,
        input: (string) => {
          emit('update:text', string)
        },
        cache: {
          enable: false,
          after(ss) {
            console.log(ss)
          }
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
  }
})


</script>

<style scoped>

</style>
