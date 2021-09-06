<template>
  <div class="layout-content-main-fix">
    <RouterView>
      <template #default="{ Component, route }">
        <transition name="zoom-fade" mode="out-in" appear>
          <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
            <component :is="Component" :key="route.fullPath"/>
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath"/>
        </transition>
      </template>
    </RouterView>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useAsyncRouteStore} from '@/stores/modules/asyncRoute';

const asyncRouteStore = useAsyncRouteStore();
// 需要缓存的路由组件
const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents);
</script>
<style scoped lang="scss">
// zoom-fade
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: transform 0.2s, opacity 0.3s ease-out;
}

.zoom-fade-enter-from {
  opacity: 0;
  transform: scale(0.92);
}

.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(1.06);
}
.layout-content-main-fix {
  margin: 15px;
}
</style>
