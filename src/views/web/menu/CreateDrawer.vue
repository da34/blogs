<template>
  <NDrawer
    v-model:show="isDrawer"
    :width="width"
    :placement="placement"
  >
    <NDrawerContent
      :title="title"
      closable
    >
      <NForm
        ref="formRef"
        :model="formParams"
        :rules="rules"
        label-placement="left"
        :label-width="100"
      >
        <NGrid
          :cols="24"
          :x-gap="24"
        >
          <NFormItemGi
            label="名称"
            path="name"
            :span="12"
          >
            <NInput
              v-model:value="formParams.name"
              placeholder="请输入名称"
            />
          </NFormItemGi>
          <NFormItemGi
            label="上级菜单"
            :span="12"
          >
            <NSelect
              v-model:value="formParams.parentId"
              :options="menuOptions"
            />
          </NFormItemGi>
          <NFormItemGi
            label="路径"
            path="url"
            :span="12"
          >
            <NInput
              v-model:value="formParams.url"
              placeholder="请输入路径"
            />
          </NFormItemGi>
          <!--          <NFormItemGi :span="12">-->
          <!--            <template #label>-->
          <!--              图标-->
          <!--              <NTooltip trigger="hover">-->
          <!--                <template #trigger>-->
          <!--                  <NIcon class="text-yellow-500 cursor-pointer">-->
          <!--                    <Info/>-->
          <!--                  </NIcon>-->
          <!--                </template>-->
          <!--                目前仅支持SVG代码-->
          <!--              </NTooltip>-->
          <!--            </template>-->
          <!--            <NInput v-model:value="formParams.icon"/>-->
          <!--          </NFormItemGi>-->
          <NFormItemGi
            label="排序"
            :span="12"
          >
            <NInputNumber v-model:value="formParams.priority" />
          </NFormItemGi>
          <!--          <NFormItemGi label="图标预览" :span="12">-->
          <!--            <NIcon class="icon-preview" size="50">-->
          <!--              <div v-html="formParams.icon"></div>-->
          <!--            </NIcon>-->
          <!--          </NFormItemGi>-->

          <NFormItemGi
            label="打开方式"
            path="target"
            :span="12"
          >
            <NRadioGroup
              v-model:value="formParams.target"
              name="openType"
            >
              <NSpace>
                <NRadio value="_self">
                  当前窗口
                </NRadio>
                <NRadio value="_blank">
                  新窗口
                </NRadio>
              </NSpace>
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi
            label="状态"
            :span="12"
          >
            <NSwitch v-model:value="formParams.status">
              <template #checked>
                启用
              </template>
              <template #unchecked>
                禁用
              </template>
            </NSwitch>
          </NFormItemGi>
        </NGrid>
      </NForm>
      <template #footer>
        <NSpace>
          <NButton
            type="primary"
            :loading="subLoading"
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
import {createMenu, updateMenu} from "@/api/system/menu";
import {useMessage} from 'naive-ui';

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
  // components: {Info},
  props: {
    title: {
      type: String,
      default: '添加菜单',
    },
    width: {
      type: [Number, String],
      default: 450,
    },
    menuOptions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['submitAfter'],
  setup(_, {emit}) {
    const message = useMessage();
    const formRef = ref(null);
    const defaultValueRef = () => ({
      name: '',
      target: '_self',
      url: '',
      icon: '',
      priority: 0,
      status: true,
      parentId: null,
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
          if (state.formParams) {
            await updateMenu({...state.formParams})
          } else {
            await createMenu({...state.formParams})
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
<style scoped lang="scss">
.icon-preview {
  svg {
    width: 30px;
    height: 30px;
  }
}
</style>
