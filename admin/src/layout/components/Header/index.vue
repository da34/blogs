<template>
  <div class="flex flex-row justify-between items-center h-full px-3">
    <div class="flex">
      <!--收缩菜单-->
      <NIcon
        size="20"
        class="cursor-pointer"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <MenuUnfold v-if="collapsed" />
        <MenuFold v-else />
      </NIcon>

      <!--面包屑-->
      <NBreadcrumb class="ml-8">
        <template
          v-for="breadcrumb in breadcrumbList"
          :key="breadcrumb.label"
        >
          <NBreadcrumbItem v-if="breadcrumb.children.length > 1">
            <NDropdown
              :options="breadcrumb.children"
              @select="handleSelect"
            >
              {{ breadcrumb.label }}
            </NDropdown>
          </NBreadcrumbItem>
          <NBreadcrumbItem v-else>
            <span>{{ breadcrumb.label }}</span>
          </NBreadcrumbItem>
        </template>
      </NBreadcrumb>
    </div>
    <div class="ml-auto mr-6">
      <div class="user cursor-pointer">
        <NDropdown
          trigger="hover"
          :options="avatarOptions"
          @select="avatarSelect"
        >
          <NAvatar round>
            {{ username }}
          </NAvatar>
        </NDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import {MenuFold, MenuUnfold} from '@icon-park/vue-next'
import {NIcon, NBreadcrumb, NBreadcrumbItem, NDropdown, NAvatar, useDialog, useMessage} from 'naive-ui'
import {defineProps, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useUserStore} from '@/stores/modules/user';
import {filterRouter} from '@/utils';

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

defineEmits(['update:collapsed'])

// 面包屑
const generator = (routeMap) => {
  return filterRouter(routeMap)
      .filter(item => {
        const { alwaysShow } = item?.meta
        return typeof alwaysShow === 'boolean' ? alwaysShow : true
      })
      .map(item => {
        const currentMenu = {
          ...item,
          label: item.meta.title,
          key: item.name
        };
        // console.log(item)
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
