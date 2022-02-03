<template>
  <n-modal
    v-model:show="isDrawer"
    :show-icon="false"
    :title="title"
    negative-text="取消"
    positive-text="确定"
    preset="dialog"
    @positive-click="formSubmit"
    @negative-click="handleReset"
  >
    <NForm
      ref="formRef"
      :label-width="50"
      :model="formParams"
      :rules="rules"
      class="mt-5"
      label-placement="left"
    >
      <NFormItem
        label="日期"
        path="date"
      >
        <NDatePicker
          v-model:value="formParams.date"
          clearable
          type="date"
        />
      </NFormItem>
      <NFormItem
        label="描述"
        path="desc"
      >
        <NInput
          v-model:value="formParams.desc"
          :autosize="{
            minRows: 4
          }"
          placeholder="请输入事件，回车分隔"
          type="textarea"
        />
      </NFormItem>
    </NForm>
  </n-modal>
</template>

<script>
import {defineComponent, reactive, ref, toRefs} from 'vue';
import {createHistory, updateHistory} from '@/api/system/history';
import {useMessage} from 'naive-ui';

const rules = {
  date: {
    required: true,
    message: '请选择日期',
    trigger: 'blur',
    type: 'date'
  },
  desc: {
    required: true,
    message: '请输入描述',
    trigger: 'blur',
  },
};

export default defineComponent({
  name: 'CreateDrawer',
  props: {
    title: {
      type: String,
      default: '添加菜单',
    }
  },
  emits: ['submitAfter'],
  setup(_, {emit}) {
    const message = useMessage();
    const formRef = ref(null);
    const defaultValueRef = () => ({
      date: Date.now(),
      desc: ''
    });
    const state = reactive({
      subLoading: false,
      formParams: defaultValueRef()
    });

    const isDrawer = ref(false)

    function openDrawer() {
      isDrawer.value = true;
    }

    function closeDrawer() {
      isDrawer.value = false;
    }

    function formSubmit() {
      formRef.value.validate(async (errors) => {
        if (!errors) {
          // 以回车分隔
          state.formParams.desc = state.formParams?.desc?.split(/[(\r\n)\r\n]+/)
          if (state.formParams.id) {
            await updateHistory({...state.formParams})
          } else {
            await createHistory({...state.formParams})
          }
          handleReset();
          closeDrawer();
          emit('submitAfter')
        } else {
          message.error('请填写完整信息');
        }
      });
    }

    function handleReset() {
      formRef.value?.restoreValidation();
      state.formParams = Object.assign(state.formParams, defaultValueRef());
    }

    return {
      ...toRefs(state),
      formRef,
      isDrawer,
      rules,
      handleReset,
      formSubmit,
      closeDrawer,
      openDrawer,
    }
  }
});


</script>
<style lang="scss" scoped>
.icon-preview {
  svg {
    width: 30px;
    height: 30px;
  }
}
</style>
