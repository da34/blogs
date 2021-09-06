<template>
  <NSpin size="large" :show="showSpin">
    <NForm
        :label-width="100"
        :model="formValue"
        label-placement="left"
        :rules="rules"
        ref="formRef"
    >

      <NFormItem label="账号" path="user">
        <NInput v-model:value="formValue.user"/>
      </NFormItem>
      <NFormItem label="授权码" path="pass">
        <NInput v-model:value="formValue.pass" type="password" />
      </NFormItem>
      <NFormItem label="端口" path="port">
        <NInput v-model:value="formValue.port"/>
      </NFormItem>
      <NFormItem label="TLS">
        <NSwitch v-model:value="formValue.TLS"/>
      </NFormItem>
      <NFormItem label="">
        <NButton style="margin-left: 100px;" @click="handleValidateClick" attr-type="button" type="primary">保存</NButton>
      </NFormItem>
    </NForm>
  </NSpin>
</template>

<script setup>
import {ref} from 'vue'
import {useMessage} from 'naive-ui'
import {getConfig, updateConfig} from "@/api/system/config";

const key = 'email'
const formRef = ref(null)
const showSpin = ref(true)
const message = useMessage()

const formValue = ref({})
const rules = {
  user: [
    {
      required: true,
      message: '请输入账号',
      trigger: ['blur']
    }
  ],
  pass: {
    required: true,
    message: '请输入授权码',
    trigger: ['blur']
  },
  port: {
    required: true,
    message: '请输入端口',
    trigger: ['blur']
  }
}

// 获取配置
getQiniu()
async function getQiniu() {
  const data = await getConfig({ key })
  formValue.value = data?.value || {}
  showSpin.value = false
}


function handleValidateClick(e) {
  formRef.value.validate((errors) => {
    if (!errors) {
      updateConfig({value: formValue.value, key})
    }
  })
}

</script>
