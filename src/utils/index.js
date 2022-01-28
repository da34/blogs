import {h} from 'vue';
import {NIcon} from 'naive-ui';
import dayjs from 'dayjs'
import * as qiniu from 'qiniu-js'
import {getQiNiuToken} from '@/api/system/config';

/**
 * render 图标
 * */
export function renderIcon(icon) {
  return () => h(NIcon, null, {default: () => h(icon)});
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

/**
 * 七牛上传
 * */
export async function qiniuUpload(file, isCv = false) {

  const token = await getQiNiuToken()
  let prefix = 'blog/'
  // 证明是粘贴,添加时间戳
  if (isCv) {
    prefix += Date.now() + '.'
  }
  const observable = qiniu.upload(file, prefix + file.name, token)
  const message = window.$message
  let messageReactive = message.loading('上传中')

  return new Promise((resolve, reject) => {
    const observer = {
      next({total}) {
        const {percent} = total
        if (percent >= 100 && messageReactive) {
          messageReactive.destroy()
          messageReactive = null
        }
      },
      error(err) {
        message.error(err)
        reject(err)
      },
      complete(res) {
        message.success('上传成功')
        resolve(res)
      }
    }
    observable.subscribe(observer)
  })

  // 上传开始
  // console.history(subscription)
}

/**
 * 获取对应的菜单
 * */
let result = null;

export function getTreeItem(data, key) {
  data.map(item => {
    if (item.key === key) {
      result = item;
    } else {
      if (item.children && item.children.length) {
        getTreeItem(item.children, key);
      }
    }
  })
  return result
}


export function filterObjNull(obj) {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) result[key] = value
  }
  return result
}
