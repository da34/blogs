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

/**
 * @description: 修改菜单
 */
export function updateMenu(data) {
  return http.request({
    url: 'menus/' + data.id,
    method: 'put',
    data
  }, {
    isShowSuccessMessage: true
  });
}

/**
 * @description: 删除菜单
 */
export function delMenu(id) {
  return http.request({
    url: 'menus/' + id,
    method: 'delete'
  }, {
    isShowSuccessMessage: true
  });
}
