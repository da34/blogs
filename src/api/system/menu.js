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

