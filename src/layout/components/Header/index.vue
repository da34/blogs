<template>
  <div class="flex flex-row justify-between items-center h-full px-3 shadow-md">
    <div class="flex">
      <!--收缩菜单-->
      <NIcon size="20" class="cursor-pointer" @click="() => $emit('update:collapsed', !collapsed)">
        <MenuUnfoldOutlined v-if="collapsed"/>
        <MenuFoldOutlined v-else/>
      </NIcon>

      <!--面包屑-->
      <NBreadcrumb class="ml-8">
        <template v-for="breadcrumb in breadcrumbList" :key="breadcrumb.label">
          <NBreadcrumbItem v-if="breadcrumb.children.length > 1">
            <NDropdown :options="breadcrumb.children" @select="handleSelect">{{ breadcrumb.label }}</NDropdown>
          </NBreadcrumbItem>
          <NBreadcrumbItem v-else>
            <span>{{ breadcrumb.label }}</span>
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
    </div>
    <div class="ml-auto mr-6">
      <div class="user cursor-pointer">
        <NDropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <NAvatar round>
            {{ username }}
          </NAvatar>
        </NDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@vicons/antd'
import {NIcon, NBreadcrumb, NBreadcrumbItem, NDropdown, NAvatar, useDialog, useMessage} from 'naive-ui'
import {defineProps, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useUserStore} from "@/stores/modules/user";

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const dialog = useDialog()
const message = useMessage()

defineProps({
  collapsed: {
    type: Boolean,
  }
})

// 面包屑
const generator = (routeMap) => {
  return routeMap
      .filter(item => !item.hidden)
      .map(item => {
        const currentMenu = {
          ...item,
          label: item.meta.title,
          key: item.name
        };
        if (item.children?.length > 0) {
          currentMenu.children = generator(item.children);
        }
        return currentMenu;
      })
}

const breadcrumbList = computed(() => {
  return generator(route.matched);
});

function handleSelect(key) {
  router.push({name: key})
}

// 头像
const avatarOptions = [
  {
    label: '退出登录',
    key: 1,
  },
];

const username = computed(() => userStore.username)
// 退出登录
const doLogout = () => {
  dialog.info({
    title: '提示',
    content: '您确定要退出登录吗',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await userStore.logout()
        message.success('成功退出登录');
        router
            .replace({
              name: 'login',
              query: {
                redirect: route.fullPath,
              },
            })
            .finally(() => location.reload());

      } catch (e) {
      }
    }
  });
};

async function avatarSelect(key) {
  // 退出登录
  if (key === 1) {
    doLogout()
  }
}
</script>

<style scoped lang="scss">

</style>
