<template>
    <NForm
        :label-width="80"
        :model="formValue"
        label-placement="left"
        :rules="rules"
        ref="formRef"
        :show-require-mark="false"
    >
      <NFormItem label="本地图片域名" path="user.name">
        <NInput v-model:value="formValue.user.name" placeholder="输入姓名"/>
      </NFormItem>
      <NFormItem label="七牛云图片域名" path="user.age">
        <NInput placeholder="输入年龄" v-model:value="formValue.user.age"/>
      </NFormItem>
      <NFormItem label="七牛云公钥" path="phone">
        <NInput placeholder="电话号码" v-model:value="formValue.phone"/>
      </NFormItem>
      <NFormItem label="七牛云私钥" path="phone">
        <NInput placeholder="电话号码" v-model:value="formValue.phone"/>
      </NFormItem>
      <NFormItem label="上传空间" path="phone">
        <NInput placeholder="电话号码" v-model:value="formValue.phone"/>
      </NFormItem>
      <NFormItem label="存储区域" path="phone">
        <NInput placeholder="电话号码" v-model:value="formValue.phone"/>
      </NFormItem>
      <NFormItem label="">
        <NButton style="margin-left: 80px;" @click="handleValidateClick" attr-type="button" type="primary">保存</NButton>
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
} from 'naive-ui'
import {FileUploadOutlined} from '@vicons/material'

const formRef = ref(null)
const message = useMessage()


const formValue = ref({
  user: {
    name: '',
    age: ''
  },
  phone: ''
})
const rules = {
  user: {
    name: {
      message: '请输入姓名',
      trigger: 'blur'
    },
    age: {
      message: '请输入年龄',
      trigger: ['input', 'blur']
    }
  },
  phone: {
    message: '请输入电话号码',
    trigger: ['input']
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
