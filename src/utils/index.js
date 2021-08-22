import { h } from 'vue';
import { NIcon } from 'naive-ui';
import dayjs from 'dayjs'

/**
 * render 图标
 * */
export function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

/**
 * 格式化时间
 * */
export function formatDate(date, str = 'YYYY-MM-DD HH:mm') {
  return dayjs(date).format(str)
}


/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap) {
  return filterRouter(routerMap)
    .sort(sortRoute)
    .map((item) => {
    const isRoot = isRootRouter(item);
    const info = isRoot ? item.children[0] : item;
    // const info = item;
    const currentMenu = {
      ...info,
      ...info.meta,
      label: info.meta?.title,
      key: info.name,
    };
    // 是否有子菜单，并递归处理
    if (info.children && info.children.length > 0) {
      currentMenu.children = generatorMenu(info.children);
    }
    return currentMenu;
  });
}

/**
 * 判断根路由 Router
 * */
export function isRootRouter(item) {
  return item.meta?.alwaysShow !== true && item.children?.length === 1;
}

/**
 * 排除Router
 * */
export function filterRouter(routerMap) {
  return routerMap
    .filter((item) => {
      return !item.hidden
    })
}
/**
 * 排序Router
 * */
function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}
