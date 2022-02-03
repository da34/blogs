<template>
  <div class="layout-content-main-fix">
    <RouterView>
      <template #default="{ Component, route }">
        <transition
          name="zoom-fade"
          mode="out-in"
          appear
        >
          <!--          v-if="keepAliveComponents.length"-->

          <keep-alive :include="keepAliveComponents">
            <component
              :is="Component"
              :key="route.fullPath"
            />
          </keep-alive>
          <!--          <component-->
          <!--            :is="Component"-->
          <!--            v-else-->
          <!--            :key="route.fullPath"-->
          <!--          />-->
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
// console.log(keepAliveComponents)
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
