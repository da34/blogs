<template>
  <!--发布选择-->
  <NModal
      v-model:show="useShowModal"
      preset="card"
      :showIcon="false"
      :closable="false"
      class="w-1/3"
      :segmented="{content: 'hard', action: 'hard'}"
  >
    <template #header>
      <div class="border-b-1 border-gray-200">
        发布文章
      </div>
    </template>
    <NForm
        class="mt-5"
        label-placement="left"
        :model="article"
        ref="formRef"
    >
      <NFormItem label="添加标签">
        <NSelect
            placeholder="请选择标签"
            :options="typeOptions"
            v-model:value="article.tag"
        />
      </NFormItem>
      <NFormItem label="文章封面">
        <NUpload class="w-2/3" action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f">
          <NUploadDragger>
            <NIcon size="48" :depth="3">
              <FileUploadOutlined/>
            </NIcon>
            <NP depth="3">上传封面</NP>
          </NUploadDragger>
        </NUpload>
      </NFormItem>
      <NFormItem label="文章类型">
        <NRadioGroup v-model:value="article.type">
          <NSpace>
            <NRadio :value="0">article</NRadio>
            <NRadio :value="1">page</NRadio>
          </NSpace>
        </NRadioGroup>
      </NFormItem>
      <NFormItem label="置顶">
        <NSwitch v-model:value="article.isTop"/>
      </NFormItem>
      <NFormItem label="评论">
        <NSwitch v-model:value="article.commentDisabled"/>
      </NFormItem>
      <NFormItem label="版权">
        <NSwitch v-model:value="article.shareStatement"/>
      </NFormItem>
      <NFormItem label="编辑摘要">
        <NInput type="textarea" show-count maxlength="80" minlength="30" v-model:value="article.contentOutline"/>
      </NFormItem>

    </NForm>

    <template #action>
      <div class="flex justify-end">
        <NButton @click="cancelCallback" class="mr-4">取消</NButton>
        <NButton @click="submitCallback" type="primary">确定并发布</NButton>
      </div>
    </template>
  </NModal>
</template>

<script setup>
import {
  NForm, NFormItem, NSpace, NInput, NButton, NModal, NIcon,
  NSelect, NRadio, NUpload, NUploadDragger, NText, NP, NRadioGroup, NSwitch
} from 'naive-ui'
import {FileUploadOutlined} from '@vicons/material'
import {reactive, ref, inject} from "vue";

const useShowModal = inject('showModal', false)

const article = reactive({
  title: '',
  content: ''
})

function submitCallback() {
  useShowModal.value = false
}

function cancelCallback() {
  useShowModal.value = false
}

</script>

<style scoped>

</style>
