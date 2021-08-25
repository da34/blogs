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
        <NGrid :cols="24" :x-gap="24">
        <NFormItem label="名称" path="name">
          <NInput placeholder="请输入名称" v-model:value="formParams.name"/>
        </NFormItem>
        <NFormItem label="路径" path="url">
          <NInput placeholder="请输入路径" v-model:value="formParams.url"/>
        </NFormItem>
        <NFormItem>
          <template #label>
            图标
            <NTooltip trigger="hover">
              <template #trigger>
                <NIcon class="text-yellow-500 cursor-pointer">
<!--                  <WarningAmberRound />-->
                </NIcon>
              </template>
             目前仅支持SVG代码
            </NTooltip>
          </template>
            <NInput v-model:value="formParams.icon"/>
        </NFormItem>
        <NFormItem label="图标预览" v-show="formParams.icon">
          <NIcon class="icon-preview" size="50">
            <div v-html="formParams.icon"></div>
          </NIcon>
        </NFormItem>
        <NFormItem label="排序">
          <NInputNumber v-model:value="formParams.priority"/>
        </NFormItem>
        <NFormItem label="打开方式" path="target">
          <NRadioGroup v-model:value="formParams.target" name="openType">
            <NSpace>
              <NRadio :value="0">当前窗口</NRadio>
              <NRadio :value="1">新窗口</NRadio>
            </NSpace>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="状态">
          <NSwitch :defaultValue="true">
            <template #checked>启用</template>
            <template #unchecked>禁用</template>
          </NSwitch>
        </NFormItem>
        </NGrid>
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

<script>
import {defineComponent, reactive, ref, toRefs} from 'vue';
import {createMenu} from "@/api/system/menu";
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
  NForm,
  NSwitch,
  NInputGroupLabel,
  NInputGroup,
  NIcon,
  NTooltip,
  NGrid,
  NInputNumber
} from 'naive-ui';
const rules = {
  name: {
    required: true,
    message: '请输入标题',
    trigger: 'blur',
  },
  url: {
    required: true,
    message: '请输入路径',
    trigger: 'blur',
  },
};

export default defineComponent({
  name: 'CreateDrawer',
  components: {
    NDrawer,
    NDrawerContent,
    NInput,
    NSpace,
    NButton,
    NRadio,
    NRadioGroup,
    NFormItem,
    NForm,
    NInputNumber,
    NInputGroupLabel,
    NInputGroup,
    NIcon,
    NTooltip,
    NGrid,
    NSwitch
  },
  props: {
    title: {
      type: String,
      default: '添加菜单',
    },
    width: {
      type: [Number, String],
      default: 450,
    },
  },
  setup() {
    const message = useMessage();
    const formRef = ref(null);
    const defaultValueRef = () => ({
      name: '',
      target: 0,
      url: '',
      icon: '',
      priority: 0,
    });
    const state = reactive({
      subLoading: false,
      formParams: defaultValueRef()
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
      formRef.value.validate(async (errors) => {
        if (!errors) {
          await createMenu({...state.formParams})
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

    return {
      ...toRefs(state),
      formRef,
      isDrawer,
      placement,
      rules,
      handleReset,
      formSubmit,
      closeDrawer,
      openDrawer,
    }
  }
});


</script>
<style scoped lang="scss">
.icon-preview {
  svg {
    width: 30px;
    height: 30px;
  }
}
</style>
