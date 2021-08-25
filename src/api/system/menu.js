import http from '@/utils/http/request';

/**
 * @description: 获取全部菜单
 */
export function getMenus() {
  return http.request({
    url: 'menus',
    method: 'get',
  });
}

/**
 * @description: 创建菜单
 */
export function createMenu(data) {
  return http.request({
    url: 'menus',
    method: 'post',
    data
  }, {
    isShowSuccessMessage: true
  });
}
