<template>
  <NForm
      :label-width="100"
      :model="formValue"
      label-placement="left"
      :rules="rules"
      ref="formRef"
  >
    <NFormItem label="上传域名" path="url">
      <NInput v-model:value="formValue.url"/>
    </NFormItem>
    <NFormItem label="公钥" path="publicKey">
      <NInput v-model:value="formValue.publicKey"/>
    </NFormItem>
    <NFormItem label="私钥" path="privateKey">
      <NInput v-model:value="formValue.privateKey"/>
    </NFormItem>
    <NFormItem label="上传机房" path="zone">
      <NSelect v-model:value="formValue.zone" :options="uploadZone"/>
    </NFormItem>
    <NFormItem label="存储区域" path="area">
      <NInput v-model:value="formValue.area"/>
    </NFormItem>
    <NFormItem label="">
      <NButton style="margin-left: 100px;" @click="handleValidateClick" attr-type="button" type="primary">保存</NButton>
    </NFormItem>
  </NForm>
</template>

<script setup>
import {ref} from 'vue'
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  useMessage,
  NSelect,
} from 'naive-ui'
import {FileUploadOutlined} from '@vicons/material'

const formRef = ref(null)
const message = useMessage()
const uploadZone = [
  {label: '华东', value: 'qiniu.zone.Zone_z0'},
  {label: '华北', value: 'qiniu.zone.Zone_z1'},
  {label: '华南', value: 'qiniu.zone.Zone_z2'},
  {label: '北美', value: 'qiniu.zone.Zone_na0'},
]

const formValue = ref({})
const rules = {
  url: [
    {
      required: true,
      message: '请输入上传域名',
      trigger: ['blur']
    },
    {
      type: 'url',
      message: '请输正确的域名',
      trigger: ['input']
    },
  ],
  publicKey: {
    required: true,
    message: '请输入公钥',
    trigger: ['blur']
  },
  privateKey: {
    required: true,
    message: '请输入秘钥',
    trigger: ['blur']
  },
  zone: {
    required: true,
    message: '请选择上传机房',
    trigger: ['blur']
  },
  area: {
    required: true,
    message: '请输入存储区域',
    trigger: ['blur']
  }
}

function handleValidateClick(e) {
  formRef.value.validate((errors) => {
    if (!errors) {
      message.success('Valid')
    } else {
      console.log(errors)
      message.error('Invalid')
    }
  })
}

</script>
