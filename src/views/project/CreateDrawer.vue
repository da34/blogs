<template>
  <NDrawer
    v-model:show="isDrawer"
    :placement="placement"
    :width="width"
  >
    <NDrawerContent
      :title="title"
      closable
    >
      <NForm
        ref="formRef"
        :label-width="100"
        :model="formParams"
        :rules="rules"
        label-placement="left"
      >
        <NGrid
          :cols="24"
          :x-gap="24"
        >
          <NFormItemGi
            :span="12"
            label="名称"
            path="name"
          >
            <NInput
              v-model:value="formParams.name"
              placeholder="请输入名称"
            />
          </NFormItemGi>
          <NFormItemGi
            :span="12"
            label="描述"
            path="desc"
          >
            <NInput
              v-model:value="formParams.desc"
              placeholder="请输入描述"
            />
          </NFormItemGi>
          <NFormItemGi
            :span="12"
            label="预览链接"
            path="linkUrl"
          >
            <NInput
              v-model:value="formParams.linkUrl"
              placeholder="请输入预览链接"
            />
          </NFormItemGi>
          <NFormItemGi
            :span="12"
            label="源码链接"
            path="sourceUrl"
          >
            <NInput
              v-model:value="formParams.sourceUrl"
              placeholder="请输入源码链接"
            />
          </NFormItemGi>
          <NFormItemGi
            :span="12"
            label="排序"
          >
            <NInputNumber v-model:value="formParams.priority" />
          </NFormItemGi>
          <NFormItemGi
            :span="12"
            label="封面"
          >
            <Upload v-model:fileUrl="formParams.imgUrl" />
          </NFormItemGi>
        </NGrid>
      </NForm>
      <template #footer>
        <NSpace>
          <NButton
            :loading="subLoading"
            type="primary"
            @click="formSubmit"
          >
            提交
          </NButton>
          <NButton @click="handleReset">
            重置
          </NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<script>
import {defineComponent, reactive, ref, toRefs} from 'vue';
import {createWork, updateWork} from '@/api/work';
import {useMessage} from 'naive-ui';
import Upload from '@/components/Upload/index.vue'

const rules = {
  name: {
    required: true,
    message: '请输入标题',
    trigger: 'blur',
  },
  linkUrl: {
    required: true,
    message: '请输入预览链接',
    trigger: 'blur',
    type: 'url'
  },
  sourceUrl: {
    message: '请输入源码链接',
    trigger: 'blur',
    type: 'url'
  },
  desc: {
    required: true,
    message: '请输入描述',
    trigger: 'blur',
  },
};

export default defineComponent({
  name: 'CreateDrawer',
  components: {Upload},
  props: {
    title: {
      type: String,
      default: '添加菜单',
    },
    width: {
      type: [Number, String],
      default: 450,
    }
  },
  emits: ['submitAfter'],
  setup(_, {emit}) {
    const message = useMessage();
    const formRef = ref(null);
    const defaultValueRef = () => ({
      name: '',
      linkUrl: '',
      imgUrl: '',
      sourceUrl: '',
      priority: 1,
      desc: ''
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
          if (state.formParams.id) {
            await updateWork({...state.formParams})
          } else {
            await createWork({...state.formParams})
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
<style lang="scss" scoped>
.icon-preview {
  svg {
    width: 30px;
    height: 30px;
  }
}
</style>
