<template>
  <div>
    <NGrid cols="1 s:1 m:1 l:3 xl:3 2xl:3" responsive="screen" :x-gap="12">
      <NGi span="1">
        <NCard :segmented="{ content: 'hard' }" :bordered="false" size="small">
          <template #header>
            <NSpace>
              <NDropdown trigger="hover" @select="selectAddMenu" :options="addMenuOptions">
                <NButton type="primary" ghost icon-placement="right">
                  添加菜单
                  <template #icon>
                    <div class="flex items-center">
                      <NIcon size="14">
                        <DownOutlined/>
                      </NIcon>
                    </div>
                  </template>
                </NButton>
              </NDropdown>
              <NButton type="primary" ghost icon-placement="left" @click="packHandle">
                全部{{ expandedKeys.length ? '收起' : '展开' }}
                <template #icon>
                  <div class="flex items-center">
                    <NIcon size="14">
                      <AlignLeftOutlined/>
                    </NIcon>
                  </div>
                </template>
              </NButton>
            </NSpace>
          </template>
          <div class="w-full menu">
            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <NSpin size="medium"/>
                </div>
              </template>
              <template v-else>
                <NTree
                    block-line
                    cascade
                    checkable
                    :virtual-scroll="true"
                    :data="treeData"
                    :expandedKeys="expandedKeys"
                    style="max-height: 650px; overflow: hidden"
                    @update:selected-keys="selectedTree"
                    @update:expanded-keys="onExpandedKeys"
                />
              </template>
            </div>
          </div>
        </NCard>
      </NGi>
      <NGi span="2">
        <NCard :segmented="{ content: 'hard' }" :bordered="false" size="small">
          <template #header>
            <NSpace>
              <NIcon size="18">
                <FormOutlined/>
              </NIcon>
              <span>编辑菜单{{ treeItemTitle ? `：${treeItemTitle}` : '' }}</span>
            </NSpace>
          </template>
          <NAlert type="info" closable> 从菜单列表选择一项后，进行编辑</NAlert>
          <NForm
              :model="formParams"
              :rules="rules"
              ref="formRef"
              label-placement="left"
              :label-width="100"
              v-if="isEditMenu"
              class="py-4"
          >
            <NFormItem label="名称" path="label">
              <NInput placeholder="请输入名称" v-model:value="formParams.name"/>
            </NFormItem>
            <NFormItem label="路径" path="path">
              <NInput placeholder="请输入路径" v-model:value="formParams.url"/>
            </NFormItem>
            <NFormItem label="图标">
              <NInput placeholder="请输入图标" v-model:value="formParams.icon"/>
            </NFormItem>
            <NFormItem label="打开方式">
              <NRadioGroup v-model:value="formParams.target" name="openType">
                <NSpace>
                  <NRadio value="_self">当前窗口</NRadio>
                  <NRadio value="_blank">新窗口</NRadio>
                </NSpace>
              </NRadioGroup>
            </NFormItem>
            <NFormItem label="状态">
              <NSwitch>
                <template #checked>启用</template>
                <template #unchecked>停用</template>
              </NSwitch>
            </NFormItem>
            <NFormItem path="auth" style="margin-left: 100px">
              <NSpace>
                <NButton type="primary" :loading="subLoading" @click="formSubmit"
                >保存修改
                </NButton
                >
                <NButton @click="handleReset">重置</NButton>
              </NSpace>
            </NFormItem>
          </NForm>
        </NCard>
      </NGi>
    </NGrid>
    <CreateDrawer ref="createDrawerRef" :title="drawerTitle"/>
  </div>
</template>
<script setup>
import {ref, unref, reactive, onMounted, computed} from 'vue';
import {useMessage} from 'naive-ui';
import {DownOutlined, AlignLeftOutlined, SearchOutlined, FormOutlined} from '@vicons/antd';
import {getMenus} from '@/api/system/menu';
import {isArray} from 'lodash-es'
import {
  NGi,
  NGrid,
  NCard,
  NForm,
  NFormItem,
  NSpace,
  NButton,
  NInput,
  NRadio,
  NRadioGroup,
  NAlert,
  NIcon,
  NTree,
  NSpin,
  NDropdown,
  NSwitch
} from 'naive-ui'
import CreateDrawer from './CreateDrawer.vue';

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
const formRef = ref(null);
const createDrawerRef = ref();
const message = useMessage();
let treeItemKey = ref([]);
let expandedKeys = ref([]);
const treeData = ref([]);
const loading = ref(true);
const subLoading = ref(false);
const isEditMenu = ref(false);
const treeItemTitle = ref('');
const drawerTitle = ref('');
const isAddSon = computed(() => {
  return !treeItemKey.value.length;
});
const addMenuOptions = ref([
  {
    label: '添加顶级菜单',
    key: 'home',
    disabled: false,
  },
  {
    label: '添加子菜单',
    key: 'son',
    disabled: isAddSon,
  },
]);
let formParams = reactive({
  status: 1,
  name: '',
  url: '',
  target: '_self',
});

function selectAddMenu(key) {
  drawerTitle.value = key === 'home' ? '添加顶栏菜单' : `添加子菜单：${treeItemTitle.value}`;
  openCreateDrawer();
}

function openCreateDrawer() {
  const {openDrawer} = createDrawerRef.value;
  openDrawer();
}

function selectedTree(keys) {
  if (keys.length) {
    // const treeItem = getTreeItem(unref(treeData), keys[0]);
    // treeItemKey.value = keys;
    // treeItemTitle.value = treeItem.label;
    // formParams = Object.assign(formParams, treeItem);
    isEditMenu.value = true;
  } else {
    isEditMenu.value = false;
    // treeItemKey.value = [];
    // treeItemTitle.value = '';
  }
}

function handleReset() {
  // const treeItem = getTreeItem(unref(treeData), treeItemKey[0]);
  // formParams = Object.assign(formParams, treeItem);
}

function formSubmit() {
  formRef.value.validate((errors) => {
    if (!errors) {
      message.error('抱歉，您没有该权限');
    } else {
      message.error('请填写完整信息');
    }
  });
}

function packHandle() {
  if (expandedKeys.value.length) {
    expandedKeys.value = [];
  } else {
    expandedKeys.value = unref(treeData).map((item) => item.key);
  }
}

onMounted(async () => {
  const treeMenuList = await getMenus();
  treeData.value = formatMenu(treeMenuList)
  loading.value = false;
});

function formatMenu(menus) {
  if (!menus) return []
  return menus.map(item => {
    return {
      label: item.name,
      key: item.id,
      children: formatMenu(item.menus)
    }
  })
}

function onExpandedKeys(keys) {
  expandedKeys.value = keys;
}
</script>
