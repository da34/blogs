<template>
  <NLayout
    position="absolute"
    has-sider
  >
    <NLayoutSider
      inverted
      :width="220"
      collapse-mode="width"
      :collapsed-width="68"
      show-trigger
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <PageSidebar :collapsed="collapsed" />
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader bordered>
        <PageHeader v-model:collapsed="collapsed" />
      </NLayoutHeader>
      <NLayoutContent
        position="absolute"
        :native-scrollbar="false"
      >
        <PageMainView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
<script setup>
import PageSidebar from './components/Sidebar/index.vue'
import PageMainView from './components/MainView.vue';
import PageHeader from './components/Header/index.vue';
import {ref, onMounted} from 'vue'
import {useLoadingBar, useMessage} from 'naive-ui';

const collapsed = ref(false)
onMounted(() => {
  //挂载在 window 方便与在js中使用
  window.$loading = useLoadingBar();
  window.$message = useMessage();
});
</script>
<style scoped lang="scss">
.n-layout-header {
  height: 60px;
}

.n-layout-content {
  background: #f5f7f9;
  min-height: calc(100vh - 75px);
  top: 60px;
}

</style>
