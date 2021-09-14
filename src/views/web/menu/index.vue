<template>
  <div>
    <NCard
      :segmented="{ content: 'hard' }"
      :bordered="false"
      size="small"
    >
      <template #header>
        <NButton
          type="primary"
          ghost
          icon-placement="right"
          @click="addMenu"
        >
          添加菜单
        </NButton>
      </template>
      <!--表格-->
      <div class="w-full menu">
        <BasicTable
          ref="tableRef"
          :request="fetch"
          :columns="columns"
          :row-key="(row) => row.id"
          :action-column="actionColumn"
        />
      </div>
    </NCard>
    <CreateDrawer
      ref="createDrawerRef"
      width="50%"
      :title="createTitle"
      :menu-options="menuOptions"
      @submitAfter="reload"
    />
  </div>
</template>
<script setup>
import {ref, toRaw, computed} from 'vue';
import {useDialog, useMessage} from 'naive-ui';
import {getMenus, delMenu} from '@/api/system/menu';
import {columns, createActionColumn} from "./columns"
import BasicTable from '@/components/BasicTable/index.vue'
import CreateDrawer from './CreateDrawer.vue'

const createDrawerRef = ref();
const treeData = ref([]);
const tableRef = ref(null);
const message = useMessage();
const dialog = useDialog();
const createTitle = ref('添加菜单');
const actionColumn = createActionColumn({handleDel, handleEdit})

const menuOptions = computed(() => {
  return treeData.value.map(item => {
    return {
      label: item.name,
      value: item.id
    }
  })
})


function handleDel(row) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      delMenu(row.id)
      reload()
    }
  })
}

function reload() {
  tableRef.value.reload()
}

function openCreateDrawer() {
  const {openDrawer} = createDrawerRef.value;
  openDrawer()
}

function addMenu() {
  openCreateDrawer()
  createTitle.value = '添加菜单'
  createDrawerRef.value.handleReset()
}

function handleEdit(row) {
  openCreateDrawer()
  createTitle.value = '编辑菜单'
  createDrawerRef.value.formParams = {...toRaw(row)}
}


async function fetch() {
  return new Promise(async resolve => {
    const treeMenuList = await getMenus();
    treeData.value = treeMenuList.map(item => {
      if (!item.children.length) {
        delete item.children
      }
      return item
    })
    resolve(toRaw(treeData.value))
  })
}


</script>
