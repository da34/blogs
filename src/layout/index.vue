<template>
  <NLayout position="absolute" has-sider>
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
      <PageSidebar :collapsed="collapsed"/>
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader bordered>
        <PageHeader v-model:collapsed="collapsed"/>
      </NLayoutHeader>
      <NLayoutContent position="absolute" content-style="margin: 0 10px; margin-top: 15px;">
        <PageMainView/>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
<script setup>
import {NLayout, NLayoutHeader, NLayoutContent, NLayoutSider,useLoadingBar } from 'naive-ui'
import PageSidebar from './components/Sidebar/index.vue'
import PageMainView from "./components/MainView.vue";
import PageHeader from "./components/Header/index.vue";
import {ref,onMounted} from 'vue'

const collapsed = ref(false)
onMounted(() => {
  //挂载在 window 方便与在js中使用
  window['$loading'] = useLoadingBar();
  window['$loading'].finish();
});

</script>
<style scoped lang="scss">
.n-layout-header {
  height: 64px;
}

.n-layout-content {
  background: #f5f7f9;
  min-height: calc(100vh - 60px);
  top: 60px;
}
</style>
