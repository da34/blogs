<template>
  <NCard>
    <NForm
      ref="formRef"
      class="w-2/5 m-auto"
      :label-width="80"
      :model="formValue"
      label-placement="left"
      :rules="rules"
    >
      <NFormItem
        label="LOGO"
        path="logo"
      >
        <MUpload v-model:file-url="formValue.logo">
          <p class="mb-3">
            上传图片
          </p>
          <NIcon size="30">
            <Upload />
          </NIcon>
        </MUpload>
      </NFormItem>
      <NFormItem
        label="网站名称"
        path="name"
      >
        <NInput v-model:value="formValue.name" />
      </NFormItem>
      <NFormItem
        label="网站域名"
        path="url"
      >
        <NInput v-model:value="formValue.url" />
      </NFormItem>
      <NFormItem
        label="备案号"
        path="internetNumber"
      >
        <NInput v-model:value="formValue.internetNumber" />
      </NFormItem>
      <NFormItem>
        <NButton
          style="margin-left: 80px;"
          attr-type="button"
          type="primary"
          @click="handleValidateClick"
        >
          保存
        </NButton>
      </NFormItem>
    </NForm>
  </NCard>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useMessage} from 'naive-ui'
import {Upload} from '@icon-park/vue-next'
import MUpload from '@/components/Upload/index.vue'
import {getConfig, updateConfig} from "@/api/system/config";


const key = 'site'
const formRef = ref(null)
const actionUrl = ref(import.meta.env.VITE_GLOB_UPLOAD_URL)
const fileList = ref([])
const message = useMessage()

const formValue = ref({
  name: '',
  internetNumber: '',
  logo: '',
  url: ''
})
const rules = {
  name: {
    required: true,
    message: '请输入网站名称',
    trigger: ['blur']
  },
  url: [
    {
      required: true,
      message: '请输入网站名称',
      trigger: ['blur']
    },
    {
      type: 'url',
      message: '请输入正确的域名',
      trigger: ['input']
    },
  ],
  internetNumber: {
    required: true,
    message: '请输入备案号',
    trigger: ['blur']
  }
}


onMounted(async () => {
  const {value} = await getConfig({key})
  formValue.value = value
  // console.log(config)
})

function handleValidateClick(e) {
  formRef.value.validate((errors) => {
    if (!errors) {
      updateConfig({key, value: formValue.value})
    } else {
      message.error('请填写完成信息')
    }
  })
}

function uploadDone(file) {
  formValue.value.logo = file.url
  // console.log('file', file)
}

</script>
