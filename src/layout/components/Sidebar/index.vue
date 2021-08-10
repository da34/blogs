<template>
  <n-layout-sider inverted width="220" :collapsed="collapsed">
    <div class="logo">博客管理后台</div>
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    ></n-menu>
  </n-layout-sider>
</template>

<script setup>
import { NLayoutSider, NMenu } from 'naive-ui'
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const collapsed = ref(false)
const router = useRouter()
const renderRouter = router.options.routes
</script>

<style scoped lang="scss">
.logo {
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  margin: 20px 0;
}
</style>
