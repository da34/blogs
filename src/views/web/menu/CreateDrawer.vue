<template>
  <NDrawer v-model:show="isDrawer" :width="width" :placement="placement">
    <NDrawerContent :title="title" closable>
      <NForm
          :model="formParams"
          :rules="rules"
          ref="formRef"
          label-placement="left"
          :label-width="100"
      >
        <NFormItem label="标题" path="label">
          <NInput placeholder="请输入标题" v-model:value="formParams.name"/>
        </NFormItem>
        <NFormItem label="路径" path="url">
          <NInput placeholder="请输入路径" v-model:value="formParams.url"/>
        </NFormItem>
        <NFormItem label="打开方式" path="target">
          <NRadioGroup v-model:value="formParams.target" name="openType">
            <NSpace>
              <NRadio :value="0">当前窗口</NRadio>
              <NRadio :value="1">新窗口</NRadio>
            </NSpace>
          </NRadioGroup>
        </NFormItem>
      </NForm>

      <template #footer>
        <NSpace>
          <NButton type="primary" :loading="subLoading" @click="formSubmit">提交</NButton>
          <NButton @click="handleReset">重置</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<script setup>
import {defineComponent, reactive, ref, toRefs} from 'vue';
import {
  useMessage,
  NDrawer,
  NDrawerContent,
  NInput,
  NSpace,
  NButton,
  NRadio,
  NRadioGroup,
  NFormItem,
  NForm
} from 'naive-ui';

const rules = {
  label: {
    required: true,
    message: '请输入标题',
    trigger: 'blur',
  },
  path: {
    required: true,
    message: '请输入路径',
    trigger: 'blur',
  },
};
const props = defineProps({
  title: {
    type: String,
    default: '添加顶级菜单',
  },
  width: {
    type: Number,
    default: 450,
  },
})

const message = useMessage();
const formRef = ref(null);
const defaultValueRef = () => ({
  name: '',
  target: 1,
  url: '',
});
const state = reactive({
  subLoading: false,
  formParams: defaultValueRef(),
  alertText:
      '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。',
});

const isDrawer = ref(false)
const placement = ref('right')

function openDrawer() {
  isDrawer.value = true;
}

function closeDrawer() {
  isDrawer.value = false;
}

function formSubmit() {
  formRef.value.validate((errors) => {
    if (!errors) {
      message.success('添加成功');
      handleReset();
      closeDrawer();
    } else {
      message.error('请填写完整信息');
    }
  });
}

function handleReset() {
  formRef.value.restoreValidation();
  state.formParams = Object.assign(state.formParams, defaultValueRef());
}
</script>
