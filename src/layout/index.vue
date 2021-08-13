<template>
  <n-layout position="absolute" has-sider>
    <VnaSidebar/>
    <n-layout>
      <n-layout-header bordered>Vue3-Naive-Admin</n-layout-header>
      <n-layout-content position="absolute" style="bottom: 64px;top: 60px" content-style="padding: 24px;">
        <router-view/>
      </n-layout-content>
      <n-layout-footer bordered position="absolute">
        copyright
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>
<script setup>
import {NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, useMessage} from 'naive-ui'
import VnaSidebar from './components/Sidebar/index.vue'

window.$message = useMessage()
</script>
<style>
.n-layout-header {
  padding: 24px;
}

.n-layout-footer {
  padding: 24px;
}
</style>
