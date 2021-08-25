<template>
  <NCard>
    <NForm
        class="w-2/5 m-auto"
        :label-width="80"
        :model="formValue"
        label-placement="left"
        :rules="rules"
        ref="formRef"
        :show-require-mark="false"
    >
      <NFormItem label="LOGO" path="user.name">
        <NUpload action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f">
          <NUploadDragger>
            <div style="margin-bottom: 12px;">
              <NIcon size="48" :depth="3">
                <Upload/>
              </NIcon>
            </div>
            <NText>点击或者拖动文件到该区域来上传</NText>
          </NUploadDragger>
        </NUpload>
      </NFormItem>
      <NFormItem label="网站名称" path="user.name">
        <NInput v-model:value="formValue.user.name" placeholder="输入姓名"/>
      </NFormItem>
      <NFormItem label="标题" path="user.age">
        <NInput placeholder="输入年龄" v-model:value="formValue.user.age"/>
      </NFormItem>
      <NFormItem label="关键字" path="phone">
        <NInput placeholder="电话号码" v-model:value="formValue.phone"/>
      </NFormItem>
      <NFormItem label="描述" path="phone">
        <NInput placeholder="电话号码" v-model:value="formValue.phone"/>
      </NFormItem>
      <NFormItem label="备案号" path="phone">
        <NInput placeholder="电话号码" v-model:value="formValue.phone"/>
      </NFormItem>
      <NFormItem label="">
        <NButton style="margin-left: 80px;" @click="handleValidateClick" attr-type="button" type="primary">保存</NButton>
      </NFormItem>
    </NForm>
  </NCard>
</template>

<script setup>
import {ref} from 'vue'
import {NForm, NFormItem, NInput, NButton, useMessage, NCard,NUpload,NUploadDragger,NIcon} from 'naive-ui'
import {Upload} from '@icon-park/vue-next'

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
