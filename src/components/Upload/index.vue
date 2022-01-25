<template>
  <div>
    <input
      ref="fileRef"
      type="file"
      class="hidden"
      :accept="accept"
    >
    <button
      v-if="!fileUrl"
      class="w-52 h-32 border-solid border-gray-200 border rounded"
      @click="handleUpload"
    >
      <slot />
    </button>
    <div
      v-else
      class="relative"
    >
      <img
        class="w-52 h-32 img rounded object-contain"
        :src="fileUrl"
      >
      <NIcon
        class="absolute top-1.5 right-1.5 text-white cursor-pointer"
        size="20"
        @click="handleClose"
      >
        <Close />
      </NIcon>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, toRef} from 'vue'
import {qiniuUpload} from '@/utils';
import {Close} from '@icon-park/vue-next'

const props = defineProps({
  accept: {
    type: String,
    default: '*'
  },
  fileUrl: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['uploadDone', 'update:file-url'])
const fileRef = ref(null)
const dataFile = ref({})


onMounted(() => {
  fileRef.value.addEventListener('change', pullFiles)
})

function handleUpload() {
  fileRef.value.click()
}
function changeInput(type) {
  fileRef.value.type = type
}
function handleClose() {
  dataFile.value = {}
  fileRef.value.files = null
  emit('update:file-url', '')
}

async function pullFiles() {
  const file = fileRef.value.files[0]
  // 为了解决同一个文件上传的hack做法
  changeInput('text')
  await qiniuUpload(file).then(res => {
    dataFile.value = res
    emit('uploadDone', toRef(dataFile))
    emit('update:file-url', dataFile.value.url)
  }).finally(() => changeInput('file'))




}


</script>

<style scoped lang="scss">
</style>
