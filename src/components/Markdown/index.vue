<template>
  <v-md-editor
      v-model="poetText"
      height="80vh"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code | save"
  />
</template>
<script setup>
import {computed} from "vue";
import {qiniuUpload} from "@/utils";

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:text'])

const poetText = computed({
  get: () => props.text,
  set: val => {
    emit('update:text', val)
    // poetText.value = val
  }
})

async function handleUploadImage(event, insertImage, files) {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  const { fileName, url } = await qiniuUpload(files[0])
  insertImage({
    url,
    desc: fileName,
    width: 'auto',
    height: 'auto',
  });
}

</script>

<style scoped>

</style>
