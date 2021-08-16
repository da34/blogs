<template>
  <div class="logo flex justify-center items-center py-3 overflow-hidden ">
    <img src="@/assets/images/logo.png" class="w-auto">
    <h2 v-show="!collapsed" class="">博客管理后台</h2>
  </div>
  <n-menu
      inverted
      :collapsed="collapsed"
      :options="menus"
      :collapsed-width="68"
      :collapsed-icon-size="20"
      :indent="24"
      :value="activeKey"
      @update:value="handleUpdateValue"
  />
</template>

<script setup>
import {NMenu} from 'naive-ui'
import {ref, watch,defineProps} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useAsyncRouteStore} from "@/stores/modules/asyncRoute";
import {generatorMenu} from "@/utils";

const router = useRouter()
const currentRoute = useRoute() // 当前路由
const asyncRouter = useAsyncRouteStore()

defineProps({
  collapsed: {
    type: Boolean
  }
})

const menus = ref(generatorMenu(asyncRouter.getMenus))
const activeKey = ref(currentRoute.name)

// 页面路由变化，切换菜单选中状态
watch(
    () => currentRoute.fullPath,
    () => {
      if (activeKey.value !== currentRoute.name) {
        activeKey.value = currentRoute.name
      }
    }
);

function handleUpdateValue(key) {
  // 防止闪烁
  activeKey.value = key
  router.push({name: key});
}



</script>

<style scoped lang="scss">
.logo{
  white-space: nowrap;
  img {
    height: 35px;
  }
}
</style>
