<template>
  <div>
    <NCard :segmented="{ content: 'hard' }" :bordered="false" size="small">
      <template #header>
        <NButton type="primary" ghost icon-placement="right" @click="openCreateDrawer">
          添加菜单
        </NButton>
      </template>
      <!--表格-->
      <div class="w-full menu">
        <BasicTable :data="treeData" :columns="columns" :actionColumn="actionColumn" />
      </div>
    </NCard>
    <CreateDrawer ref="createDrawerRef" :width="'50%'" />
  </div>
</template>
<script setup>
import {ref, onMounted} from 'vue';
import {useMessage} from 'naive-ui';
import {getMenus} from '@/api/system/menu';
import {columns,createActionColumn} from "./columns";
import BasicTable from '@/components/BasicTable/index.vue'
import {
  NCard,
  NButton
} from 'naive-ui'
import CreateDrawer from './CreateDrawer.vue';
const createDrawerRef = ref();
const message = useMessage();
const treeData = ref([]);
const loading = ref(true);
const actionColumn = createActionColumn({handleDel, handleEdit})

onMounted(async () => {
  const treeMenuList = await getMenus();
  treeData.value = treeMenuList
  loading.value = false;
});

function handleDel() {

}
function openCreateDrawer() {
  const { openDrawer } = createDrawerRef.value;
  openDrawer();
}
function handleEdit() {}
</script>
